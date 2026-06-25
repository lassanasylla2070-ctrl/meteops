import { DatePicker } from '@components/ui/DatePicker';
import { NoData } from '@components/ui/NoData';
import { Typography } from '@components/ui/Typography';
import { WeatherTile } from '@components/WeatherTile/WeatherTile';
import { useTranslation } from '@hooks/useTranslation';
import { MainLocales } from '@locales/locales.interfaces';
import { makeStyles } from '@material-ui/core/styles';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DateTime } from 'luxon';
import React, { FC } from 'react';
import { Weather } from '@apiTypes';
import { WeatherTileSkeleton } from '@components/WeatherTile/WeatherTileSkeleton';

interface Props {
  date: DateTime;
  maxDate: DateTime;
  minDate: DateTime;
  isLoadingWeather: boolean;
  isError: boolean;
  weather?: Weather;
  onDateChange: (pickerDate: MaterialUiPickersDate) => void;
}

const useStyles = makeStyles(({ spacing }) => ({
  root: { display: 'flex', flexDirection: 'column' },
  tile: { margin: `0 ${spacing(3)}px` },
}));

export const DayPage: FC<Props> = ({ weather, isLoadingWeather, maxDate, date, minDate, onDateChange, isError }) => {
  const { t } = useTranslation<MainLocales>('main');
  const classes = useStyles();
  const weatherTile = isLoadingWeather ? <WeatherTileSkeleton /> : <WeatherTile weather={weather!} />;

  return (
    <div className={classes.root}>
      <div className={classes.tile}>
        <Typography variant='body1' color='textSecondary'>
          {t('dateInMonth')}
        </Typography>
        <DatePicker fullWidth name='date' onChange={onDateChange} value={date} minDate={minDate} maxDate={maxDate} />
      </div>
      {isError ? <NoData /> : weatherTile}
    </div>
  );
};
