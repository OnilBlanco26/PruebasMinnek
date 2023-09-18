import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import { store } from './redux/store/store';
import { DogsProvider } from './context/DogsProvider';

const DogsApp = () => {
  return (
    <Provider store={store}>
      <DogsProvider>
        <AppRouter />
      </DogsProvider>
    </Provider>
  );
};

export default DogsApp;
