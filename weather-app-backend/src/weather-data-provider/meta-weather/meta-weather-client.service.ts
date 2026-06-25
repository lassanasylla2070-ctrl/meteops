import { HttpService, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { DataProviderFetchError } from '../errors/data-provider-fetch.error';
import { ConsolidatedWeather } from './interfaces/consolidated-weather.interface';
import { LocationSearch } from './interfaces/location.search';
import { LocationWeather } from './interfaces/location.weather';

@Injectable()
export class MetaWeatherClientService {
  constructor(private readonly metaWeatherClient: HttpService) {}

  async fetchWeatherForCityByDate(city: string, { year, month, day }: DateTime): Promise<(ConsolidatedWeather & { city: string }) | null> {
    const locationSearch = await this.fetchLocationByCity(city);
    if (!locationSearch) {
      return null;
    }

    try {
      const { data } = await this.metaWeatherClient
        .get<ConsolidatedWeather[]>(`location/${locationSearch.woeid}/${year}/${month}/${day}`)
        .toPromise();
      const exists = data && data[0];

      return exists ? { ...data[0], city: locationSearch.title } : null; // taking first element for simplicity
    } catch (error) {
      throw new DataProviderFetchError('Getting weather for city error', { error });
    }
  }

  /**
   * 6-day weather forecast
   * @param city
   */
  async fetchWeatherForecastForCity(city: string): Promise<LocationWeather | null> {
    const locationSearch = await this.fetchLocationByCity(city);
    if (!locationSearch) {
      return null;
    }

    try {
      const { data } = await this.metaWeatherClient.get<LocationWeather>(`location/${locationSearch.woeid}`).toPromise();

      return data;
    } catch (error) {
      throw new DataProviderFetchError('Getting weather for city error', { error });
    }
  }

  private async fetchLocationByCity(city: string): Promise<LocationSearch | null> {
    try {
      const { data } = await this.metaWeatherClient
        .get<LocationSearch[]>('location/search', { params: { query: city } })
        .toPromise();
      const exists = data && data[0];

      return exists ? data[0] : null;
    } catch (error) {
      throw new DataProviderFetchError('Getting city location error', { city, error });
    }
  }
}
