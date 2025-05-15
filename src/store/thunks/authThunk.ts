import {createAsyncThunk} from '@reduxjs/toolkit';
import {clearUser} from '@store/slices/auth';
import * as Keychain from 'react-native-keychain';

export const logout = createAsyncThunk('auth/logout', async (_, {dispatch}) => {
  await Keychain.resetGenericPassword(); // побочный эффект ВНЕ редьюсера
  dispatch(clearUser()); // очистка пользователя в store
});
