import { type FetchArgs } from '@reduxjs/toolkit/query';
import axios from 'axios';

import { clearTokens, setTokens } from '@/utils/tokenStorage';

export const baseQuery = async (args: string | FetchArgs) => {
  const config = typeof args === 'string' ? { url: args } : args;

  const result = await axios({
    baseURL: import.meta.env.VITE_API_URL,
    url: config.url,
    method: config.method || 'GET',
    data: config.body,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return { data: result.data };
};

axios.interceptors.request.use(
  function (config) {
    if (!config.url?.includes('Authenticate')) {
      const token = localStorage.getItem('accessToken');
      if (token && !config.url?.includes('/static/')) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function onFulfilled(response) {
    return response;
  },
  async function onRejected(error) {
    const isLoginRequest = !error.config.url?.includes('/auth');

    if (error.response?.status === 401 && !isLoginRequest) {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh`,
            { refreshToken: refreshToken }
          );

          if (refreshResponse.data) {
            const tokens = refreshResponse.data;
            setTokens({
              accessToken: tokens.accessToken,
              refreshToken: tokens.refreshToken,
            });

            error.config.headers.Authorization = `Bearer ${tokens.accessToken}`;
            return axios(error.config);
          }
        } catch (error) {
          if (error instanceof Error) console.log(error.message);
          clearTokens();
        }
      } else {
        clearTokens();
      }
    }
    return Promise.reject(error);
  }
);

export default baseQuery;
