import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import history from '../../services/history';

interface User {
  id?: number;
  email?: string;
  nome?: string;
  password?:string;
}

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: User;
  isLoading: boolean;
}
interface LoginRequest {
  email:string;
  password:string;
  prevPath?: string
}
interface LoginSuccess {
  token: string;
  user: User;
}

interface RegisterPayload {
  id: number;
  email: string;
  nome: string;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user: {},
  isLoading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state, _action: PayloadAction<LoginRequest>) {
      state.isLoading = true;
    },

    loginSuccess(state, action: PayloadAction<LoginSuccess>) {
      const { token, user } = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
      state.token = token;
      state.user = user;
    },

    loginFailure() {
      delete axios.defaults.headers.Authorization;
      return initialState;
    },
    
    registerRequest(state) {
      state.isLoading = true;
    },

    registerSuccess(state, action: PayloadAction<RegisterPayload>) {
      const { email, nome } = action.payload;
      if (email !== state.user.email) {
        history.push('/login');
        toast.success('Log in again!');
        return initialState;
      }
      state.user.nome = nome;
      state.isLoading = false;
    },

    registerFailure(state) {
      state.isLoading = false;
    }    
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure
} = authSlice.actions;

export const authReducer = authSlice.reducer;
