import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import { store } from '../redux/store/store';

const DogsApp = () => {
  return (
    <Provider store={store}>
     <AppRouter />
    </Provider>
  );
};

export default DogsApp;
