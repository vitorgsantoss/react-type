import { call, put } from 'redux-saga/effects';
import { type PayloadAction } from '@reduxjs/toolkit';
import { type AxiosResponse, AxiosError } from 'axios';
import { type SagaIterator } from 'redux-saga';
import { toast } from 'react-toastify';
import { registerSuccess, registerFailure } from '../slices/auth';
import axios from '../../services/axios';
import history from '../../services/history';

interface RegisterPayload {
    id?: number;
    email: string;
    password?: string;
    name: string;
}

interface UserResponse {
    id: number;
    email: string;
    nome: string;
}

interface ErrorResponse {
    message?: string;
    errors?: string[];
}

export default function* register(action: PayloadAction<RegisterPayload>): SagaIterator {
  try {
    const { id, email, password, name: nome } = action.payload;    
    let response: AxiosResponse<UserResponse>;
    
    if (id) {
      response = yield call(axios.put, '/users', { id, email, nome });
      toast.success('User changed successfully');
    } else {
      response = yield call(axios.post, '/users', { email, password, nome });
      toast.success('User registered successfully');
      history.push('/login');
    }
    
    yield put(registerSuccess(response.data));
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ErrorResponse;
      const errorMessage = errorData?.message || 'An error occurred during registration';
      toast.error(errorMessage);
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('An unexpected error occurred');
    }
    
    yield put(registerFailure());
  }
}
