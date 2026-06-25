import { MetaWeather } from '../meta-weather.entity';

export type MetaWeatherCreation = Pick<
  MetaWeather,
  | 'city'
  | 'date'
  | 'query'
  | 'state'
  | 'stateAbbr'
  | 'windDirection'
  | 'windDirectionCompass'
  | 'windSpeed'
  | 'airPressure'
  | 'humidity'
  | 'predictability'
  | 'minTemp'
  | 'maxTemp'
  | 'avgTemp'
> &
  Partial<Pick<MetaWeather, 'updatedAt'>>;
