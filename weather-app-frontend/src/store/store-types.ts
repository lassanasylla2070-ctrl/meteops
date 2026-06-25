import { DateTime } from 'luxon';

export interface StoreState {
  city: string;
  date: DateTime;
}

export interface DispatchData {
  payload: any;
  type: StoreActionType;
}

export type Dispatch = (data: DispatchData) => void;

export interface AppContext {
  dispatch: Dispatch;
  state: StoreState;
}

export enum StoreActionType {
  SET_CITY = 'SET_CITY',
  SET_DATE = 'SET_DATE',
}

export interface StoreAction {
  payload: any;
  type: StoreActionType;
}
