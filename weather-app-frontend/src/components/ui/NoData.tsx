import { Box } from '@components/ui/Box';
import { Typography } from '@components/ui/Typography';
import { IconType } from '@enums/icon-type.enum';
import { useTranslation } from '@hooks/useTranslation';
import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(({ spacing }) => ({
  root: { width: 300, height: 'min-content', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: spacing(2.5) },
  img: { marginBottom: spacing() },
}));

export const NoData = () => {
  const classes = useStyles();
  const { t } = useTranslation('main');

  return (
    <Box className={classes.root}>
      <img alt='no-data' src={`/icons/${IconType.NoData}.svg`} width={100} className={classes.img} />
      <Typography variant='h5'>{t('noData')}</Typography>
    </Box>
  );
};
