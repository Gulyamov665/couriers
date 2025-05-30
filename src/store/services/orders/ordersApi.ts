import { createApi } from "@reduxjs/toolkit/query/react";
import { OrdersType } from "./types";
import { ordersQuery } from "../config/base";

export const ordersApi = createApi({
  reducerPath: "orders",
  tagTypes: ["orders", "cart"],
  baseQuery: ordersQuery,

  endpoints: (build) => ({
    getOrders: build.query<OrdersType[], void>({
      query: () => ({
        url: `/orders/status`,
        params: { status: "awaiting_courier" },
      }),
      // onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
      //   console.log('Query Started Orders:', arg);
      //   try {
      //     const result = await queryFulfilled;
      //     console.log('Query Success Orders:', result.data);
      //   } catch (error) {
      //     console.error('Query Error Orders:', error);
      //   }
      // },
      providesTags: ["orders"],
    }),
    updateOrder: build.mutation({
      query: ({ id, body }) => ({
        url: `/orders/update/${id}`,
        method: "PUT",
        body,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        console.log("Query Started OrdersUpdate:", arg);
        try {
          const result = await queryFulfilled;
          console.log("Query Success OrdersUpdate:", result.data);
        } catch (error) {
          console.error("Query Error OrdersUpdate:", error);
        }
      },
      invalidatesTags: ["orders"],
    }),

    getMyOrders: build.query<OrdersType[], { userId: number | undefined }>({
      query: ({ userId }) => ({
        url: `/orders/me/${userId}`,
      }),
      providesTags: ["orders"],
    }),
    getOrderById: build.query<OrdersType, string>({
      query: (id) => ({
        url: `/orders/getOrderById/${id}`,
      }),
      providesTags: ["orders"],
    }),
    getCourierOrders: build.query<OrdersType[], number>({
      query: (id) => ({
        url: `/orders/getCourierOrders/${id}`,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        console.log("Query Started getCourierOrders:", arg);
        try {
          const result = await queryFulfilled;
          console.log("Query Success getCourierOrders:", result.data);
        } catch (error) {
          console.error("Query Error getCourierOrders:", error);
        }
      },
      providesTags: ["orders"],
    }),
    //
  }),
});

export type getOrders = ReturnType<typeof useGetOrdersQuery>;
export type getMyOrders = ReturnType<typeof useGetMyOrdersQuery>;
export type getOrderById = ReturnType<typeof useGetOrderByIdQuery>;

export const {
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useGetCourierOrdersQuery,
} = ordersApi;
