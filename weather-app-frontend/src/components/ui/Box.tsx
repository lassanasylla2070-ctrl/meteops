import cx from 'classnames';
import React, { FC } from 'react';
import { Paper, makeStyles } from '@material-ui/core';

interface Props {
  className?: string;
}

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    padding: spacing(2),
    height: '100%',
    overflow: 'hidden',
  },
}));

export const Box: FC<Props> = ({ children, className }) => {
  const classes = useStyles();

  return <Paper className={cx(classes.root, className)}>{children}</Paper>;
};
