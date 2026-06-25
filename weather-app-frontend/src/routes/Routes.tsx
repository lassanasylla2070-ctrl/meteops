import { Path } from '@enums/path.enum';
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { DayPageContainer } from '@routes/DayPage/DayPageContainer';
import { ForecastPageContainer } from '@routes/ForecastPage/ForecastPageContainer';

export const Routes = () => (
  <Switch>
    <Route path={Path.FORECAST} component={ForecastPageContainer} key={Path.FORECAST} exact />
    <Route path={Path.DAY} component={DayPageContainer} key={Path.DAY} exact />
    <Route exact path='*' key='*' component={() => <Redirect to={Path.DAY} />} />
  </Switch>
);
