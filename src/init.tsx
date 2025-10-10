import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './App';
import ThemeContextProvider from './Context/ThemeContext';
import { artistsApi } from './api/artistsApi';

const init = async (): Promise<React.ReactNode> => {
  const store = configureStore({
    reducer: {
      [artistsApi.reducerPath]: artistsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(artistsApi.middleware),
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
