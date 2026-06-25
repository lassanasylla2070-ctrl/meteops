import { Path } from '@enums/path.enum';
import { useTranslation } from '@hooks/useTranslation';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { store } from '@store/store';
import { StoreActionType } from '@store/store-types';
import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { Switch } from '@components/ui/Switch';
import { APP_NAME } from '@constants/common.constants';
import { Typography } from '@components/ui/Typography';

const useStyles = makeStyles(({ spacing, breakpoints, shape, palette, transitions }) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: shape.borderRadius,
      backgroundColor: fade(palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(palette.common.white, 0.25),
      },
      marginLeft: 0,
      flex: 1,
      [breakpoints.up('sm')]: {
        marginLeft: spacing(1),
        width: 'auto',
        flex: 'unset',
      },
    },
    searchIcon: {
      padding: spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${spacing(4)}px)`,
      transition: transitions.create('width'),
      width: '100%',
      [breakpoints.up('sm')]: {
        width: '15ch',
        '&:focus': {
          width: '30ch',
        },
      },
    },
    viewSwitch: {
      display: 'flex',
      alignItems: 'center',
      [breakpoints.down('sm')]: {
        flex: 1,
      },
    },
    topBar: { minHeight: spacing(8) },
  }),
);

export const TopBar: FC = () => {
  const { t } = useTranslation('main');
  const { state, dispatch } = useContext(store);
  const { push, location } = useHistory();
  const classes = useStyles();
  const [switchChecked, setSwitchChecked] = useState(location.pathname.startsWith(Path.FORECAST));

  const handleCityChange = ({ target }: ChangeEvent<HTMLInputElement>) => dispatch({ type: StoreActionType.SET_CITY, payload: target.value });
  const handleViewChange = (_event: any, checked: boolean) => {
    setSwitchChecked(checked);
    push(checked ? Path.FORECAST : Path.DAY);
  };

  return (
    <AppBar position='static' title={APP_NAME}>
      <Toolbar className={classes.topBar}>
        <Typography className={classes.title} variant='h5' noWrap>
          {APP_NAME}
        </Typography>
        <div className={classes.viewSwitch}>
          <Typography variant='subtitle2' noWrap>
            {switchChecked ? t('fiveDayForecast') : t('singleDayForecast')}
          </Typography>
          <Switch checked={switchChecked} onChange={handleViewChange} color='secondary' inputProps={{ 'aria-label': 'view switch' }} />
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder={t('city')}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search city' }}
            value={state.city}
            onChange={handleCityChange}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};
