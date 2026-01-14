import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers, type Reducer, type UnknownAction } from '@reduxjs/toolkit';

export default function reducersPersister(
  reducers: Record<string, Reducer<any, UnknownAction>>
): Reducer {
  const rootReducer = combineReducers(reducers);
  const persistedReducers = persistReducer(
    {
      key: 'FIRST_PROJECT',
      storage,
      whitelist: ['auth']
    },
    rootReducer
  );
  return persistedReducers;
}
