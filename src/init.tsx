import { Provider } from 'react-redux';

import App from './App';
import ThemeContextProvider from './Context/ThemeContext';
import { store } from './store';

const init = async (): Promise<React.ReactNode> => {
  return (
    <ThemeContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeContextProvider>
  );
};

export default init;
