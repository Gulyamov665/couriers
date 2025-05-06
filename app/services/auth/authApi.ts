import {createApi} from '@reduxjs/toolkit/query/react';
import {UserInfoType} from '../orders/types';
import {baseQuery} from '../config/base';

export interface IsUserType {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
  email: string;
  is_user: boolean;
  is_vendor: boolean;
  vendor: string | null;
}

export const userAuth = createApi({
  reducerPath: 'userAuth',
  baseQuery,
  endpoints: build => ({
    auth: build.mutation({
      query: body => ({
        url: 'v1/auth/native/login',
        method: 'POST',
        body,
      }),
      onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
        console.log('Query Started:', arg);
        try {
          const result = await queryFulfilled;
          console.log('Query Success:', result.data);
        } catch (error) {
          console.error('Query Error:', error);
        }
      },
    }),
    me: build.query<UserInfoType, number>({
      query: id => `v1/auth/user/${id}`,
    }),
    updateToken: build.mutation({
      query: ({id, body}) => ({
        url: `/v1/auth/user/channel/${id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export type meQueryType = ReturnType<typeof useMeQuery>;

export const {useAuthMutation, useMeQuery, useLazyMeQuery} = userAuth;
