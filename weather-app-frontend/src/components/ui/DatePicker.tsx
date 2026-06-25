import { FC } from 'react';
import { DatePicker as MaterialDatePicker, DatePickerProps } from '@material-ui/pickers';

type Props = DatePickerProps;

export const DatePicker: FC<Props> = MaterialDatePicker;
