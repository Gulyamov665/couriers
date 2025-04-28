import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseURL = 'https://new.aurora-api.uz/api/';
// const admins = "client/";

export const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
});
