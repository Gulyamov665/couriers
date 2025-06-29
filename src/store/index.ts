import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authState from "./slices/auth";
import { authMiddleware } from "./middlewares/auth";
import { ordersApi } from "./services/orders/ordersApi";
import { userAuth } from "./services/auth/authApi";
import notificationState from "./slices/notification";

const rootReducer = combineReducers({
  authState,
  notificationState,
  [ordersApi.reducerPath]: ordersApi.reducer,
  [userAuth.reducerPath]: userAuth.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ordersApi.middleware, userAuth.middleware, authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
