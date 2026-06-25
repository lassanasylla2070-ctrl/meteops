import { Button as MaterialButton, ButtonProps } from '@material-ui/core';
import { FC } from 'react';

type Props = ButtonProps;

export const Button: FC<Props> = MaterialButton;
