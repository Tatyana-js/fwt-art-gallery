import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from '@/utils/getImageSrc';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    refreshToken: builder.mutation<
      { accessToken: string },
      { refreshToken: string }
    >({
      query: (data) => ({
        url: '/auth/refresh',
        metod: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<
      {
        accessToken: string;
        refreshToken: string;
      },
      { username: string; password: string; fingerprint: string }
    >({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useRefreshTokenMutation, useLoginMutation } = authApi;
