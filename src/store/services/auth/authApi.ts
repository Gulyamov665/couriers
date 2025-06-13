import { createApi } from "@reduxjs/toolkit/query/react";
import { UserInfoType } from "../orders/types";
import { baseInterceptor } from "../config/base";

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
  reducerPath: "userAuth",
  baseQuery: baseInterceptor,
  endpoints: (build) => ({
    auth: build.mutation({
      query: (body) => ({
        url: "v1/auth/native/login",
        method: "POST",
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
      query: (id) => `v1/auth/user/${id}`,
      // onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      //   console.log("me Started:", arg);
      //   try {
      //     const result = await queryFulfilled;
      //     console.log("me Success:", result.data);
      //   } catch (error) {
      //     console.error("me Error:", error);
      //   }
      // },
    }),
    updateToken: build.mutation({
      query: ({ id, body }) => ({
        url: `/v1/auth/user/channel/${id}`,
        method: "PUT",
        body,
      }),
    }),
    setFcmToken: build.mutation({
      query: ({ id, fcm_token }) => ({
        url: `/v1/auth/user/channel/${id}`,
        method: "PATCH",
        body: { fcm_token },
      }),
      // onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      //   console.log("setFcmToken Started:", arg);
      //   try {
      //     const result = await queryFulfilled;
      //     console.log("setFcmToken Success:", result.data);
      //   } catch (error) {
      //     console.error("setFcmToken Error:", error);
      //   }
      // },
    }),
  }),
});

export type meQueryType = ReturnType<typeof useMeQuery>;

export const { useAuthMutation, useMeQuery, useLazyMeQuery, useSetFcmTokenMutation } = userAuth;
