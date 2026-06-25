import { Typography } from '@components/ui/Typography';
import { useTranslation } from '@hooks/useTranslation';
import { ErrorsLocales } from '@locales/locales.interfaces';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { HttpStatus } from '@enums/http-status.enum';
import { Box } from '@components/ui/Box';
import { Button } from '@components/ui/Button';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    display: 'grid',
    placeItems: 'center',
  },
}));

export const Error500 = () => {
  const { t } = useTranslation<ErrorsLocales>('errors');
  const classes = useStyles();
  const { goBack } = useHistory();

  return (
    <div className={classes.root}>
      <Box>
        <Typography variant='h2'>{HttpStatus.INTERNAL_SERVER_ERROR}</Typography>
        <Typography paragraph>{t('error500text')}</Typography>
        <Button variant='contained' onClick={goBack}>
          {t('goBack')}
        </Button>
      </Box>
    </div>
  );
};
