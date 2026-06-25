import { ResourceLanguage } from 'i18next';

export interface Locales extends ResourceLanguage {
  errors: ErrorsLocales;
  main: MainLocales;
}

export interface ErrorsLocales {
  error404text: string;
  error500text: string;
  goBack: string;
}

export interface MainLocales {
  airPressure: string;
  city: string;
  dateInMonth: string;
  fiveDayForecast: string;
  humidity: string;
  maxTemperature: string;
  minTemperature: string;
  noData: string;
  predictability: string;
  singleDayForecast: string;
  windDirection: string;
  windSpeed: string;
}
