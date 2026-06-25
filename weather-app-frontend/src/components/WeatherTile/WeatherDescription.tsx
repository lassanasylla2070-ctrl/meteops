import { Typography } from '@components/ui/Typography';
import { IconType } from '@enums/icon-type.enum';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { FC } from 'react';
import cx from 'classnames';

interface Props {
  iconRotation?: number; // degrees
  iconType?: IconType;
  name: string;
  className?: string;
  unit?: string;
  value?: string | number;
}

const useStyles = makeStyles(({ spacing, typography }) => ({
  root: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: spacing() },
  name: { display: 'flex', alignItems: 'center' },
  icon: {
    marginRight: spacing(2),
    transform: ({ iconRotation }: Pick<Props, 'iconRotation'>) => (iconRotation ? `rotate(${iconRotation}deg)` : undefined),
    width: typography.fontSize * 1.3,
  },
}));

export const WeatherDescription: FC<Props> = ({ iconType, value, name, unit, iconRotation, className }) => {
  const classes = useStyles({ iconRotation });

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.name}>
        {iconType && <img alt={name} src={`/icons/${iconType}.svg`} className={classes.icon} />}
        <Typography variant='caption'>{name}</Typography>
      </div>

      {value && <Typography variant='caption'>{`${value}${unit ? ` ${unit}` : ''}`}</Typography>}
    </div>
  );
};
