import { ResourceKey } from 'i18next';
import { ErrorsLocales, Locales, MainLocales } from './locales.interfaces';

export class LocalesEN implements Locales {
  [namespace: string]: ResourceKey;

  errors: ErrorsLocales = {
    error500text: `An error occurred and your request couldn't be completed. Please try again later.`,
    error404text: 'Page not found',
    goBack: 'Go back',
  };

  main: MainLocales = {
    predictability: 'Predictability',
    airPressure: 'Air pressure',
    humidity: 'Humidity',
    minTemperature: 'Min temperature',
    maxTemperature: 'Max temperature',
    windSpeed: 'Wind speed',
    windDirection: 'Wind direction',
    singleDayForecast: 'Single day forecast',
    fiveDayForecast: '5-day forecast',
    city: 'City...',
    dateInMonth: 'Date',
    noData: 'No data',
  };
}
