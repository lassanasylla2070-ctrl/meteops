import LuxonUtils from '@date-io/luxon';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { StateProvider } from '@store/store';
import React from 'react';
import ReactDOM from 'react-dom';
import './locales/i18n';
import { AppContainer } from '@components/App/AppContainer';
import { captureError } from '@errors/utils/capture-error';
import * as serviceWorker from './serviceWorker';
import { QueryCache, ReactQueryConfig, ReactQueryConfigProvider, ReactQueryCacheProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import primary from '@material-ui/core/colors/amber';
import secondary from '@material-ui/core/colors/grey';
import './index.css';

const queryCache = new QueryCache();
const queryConfig: ReactQueryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    onError: captureError,
  },
  mutations: { onError: captureError },
};

const darkTheme = createMuiTheme({
  palette: {
    primary,
    secondary,
    type: 'dark',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <StateProvider>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <MuiPickersUtilsProvider utils={LuxonUtils}>
          <ThemeProvider theme={darkTheme}>
            <ReactQueryConfigProvider config={queryConfig}>
              <BrowserRouter>
                <AppContainer />
              </BrowserRouter>
            </ReactQueryConfigProvider>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </ReactQueryCacheProvider>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
