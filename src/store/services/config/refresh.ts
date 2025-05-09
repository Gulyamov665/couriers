import {QueryReturnValue, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query';
import {FetchBaseQueryError, FetchBaseQueryMeta} from '@reduxjs/toolkit/query';
import {logout} from '../../../store/slices/auth';
import * as Keychain from 'react-native-keychain';

export type TokenType = {
  access: string;
  refresh: string;
};

export const handleRefreshToken = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: any,
  base: BaseQueryFn,
  refresh: string,
): Promise<
  QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
> => {
  const refreshResult = await base(
    {
      url: 'v1/auth/native/refresh',
      method: 'POST',
      body: {refresh},
    },
    api,
    extraOptions,
  );

  if (refreshResult?.data) {
    const newToken = refreshResult.data as TokenType;

    if (newToken) {
      await Keychain.setGenericPassword(
        'auth',
        JSON.stringify({
          access: newToken.access,
          refresh: newToken.refresh,
        }),
      );
    }

    return (await base(args, api, extraOptions)) as QueryReturnValue<
      unknown,
      FetchBaseQueryError,
      FetchBaseQueryMeta
    >;
  }

  await api.dispatch(logout());

  return refreshResult as QueryReturnValue<
    unknown,
    FetchBaseQueryError,
    FetchBaseQueryMeta
  >;
};
