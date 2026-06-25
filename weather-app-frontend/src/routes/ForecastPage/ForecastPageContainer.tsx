import { NoData } from '@components/ui/NoData';
import { WeatherTileSkeleton } from '@components/WeatherTile/WeatherTileSkeleton';
import { ForecastPage } from '@routes/ForecastPage/ForecastPage';
import { useForecastWeatherData } from '@routes/ForecastPage/hooks/useForecastWeatherData';
import { store } from '@store/store';
import React, { FC, useContext } from 'react';
import { useDebounce } from 'use-debounce';
import { DEBOUNCE_TIME_MS, FORECAST_DAYS } from '@constants/common.constants';

export const ForecastPageContainer: FC = () => {
  const { state } = useContext(store);
  const [debouncedCity] = useDebounce(state.city, DEBOUNCE_TIME_MS);
  const { isLoadingWeather, weatherArray, isError } = useForecastWeatherData({ city: debouncedCity });

  if (isError) {
    return <NoData />;
  }

  const weatherTileSkeletons = Array.apply(null, Array(FORECAST_DAYS)).map((_, i) => <WeatherTileSkeleton key={i} />);
  if (isLoadingWeather) {
    return <>{weatherTileSkeletons}</>;
  }

  return <ForecastPage weatherArray={weatherArray} />;
};
