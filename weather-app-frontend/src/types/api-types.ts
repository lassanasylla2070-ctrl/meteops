/* tslint:disable */
/* eslint-disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Weather {
  city: string;
  date: string;
  state: string;

  /** degrees */
  windDirection: number;

  /** degrees */
  windDirectionCompass: string;

  /** mph */
  windSpeed: number;

  /** mbar */
  airPressure?: number;

  /** percentage */
  humidity: number;

  /** percentage */
  predictability: number;

  /** centigrade */
  minTemp?: number;

  /** centigrade */
  maxTemp?: number;

  /** centigrade */
  avgTemp?: number;
  iconUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface FindByCityDto {
  city: string;
}

export interface FindByCityAndDateDto {
  city: string;
  date: string;
}
