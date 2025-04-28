import {createSlice} from '@reduxjs/toolkit';
import {AuthInitialState} from './types';
import {RootState} from '..';
import * as Keychain from 'react-native-keychain';

const initialState: AuthInitialState = {
  user: null,
  token: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setUser: (state, action) => {
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
  },
});

export const authState = (state: RootState) => state.authState;
export const {setUser, setToken, logout} = authSlice.actions;

export default authSlice.reducer;
