import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {getAccessToken} from '../../tools/tools';

export const createBaseQuery = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: async headers => {
      const token = await getAccessToken();
      if (token?.access) {
        headers.set('Authorization', `Bearer ${token.access}`);
      }
      return headers;
    },
  });
