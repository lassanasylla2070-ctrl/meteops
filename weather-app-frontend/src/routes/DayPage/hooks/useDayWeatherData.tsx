import { ApiPath } from '@enums/api-path.enum';
import { Fetch, FetchErrorResponse } from '@utils/fetch';
import { useQuery } from 'react-query';
import { Weather, FindByCityAndDateDto } from '@apiTypes';

export const useDayWeatherData = (params: FindByCityAndDateDto) => {
  const { data, isLoading, isError } = useQuery<Weather, FetchErrorResponse>(JSON.stringify(params), async () => {
    const { data: responseData } = await Fetch.get<Weather>(ApiPath.WEATHER_DAY, { params });

    return responseData;
  });

  return {
    weather: data,
    isLoadingWeather: isLoading,
    isError,
  };
};
