import { WeatherTile } from '@components/WeatherTile/WeatherTile';
import React, { FC } from 'react';
import { FORECAST_DAYS } from '@constants/common.constants';
import { Weather } from '@apiTypes';

interface Props {
  weatherArray?: Weather[];
}

export const ForecastPage: FC<Props> = ({ weatherArray }) => {
  const weatherTiles = weatherArray?.slice(0, FORECAST_DAYS).map(w => <WeatherTile weather={w} key={w.date} />);

  return <>{weatherTiles}</>;
};
