import { ApiPath } from '@enums/api-path.enum';
import { Fetch, FetchErrorResponse } from '@utils/fetch';
import { useQuery } from 'react-query';
import { Weather, FindByCityDto } from '@apiTypes';

export const useForecastWeatherData = (params: FindByCityDto) => {
  const { data, isLoading, isError } = useQuery<Weather[], FetchErrorResponse>(JSON.stringify(params), async () => {
    const { data: responseData } = await Fetch.get<Weather[]>(ApiPath.WEATHER_FORECAST, { params });

    return responseData;
  });

  return {
    weatherArray: data,
    isLoadingWeather: isLoading,
    isError,
  };
};
