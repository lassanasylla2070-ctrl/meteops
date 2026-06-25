import { TopBar } from '@components/ui/TopBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { FC } from 'react';
import { Routes } from '@routes/Routes';

const useStyles = makeStyles(({ palette, spacing, breakpoints, mixins, overrides }) => ({
  root: {
    background: palette.background.default,
    width: '100%',
    height: '100%',
  },
  content: {
    [breakpoints.down('sm')]: {
      padding: `${spacing(2)}px 0`,
    },
    [breakpoints.up('sm')]: {
      padding: `${spacing(4)}px`,
    },
    [breakpoints.up('md')]: {
      padding: `${spacing(4)}px ${spacing(6)}px`,
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflow: 'auto',
    height: `calc(100vh - ${spacing(8)}px)`,
  },
}));

export const App: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.content}>
        <Routes />
      </div>
    </div>
  );
};
