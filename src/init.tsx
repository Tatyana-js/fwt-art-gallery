import authReducer from '@/slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './App';
import ThemeContextProvider from './Context/ThemeContext';
import { artistsApi } from './api/artistsApi';
import { authApi } from './api/authApi';
import { RootState } from '@/types/types';

const init = async (): Promise<React.ReactNode> => {
  const store = configureStore({
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

  return (
    <ThemeContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeContextProvider>
  );
};

export default init;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;
