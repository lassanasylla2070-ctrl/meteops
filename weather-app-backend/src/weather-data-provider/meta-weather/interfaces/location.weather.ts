import { ConsolidatedWeather } from './consolidated-weather.interface';
import { LocationSearch } from './location.search';

export interface LocationWeather extends LocationSearch {
  consolidated_weather: ConsolidatedWeather[]; // 6 days forecast
  time: string; // '2020-10-10T23:24:30.210405+01:00'
  sun_rise: string; // '2020-10-10T07:16:40.042090+01:00'
  sun_set: string; // '2020-10-10T18:17:12.336185+01:00'
  parent: unknown;
  sources: unknown[];
  timezone: string; // 'Europe/London';
  timezone_name: string;
}
