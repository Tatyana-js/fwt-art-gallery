import { configureStore } from '@reduxjs/toolkit';

import { artistsApi } from './api/artistsApi';
import { authApi } from './api/authApi';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [artistsApi.reducerPath]: artistsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(artistsApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
