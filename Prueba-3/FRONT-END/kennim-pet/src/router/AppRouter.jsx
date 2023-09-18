import { HashRouter, Route, Routes } from 'react-router-dom';

import Navbar from '../components/Navbar';
import { DogsProvider } from '../context/DogsProvider';
import DogsImagePage from '../../pages/Dogs/DogsImagePage';
import DogsTablePage from '../../pages/Dogs/DogsTablePage';
import { Loading } from '../components/loading/Loading';
import { setIsLoading } from '../../redux/actions/ui';
import PublicRoute from './PublicRouter';
import Landing from '../../pages/Landing/Landing';
import PrivateRoute from './PrivateRouter';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../../redux/actions/auth';
import { useEffect } from 'react';

const AppRouter = () => {

  const dispatch = useDispatch();
  const { id } = useSelector(state => state.auth);
  const { isLoading } = useSelector(state => state.ui);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);


  
  return (
      
      <HashRouter>
      {setIsLoading && <Loading />}
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute isAuthenticated={!!id}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<Landing />} />
              </Routes>
            </PublicRoute>
          }
        />

        <Route
          path="/dogs"
          element={
            <PrivateRoute isAuthenticated={!!id}>
              <Routes>
                <Route path="home" element={<DogsImagePage />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
 
  );
};

export default AppRouter;
