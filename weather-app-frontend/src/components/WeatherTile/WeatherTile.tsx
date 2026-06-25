import { WeatherDescription } from '@components/WeatherTile/WeatherDescription';
import { IconType } from '@enums/icon-type.enum';
import { useTranslation } from '@hooks/useTranslation';
import { CardContent, CardHeader, Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { Weather } from '@apiTypes';

interface Props {
  weather: Weather;
}

export const WEATHER_TILE_WIDTH = 300;

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    width: WEATHER_TILE_WIDTH,
    margin: spacing(3),
  },
  media: { height: 100, backgroundSize: 'contain' },
  tempHeader: { textAlign: 'center' },
  lastDescription: { marginBottom: 0 },
}));

export const WeatherTile: FC<Props> = ({ weather }) => {
  const { t } = useTranslation('main');
  const classes = useStyles();

  const temp = weather?.avgTemp ? Math.round(weather?.avgTemp) : '-';
  const minTemp = weather?.minTemp ? Math.round(weather?.minTemp) : '-';
  const maxTemp = weather?.maxTemp ? Math.round(weather?.maxTemp) : '-';
  const airPressure = weather?.airPressure ? Math.round(weather?.airPressure) : '-';
  const dayOfWeek = DateTime.fromISO(weather.date).toFormat('cccc');
  const date = DateTime.fromISO(weather.date).toFormat('dd LLLL yyyy');

  return (
    <Card className={classes.root}>
      <CardHeader title={dayOfWeek} subheader={`${weather.city}, ${date}`} />
      <CardMedia image={weather.iconUrl} className={classes.media} title={weather.state} />
      <CardHeader title={`${temp}°C`} className={classes.tempHeader} subheader={weather.state} />
      <CardContent>
        <WeatherDescription name={t('predictability')} value={weather.predictability} iconType={IconType.Percentage} unit='%' />
        <WeatherDescription name={t('airPressure')} value={airPressure} iconType={IconType.Wind} unit='mbar' />
        <WeatherDescription name={t('humidity')} value={weather.humidity} iconType={IconType.Humidity} unit='%' />
        <WeatherDescription name={t('minTemperature')} value={minTemp} iconType={IconType.TempMin} unit='°C' />
        <WeatherDescription name={t('maxTemperature')} value={maxTemp} iconType={IconType.TempMax} unit='°C' />
        <WeatherDescription name={t('windSpeed')} value={Math.round(weather.windSpeed)} iconType={IconType.Windsock} unit='mph' />
        <WeatherDescription
          name={t('windDirection')}
          iconType={IconType.ArrowUp}
          iconRotation={weather.windDirection}
          value={weather.windDirectionCompass}
          className={classes.lastDescription}
        />
      </CardContent>
    </Card>
  );
};
