import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {OrdersType} from './types';
import {getAccessToken} from '../../tools/tools';

const url = 'https://new.aurora-api.uz/api-node/api'; // URL вашего API

export const baseQuery = fetchBaseQuery({
  baseUrl: url,
  prepareHeaders: async headers => {
    const token = await getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 500) {
    console.error('Ошибка 500: проблема на сервере', result.error);
    const errorData = result.error.data as {message: string};
    // alert(`${errorData.message}! Попробуйте позже.`)
  }
  return result;
};

export const ordersApi = createApi({
  reducerPath: 'orders',
  tagTypes: ['orders', 'cart'],
  baseQuery: baseQueryWithInterceptor,

  endpoints: build => ({
    getOrders: build.query<OrdersType[], void>({
      query: () => ({
        url: `/orders/status`,
        params: {status: 'awaiting_courier'},
      }),
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
} = ordersApi;
