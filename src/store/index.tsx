import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { authReducer } from './slices/auth';
import persistedReducers from './reduxPersist';
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

export interface RootState {
  auth: {
    isLoggedIn: boolean;
    token: string | null;
    user: object;
    isLoading: boolean;
  };
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducers({
    auth: authReducer,
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ 
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
