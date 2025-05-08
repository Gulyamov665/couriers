import {FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {QueryReturnValue} from '@reduxjs/toolkit/query/react';
import {FetchArgs, FetchBaseQueryMeta} from '@reduxjs/toolkit/query/react';
import {BaseQueryFn} from '@reduxjs/toolkit/query/react';
import {getAccessToken, isTokenExpired} from '../../tools/tools';
import {handleRefreshToken} from './refresh';
import {logout} from '../../../store/slices/auth';
import {createBaseQuery} from './createBaseConfig';

const baseURL = 'https://stage.aurora-api.uz/api/';
const ordersURL = 'https://new.aurora-api.uz/api-node/api';
let isRefreshing = false;
let refreshPromise: Promise<
  QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
> | null = null;

export const baseQuery = createBaseQuery(baseURL);
export const ordersQuery = createBaseQuery(ordersURL);

export const baseInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const token = await getAccessToken();

  if (token && isTokenExpired(token.access)) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = handleRefreshToken(
        args,
        api,
        extraOptions,
        baseQuery,
        token.refresh,
      ).finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }

    try {
      await refreshPromise;
      const refreshedResult = await baseQuery(args, api, extraOptions);
      return refreshedResult;
    } catch (error) {
      console.error('Refresh token error:', error);
      return {error: {status: 401, data: {message: 'Unauthorized'}}};
    }
  }

  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    api.dispatch(logout());
  }

  return result;
};
