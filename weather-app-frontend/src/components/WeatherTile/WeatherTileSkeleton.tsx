import { WEATHER_TILE_WIDTH } from '@components/WeatherTile/WeatherTile';
import { CardContent, CardHeader, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC } from 'react';
import { Weather } from '@apiTypes';
import { Skeleton } from '@material-ui/lab';

interface Props {
  weather?: Weather;
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    width: WEATHER_TILE_WIDTH,
    margin: spacing(3),
  },
  image: { display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 },
  bottomSpace: { marginBottom: spacing() },
}));

const DESCRIPTION_LINES = 7;

export const WeatherTileSkeleton: FC<Props> = () => {
  const classes = useStyles();
  const descriptions = Array.apply(null, Array(DESCRIPTION_LINES)).map((_, i) => (
    <Skeleton animation='wave' height={20} width='100%' className={i === DESCRIPTION_LINES - 1 ? undefined : classes.bottomSpace} key={i} />
  ));

  return (
    <Card className={classes.root}>
      <CardHeader title={<Skeleton animation='wave' height={32} width='50%' />} subheader={<Skeleton animation='wave' height={24} width='20%' />} />
      <div className={classes.image}>
        <Skeleton animation='wave' variant='rect' width={100} height={100} className={classes.bottomSpace} />
        <Skeleton animation='wave' height={32} width={50} />
        <Skeleton animation='wave' height={24} width={80} className={classes.bottomSpace} />
      </div>
      <CardContent>{descriptions}</CardContent>
    </Card>
  );
};
