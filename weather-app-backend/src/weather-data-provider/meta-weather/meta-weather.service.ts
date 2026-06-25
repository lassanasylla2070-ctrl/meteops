import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { nowUTC } from '../../common/utils/date.util';
import { ConfigService } from '../../config/config.service';
import { WeatherDataProvider } from '../../weather/interfaces/weather-data-provider.interface';
import { Weather } from '../models/weather.model';
import { MetaWeatherClientService } from './meta-weather-client.service';
import { MetaWeather } from './meta-weather.entity';

@Injectable()
export class MetaWeatherService implements WeatherDataProvider {
  constructor(
    @InjectRepository(MetaWeather) readonly repository: Repository<MetaWeather>,
    private readonly clientService: MetaWeatherClientService,
    private readonly configService: ConfigService,
  ) {}

  async getWeatherForCityByDate(city: string, date: DateTime): Promise<Weather | null> {
    const cachedWeatherData = await this.repository.findOne({
      where: {
        query: city,
        date: date.toSQLDate(),
        updatedAt: MoreThanOrEqual(this.getMaxValidCacheUTCDate().toSQL()),
      },
    });

    if (cachedWeatherData) {
      return cachedWeatherData;
    }

    const weatherData = await this.clientService.fetchWeatherForCityByDate(city, date);
    if (!weatherData) {
      return null;
    }

    const metaWeatherEntity = new MetaWeather({
      query: city,
      city: weatherData.city,
      date: weatherData.applicable_date,
      state: weatherData.weather_state_name,
      stateAbbr: weatherData.weather_state_abbr,
      windDirection: weatherData.wind_direction,
      windDirectionCompass: weatherData.wind_direction_compass,
      windSpeed: weatherData.wind_speed,
      airPressure: weatherData.air_pressure,
      humidity: weatherData.humidity,
      predictability: weatherData.predictability,
      minTemp: weatherData.min_temp,
      maxTemp: weatherData.max_temp,
      avgTemp: weatherData.the_temp,
      // "updatedAt" is passed in order to update row even if weather data are the same
      updatedAt: nowUTC().toSQL(),
    });

    return this.repository.save(metaWeatherEntity);
  }

  async getWeatherForecastForCity(city: string): Promise<Weather[] | null> {
    const { forecastDays } = this.configService.getWeatherConfig();
    const startUTCDate = nowUTC().endOf('day').minus({ day: 1 }).toSQL();
    const endUTCDate = nowUTC()
      .endOf('day')
      .plus({ days: forecastDays - 1 })
      .toSQL();

    const cachedWeatherData = await this.repository.find({
      where: {
        query: city,
        date: Between(startUTCDate, endUTCDate),
        updatedAt: MoreThanOrEqual(this.getMaxValidCacheUTCDate().toSQL()),
      },
    });

    if (cachedWeatherData.length === forecastDays) {
      return cachedWeatherData;
    }

    const weatherData = await this.clientService.fetchWeatherForecastForCity(city);
    if (!weatherData) {
      return null;
    }

    const entities = weatherData.consolidated_weather.map(
      cw =>
        new MetaWeather({
          query: city,
          city: weatherData.title,
          date: cw.applicable_date,
          state: cw.weather_state_name,
          stateAbbr: cw.weather_state_abbr,
          windDirection: cw.wind_direction,
          windDirectionCompass: cw.wind_direction_compass,
          windSpeed: cw.wind_speed,
          airPressure: cw.air_pressure,
          humidity: cw.humidity,
          predictability: cw.predictability,
          minTemp: cw.min_temp,
          maxTemp: cw.max_temp,
          avgTemp: cw.the_temp,
          // "updatedAt" is passed in order to update row even if weather data are the same
          updatedAt: nowUTC().toSQL(),
        }),
    );

    const saved = await this.repository.save(entities);

    return saved.slice(0, forecastDays);
  }

  private getMaxValidCacheUTCDate(): DateTime {
    const { cacheTtlMs } = this.configService.getWeatherConfig();

    return nowUTC().minus({ milliseconds: cacheTtlMs });
  }
}
