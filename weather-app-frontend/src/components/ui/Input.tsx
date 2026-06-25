import { TextFieldProps, TextField as MaterialInput } from '@material-ui/core';
import { FC } from 'react';

type Props = TextFieldProps;

export const Input: FC<Props> = MaterialInput;
