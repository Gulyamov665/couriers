import { createApi } from "@reduxjs/toolkit/query/react";
import { GetCourierStatsResponse, OrdersType } from "./types";
import { ordersQuery } from "../config/base";
import { IPeriod } from "app/features/dashboard/CourierStatsScreen";
import { queryLogger } from "app/tools/tools";

export const ordersApi = createApi({
  reducerPath: "orders",
  tagTypes: ["orders", "cart"],
  baseQuery: ordersQuery,

  endpoints: (build) => ({
    getOrders: build.query<OrdersType[], { id: string }>({
      query: ({ id }) => ({
        url: `/orders/status`,
        params: { status: "awaiting_courier", id },
      }),
      // onQueryStarted: queryLogger("getOrders"),
      providesTags: ["orders"],
    }),
    updateOrder: build.mutation({
      query: ({ id, body }) => ({
        url: `/orders/update/${id}`,
        method: "PUT",
        body,
      }),
      // onQueryStarted: queryLogger("updateOrder"),
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
      // onQueryStarted: queryLogger("getCourierOrders"),
      providesTags: ["orders"],
    }),
    getCourierStats: build.query<GetCourierStatsResponse, { id: number; period?: IPeriod }>({
      query: ({ id, period }) => ({
        url: `/orders/getCourierStats/${id}`,
        params: { period: period?.value },
      }),
      providesTags: ["orders"],
    }),
    //
  }),
});

export type getOrders = ReturnType<typeof useGetOrdersQuery>;
export type getMyOrders = ReturnType<typeof useGetMyOrdersQuery>;
export type getOrderById = ReturnType<typeof useGetOrderByIdQuery>;
export type GetCourierStats = ReturnType<typeof useGetCourierStatsQuery>;

export const {
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useGetCourierOrdersQuery,
  useGetCourierStatsQuery,
} = ordersApi;
