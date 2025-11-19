import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';

import App from './App';
import ThemeContextProvider from './Context/ThemeContext';
import { ToastProvider } from './Context/ToastContext';
import { store } from './store';

const init = async (): Promise<React.ReactNode> => {
  return (
    <ThemeContextProvider>
      <ToastProvider>
        <ErrorBoundary
          fallback={<div>Извините, данные временно недоступны</div>}
        >
          <Provider store={store}>
            <App />
          </Provider>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeContextProvider>
  );
};

export default init;
