import { HashRouter, Route, Routes } from 'react-router-dom';

import Navbar from '../components/Navbar';
import { DogsProvider } from '../context/DogsProvider';
import DogsImagePage from '../pages/Dogs/DogsImagePage';
import DogsTablePage from '../pages/Dogs/DogsTablePage';
import { Loading } from '../components/loading/Loading';
import PublicRoute from './PublicRouter';
import Landing from '../pages/Landing/Landing';
import PrivateRoute from './PrivateRouter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { startChecking } from '../redux/actions/auth';

const AppRouter = () => {

  const dispatch = useDispatch();
  const { id } = useSelector(state => state.auth);
  const { isLoading } = useSelector(state => state.ui);

  // useEffect(() => {
  //   dispatch(startChecking());
  // }, [dispatch]);


  
  return (
      
      <HashRouter>
      {isLoading && <Loading />}
      <Routes>
        <Route
          path="/*"
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
          path="dogs/*"
          element={
            <PrivateRoute isAuthenticated={!!id}>
              <Routes>
                <Route path="home" element={<DogsImagePage />} />
                <Route path="table" element={<DogsTablePage />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </HashRouter>
 
  );
};

export default AppRouter;
