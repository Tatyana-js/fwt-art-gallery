import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import { store } from '../index';
import { logout } from '../slices/authSlice';
import { authApi } from './authApi';

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const token = localStorage.getItem('accessToken');

  let finalArgs: FetchArgs;

  if (typeof args === 'string') {
    finalArgs = {
      url: args,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
  } else {
    const isFormData = args.body instanceof FormData;

    const headers: Record<string, string> = {
      // Создаем новые headers как простой объект
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    if (
      args.headers &&
      typeof args.headers === 'object' &&
      !(args.headers instanceof Headers)
    ) {
      Object.assign(headers, args.headers);
    }

    finalArgs = {
      ...args,
      headers,
    };
  }

  return fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL })(
    finalArgs,
    api,
    extraOptions
  );
};

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      try {
        const refreshResult = await store
          .dispatch(authApi.endpoints.refreshToken.initiate({ refreshToken }))
          .unwrap();

        localStorage.setItem('accessToken', refreshResult.accessToken);
        localStorage.setItem('refreshToken', refreshResult.refreshToken);

        result = await baseQuery(args, api, extraOptions);
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        store.dispatch(logout());

        return result;
      }
    } else {
      localStorage.removeItem('accessToken');
      store.dispatch(logout());
      window.history.pushState({ background: '/login' }, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));

      return result;
    }
  }

  return result;
};

export default baseQuery;
