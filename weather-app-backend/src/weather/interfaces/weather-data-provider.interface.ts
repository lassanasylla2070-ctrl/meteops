import { DateTime } from 'luxon';
import { Weather } from '../../weather-data-provider/models/weather.model';

export interface WeatherDataProvider {
  getWeatherForecastForCity(city: string): Promise<Weather[] | null>;
  getWeatherForCityByDate(city: string, date: DateTime): Promise<Weather | null>;
}
