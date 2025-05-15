import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthInitialState} from './types';
import {RootState} from '..';
import {CustomJwtPayload} from '@store/middlewares/auth';
import {UserInfoType} from '@store/services/orders/types';

const initialState: AuthInitialState = {
  user: null,
  token: false,
  isAuthenticated: false,
  fcmToken: '',
  userInfo: null,
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
    setUserInfo: (state, action: PayloadAction<UserInfoType>) => {
      state.userInfo = action.payload;
    },
    clearUser: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setFCMToken: (state, action: PayloadAction<string>) => {
      state.fcmToken = action.payload;
    },
  },
});

export const authState = (state: RootState) => state.authState;
export const {
  setUser,
  setToken,
  clearUser,
  setIsAuthenticated,
  setFCMToken,
  setUserInfo,
} = authSlice.actions;

export default authSlice.reducer;
