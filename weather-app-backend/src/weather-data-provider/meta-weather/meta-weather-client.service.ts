import { HttpService, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { DataProviderFetchError } from '../errors/data-provider-fetch.error';
import { WeatherState } from './enums/weather-state.enum';

interface OpenMeteoLocation {
  latitude: number;
  longitude: number;
  name: string;
}

interface OpenMeteoDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
  wind_speed_10m_max: number[];
  wind_direction_10m_dominant: number[];
  relative_humidity_2m_mean: number[];
  surface_pressure_mean: number[];
}

// Open-Meteo renvoie des codes WMO numériques : on les ramène vers les abréviations existantes
function mapWeatherCode(code: number): WeatherState {
  if (code === 0) return WeatherState.CLEAR;
  if ([1, 2].includes(code)) return WeatherState.LIG_HT_CLOUD;
  if (code === 3) return WeatherState.HEAVY_CLOUD;
  if ([45, 48].includes(code)) return WeatherState.HEAVY_CLOUD;
  if ([51, 53, 56, 61, 80].includes(code)) return WeatherState.LIGHT_RAIN;
  if ([55, 57, 63, 65, 81, 82].includes(code)) return WeatherState.HEAVY_RAIN;
  if ([66, 67].includes(code)) return WeatherState.SLEET;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return WeatherState.SNOW;
  if ([95, 96, 99].includes(code)) return WeatherState.THUNDERSTORM;
  return WeatherState.SHOWERS;
}

function weatherCodeToLabel(code: number): string {
  if (code === 0) return 'Clear';
  if ([1, 2].includes(code)) return 'Light Cloud';
  if (code === 3) return 'Heavy Cloud';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 56, 61, 80].includes(code)) return 'Light Rain';
  if ([55, 57, 63, 65, 81, 82].includes(code)) return 'Heavy Rain';
  if ([66, 67].includes(code)) return 'Sleet';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Showers';
}

function degreesToCompass(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return directions[Math.round(deg / 22.5) % 16];
}

@Injectable()
export class MetaWeatherClientService {
  constructor(private readonly metaWeatherClient: HttpService) {}

  async fetchWeatherForCityByDate(city: string, { year, month, day }: DateTime) {
    const location = await this.fetchLocationByCity(city);
    if (!location) {
      return null;
    }

    const targetDate = DateTime.fromObject({ year, month, day }).toISODate();

    try {
      const { data } = await this.metaWeatherClient
        .get<{ daily: OpenMeteoDaily }>('/v1/forecast', {
          baseURL: 'https://api.open-meteo.com',
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            daily:
              'temperature_2m_max,temperature_2m_min,weathercode,wind_speed_10m_max,wind_direction_10m_dominant,relative_humidity_2m_mean,surface_pressure_mean',
            forecast_days: 16,
            timezone: 'auto',
          },
        })
        .toPromise();

      const index = data.daily.time.indexOf(targetDate);
      if (index === -1) {
        return null;
      }

      return {
        city: location.name,
        applicable_date: data.daily.time[index],
        weather_state_name: weatherCodeToLabel(data.daily.weathercode[index]),
        weather_state_abbr: mapWeatherCode(data.daily.weathercode[index]),
        wind_direction: data.daily.wind_direction_10m_dominant[index],
        wind_direction_compass: degreesToCompass(data.daily.wind_direction_10m_dominant[index]),
        wind_speed: data.daily.wind_speed_10m_max[index],
        air_pressure: data.daily.surface_pressure_mean[index],
        humidity: data.daily.relative_humidity_2m_mean[index],
        predictability: 75,
        min_temp: data.daily.temperature_2m_min[index],
        max_temp: data.daily.temperature_2m_max[index],
        the_temp: (data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2,
      };
    } catch (error) {
      throw new DataProviderFetchError('Getting weather for city error', { error });
    }
  }

  async fetchWeatherForecastForCity(city: string) {
    const location = await this.fetchLocationByCity(city);
    if (!location) {
      return null;
    }

    try {
      const { data } = await this.metaWeatherClient
        .get<{ daily: OpenMeteoDaily }>('/v1/forecast', {
          baseURL: 'https://api.open-meteo.com',
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            daily:
              'temperature_2m_max,temperature_2m_min,weathercode,wind_speed_10m_max,wind_direction_10m_dominant,relative_humidity_2m_mean,surface_pressure_mean',
            forecast_days: 6,
            timezone: 'auto',
          },
        })
        .toPromise();

      const consolidated_weather = data.daily.time.map((date, i) => ({
        applicable_date: date,
        weather_state_name: weatherCodeToLabel(data.daily.weathercode[i]),
        weather_state_abbr: mapWeatherCode(data.daily.weathercode[i]),
        wind_direction: data.daily.wind_direction_10m_dominant[i],
        wind_direction_compass: degreesToCompass(data.daily.wind_direction_10m_dominant[i]),
        wind_speed: data.daily.wind_speed_10m_max[i],
        air_pressure: data.daily.surface_pressure_mean[i],
        humidity: data.daily.relative_humidity_2m_mean[i],
        predictability: 75,
        min_temp: data.daily.temperature_2m_min[i],
        max_temp: data.daily.temperature_2m_max[i],
        the_temp: (data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) / 2,
      }));

      return { title: location.name, consolidated_weather };
    } catch (error) {
      throw new DataProviderFetchError('Getting weather for city error', { error });
    }
  }

  private async fetchLocationByCity(city: string): Promise<OpenMeteoLocation | null> {
    try {
      const { data } = await this.metaWeatherClient
        .get<{ results?: OpenMeteoLocation[] }>('/v1/search', {
          baseURL: 'https://geocoding-api.open-meteo.com',
          params: { name: city, count: 1 },
        })
        .toPromise();

      return data.results && data.results.length > 0 ? data.results[0] : null;
    } catch (error) {
      throw new DataProviderFetchError('Getting city location error', { city, error });
    }
  }
}
