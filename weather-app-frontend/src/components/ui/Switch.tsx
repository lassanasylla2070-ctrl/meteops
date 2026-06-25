import { Switch as MaterialSwitch, SwitchProps } from '@material-ui/core';
import { FC } from 'react';

type Props = SwitchProps;

export const Switch: FC<Props> = MaterialSwitch;
