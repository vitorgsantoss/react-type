import { get } from 'lodash';
import { REHYDRATE } from 'redux-persist';
import { all, takeLatest } from 'redux-saga/effects';
import { type SagaIterator } from 'redux-saga';
import * as actions from '../slices/auth';
import axios from '../../services/axios';
import login from './login';
import register from './register';

interface PersistedAuthState {
  auth: {
    token: string | null;
    isLoggedIn: boolean;
    user: object;
    isLoading: boolean;
  };
}

interface RehydrateAction {
  type: typeof REHYDRATE;
  payload?: PersistedAuthState;
  error?: boolean;
  key?: string;
}

function* rehydrate(action: RehydrateAction): SagaIterator {
  const token = get(action, 'payload.auth.token', null) as string | null;
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default function* rootSaga(): SagaIterator {
  yield all([
    takeLatest(actions.loginRequest.type, login),
    takeLatest(actions.registerRequest.type, register),
    takeLatest(REHYDRATE, rehydrate)
  ]);
}
