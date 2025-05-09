import {createApi} from '@reduxjs/toolkit/query/react';
import {OrdersType} from './types';
import {ordersQuery} from '../config/base';

export const ordersApi = createApi({
  reducerPath: 'orders',
  tagTypes: ['orders', 'cart'],
  baseQuery: ordersQuery,

  endpoints: build => ({
    getOrders: build.query<OrdersType[], void>({
      query: () => ({
        url: `/orders/status`,
        params: {status: 'awaiting_courier'},
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
      providesTags: ['orders'],
    }),
    updateOrder: build.mutation({
      query: ({id, body}) => ({
        url: `/orders/update/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['orders'],
    }),

    getMyOrders: build.query<OrdersType[], {userId: number | undefined}>({
      query: ({userId}) => ({
        url: `/orders/me/${userId}`,
      }),
      providesTags: ['orders'],
    }),
    getOrderById: build.query<OrdersType, string>({
      query: id => ({
        url: `/orders/getOrderById/${id}`,
      }),
      providesTags: ['orders'],
    }),
    getCourierOrders: build.query<OrdersType[], number>({
      query: id => ({
        url: `/orders/getCourierOrders/${id}`,
      }),
      providesTags: ['orders'],
    }),
    createOrder: build.mutation({
      query: body => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['orders', 'cart'],
    }),
    getCart: build.query({
      query: ({user, vendorId}) => ({
        url: `/cart?user_id=${user}&restaurant_id=${vendorId}`,
      }),
      providesTags: ['cart'],
    }),
    addToCart: build.mutation({
      query: body => ({
        url: '/cart/addToCart',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['cart'],
    }),
    decreaseItem: build.mutation({
      query: body => ({
        url: '/cart/decrease',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['cart'],
    }),
    removeCart: build.mutation({
      query: cartId => ({
        url: `/cart/${cartId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cart'],
    }),
  }),
});

export type addToCartMutationType = ReturnType<typeof useAddToCartMutation>;
export type decreaseItemMutationType = ReturnType<
  typeof useDecreaseItemMutation
>;
export type getCart = ReturnType<typeof useGetCartQuery>;
export type createOrderMutationType = ReturnType<typeof useCreateOrderMutation>;
export type getOrders = ReturnType<typeof useGetOrdersQuery>;
export type getMyOrders = ReturnType<typeof useGetMyOrdersQuery>;
export type getOrderById = ReturnType<typeof useGetOrderByIdQuery>;
export type removeCartMutationType = ReturnType<typeof useRemoveCartMutation>;

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useLazyGetOrdersQuery,
  useAddToCartMutation,
  useGetCartQuery,
  useDecreaseItemMutation,
  useGetMyOrdersQuery,
  useRemoveCartMutation,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useGetCourierOrdersQuery,
} = ordersApi;
