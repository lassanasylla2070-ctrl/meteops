import { DateTime } from 'luxon';
import React, { createContext, Reducer, useReducer } from 'react';
import { AppContext, StoreAction, StoreActionType, StoreState } from './store-types';

const { REACT_APP_DEFAULT_CITY } = process.env;

export const store = createContext<AppContext>({} as AppContext);
const { Provider } = store;

export const StateProvider = (props: any) => {
  const initialState: StoreState = {
    city: localStorage.getItem('city') || REACT_APP_DEFAULT_CITY,
    date: DateTime.local(),
  };

  const [state, dispatch] = useReducer<Reducer<StoreState, StoreAction>>((prevState, action) => {
    switch (action.type) {
      case StoreActionType.SET_CITY: {
        const city = action.payload as string;
        localStorage.setItem('city', city);

        return { ...prevState, city };
      }
      case StoreActionType.SET_DATE: {
        const date = action.payload as DateTime;

        return { ...prevState, date };
      }
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{props.children}</Provider>;
};
