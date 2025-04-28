import {createApi} from '@reduxjs/toolkit/query/react';
import {UserInfoType} from '../orders/types';
import {baseQuery} from '../base';

export const userAuth = createApi({
  reducerPath: 'userAuth',
  baseQuery,
  endpoints: build => ({
    auth: build.mutation({
      query: body => ({
        url: 'v1/auth/user/login',
        method: 'POST',
        body,
      }),
      // onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
      //   console.log('Query Started:', arg);
      //   try {
      //     const result = await queryFulfilled;
      //     console.log('Query Success:', result.data);
      //   } catch (error) {
      //     console.error('Query Error:', error);
      //   }
      // },
    }),
    me: build.query<UserInfoType, number>({
      query: id => `v1/auth/user/${id}`,
    }),
  }),
});

export type meQueryType = ReturnType<typeof useMeQuery>;

export const {useAuthMutation, useMeQuery, useLazyMeQuery} = userAuth;
