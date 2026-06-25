import { WeatherState } from '../enums/weather-state.enum';

export interface ConsolidatedWeather {
  id: number; // 5921829770231808
  weather_state_name: string; // 'Light Rain'
  weather_state_abbr: WeatherState; // 'lr'
  wind_direction_compass: string; // 'W'
  created: string; // '2020-10-10T21:20:02.016573Z'
  applicable_date: string; // '2020-10-10'
  min_temp: number; // 6.6899999999999995
  max_temp: number; // 13.825
  the_temp: number; // 12.629999999999999
  wind_speed: number; // 7.948466123722792
  wind_direction: number; // 278.0028554874213
  air_pressure: number; // 1022
  humidity: number; // 71
  visibility: number; // 9.316839656406586
  predictability: number; // 75
}
