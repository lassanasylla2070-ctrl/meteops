import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DayPage } from '@routes/DayPage/DayPage';
import { useDayWeatherData } from '@routes/DayPage/hooks/useDayWeatherData';
import { store } from '@store/store';
import { StoreActionType } from '@store/store-types';
import { DateTime } from 'luxon';
import React, { FC, useCallback, useContext } from 'react';
import { useDebounce } from 'use-debounce';
import { DEBOUNCE_TIME_MS } from '@constants/common.constants';

export const DayPageContainer: FC = () => {
  const minDate = DateTime.local().startOf('month');
  const maxDate = DateTime.local().endOf('month');
  const { state, dispatch } = useContext(store);
  const [debouncedCity] = useDebounce(state.city, DEBOUNCE_TIME_MS);
  const { isError, isLoadingWeather, weather } = useDayWeatherData({ date: state.date.toISO(), city: debouncedCity });

  const handleDateChange = useCallback(
    (pickerDate: MaterialUiPickersDate) => {
      dispatch({ type: StoreActionType.SET_DATE, payload: pickerDate });
    },
    [dispatch],
  );

  return (
    <DayPage
      weather={weather}
      minDate={minDate}
      maxDate={maxDate}
      date={state.date}
      isLoadingWeather={isLoadingWeather}
      isError={isError}
      onDateChange={handleDateChange}
    />
  );
};
