import { Inject, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { Weather } from '../weather-data-provider/models/weather.model';
import { WeatherNotFoundError } from './errors/weather-not-found.error';
import { WeatherDataProvider } from './interfaces/weather-data-provider.interface';

@Injectable()
export class WeatherService {
  constructor(@Inject('WEATHER_DATA_PROVIDER') private readonly weatherDataProvider: WeatherDataProvider) {}

  async findWeatherByDay(city: string, date: DateTime): Promise<Weather> {
    const weatherData = await this.weatherDataProvider.getWeatherForCityByDate(city, date);
    if (!weatherData) {
      throw new WeatherNotFoundError({ city, date: date.toString() });
    }

    return weatherData;
  }

  async findWeatherForecast(city: string): Promise<Weather[]> {
    const weatherData = await this.weatherDataProvider.getWeatherForecastForCity(city);
    if (!weatherData) {
      throw new WeatherNotFoundError({ city });
    }

    return weatherData;
  }
}
