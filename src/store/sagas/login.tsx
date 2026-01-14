import { call, put } from 'redux-saga/effects';
import { type PayloadAction } from '@reduxjs/toolkit';
import { type AxiosResponse, AxiosError } from 'axios';
import { type SagaIterator } from 'redux-saga';
import { toast } from 'react-toastify';
import * as authActions from '../slices/auth';
import axios from '../../services/axios';
import history from '../../services/history';

interface LoginPayload {
  email: string;
  password: string;
  prevPath: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    nome: string;
  };
}

interface ErrorResponse {
  message?: string;
  errors?: string[];
}

export default function* login(action: PayloadAction<LoginPayload>): SagaIterator {
  try {
    const { email, password, prevPath } = action.payload;
    
    const response: AxiosResponse<LoginResponse> = yield call(
      axios.post,
      '/tokens',
      { email, password }
    );
    
    yield put(authActions.loginSuccess(response.data));
    toast.success('User logged!');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    history.push(prevPath);
  } catch (error) {
    yield put(authActions.loginFailure());
    
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ErrorResponse;
      toast.error(errorData?.message || 'User or password is invalid!');
    } else {
      toast.error('User or password is invalid!');
    }
  }
}



