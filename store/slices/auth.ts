import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthInitialState} from './types';
import {RootState} from '..';
import * as Keychain from 'react-native-keychain';
import {CustomJwtPayload} from '../middlewares/auth';

const initialState: AuthInitialState = {
  user: null,
  token: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CustomJwtPayload>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      Keychain.resetGenericPassword();
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const authState = (state: RootState) => state.authState;
export const {setUser, setToken, logout, setIsAuthenticated} =
  authSlice.actions;

export default authSlice.reducer;
