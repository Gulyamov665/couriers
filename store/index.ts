// store/index.ts
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {ordersApi} from '../app/services/orders/ordersApi';
import authState from './slices/auth';
import {userAuth} from '../app/services/auth/authApi';
import {authMiddleware} from './middlewares/auth';

const rootReducer = combineReducers({
  authState,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [userAuth.reducerPath]: userAuth.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      ordersApi.middleware,
      userAuth.middleware,
      authMiddleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
