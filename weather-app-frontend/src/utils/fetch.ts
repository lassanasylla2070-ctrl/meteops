import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { ErrorResponse } from '@errors/types/interfaces/error-response.interface';
import { captureError } from '@errors/utils/capture-error';

export declare type FetchErrorResponse = AxiosError<ErrorResponse>;

const { REACT_APP_API_URL } = process.env;
console.log(REACT_APP_API_URL);
const fetchConfig: AxiosRequestConfig = {
  baseURL: REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const Fetch: AxiosInstance = axios.create(fetchConfig);

Fetch.interceptors.response.use(
  value => value,
  async error => {
    await captureError(error);
    throw error;
  },
);
