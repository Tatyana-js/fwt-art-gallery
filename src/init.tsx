import { Provider } from 'react-redux';

import App from './App';
import ThemeContextProvider from './Context/ThemeContext';
import { ToastProvider } from './Context/ToastContext';
import { store } from './store';

const init = async (): Promise<React.ReactNode> => {
  return (
    <ThemeContextProvider>
      <ToastProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ToastProvider>
    </ThemeContextProvider>
  );
};

export default init;
