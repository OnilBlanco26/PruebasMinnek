import { Navigate, Route, Routes } from 'react-router-dom';
import DogsImagePage from '../Dogs/pages/DogsImagePage';
import DogsTablePage from '../Dogs/pages/DogsTablePage';
import Navbar from '../components/Navbar';
import { DogsProvider } from '../context/DogsProvider';

const AppRouter = () => {
  return (
    <DogsProvider>
      <Navbar />
      <Routes>
        <Route path="home" element={<DogsImagePage />} />
        <Route path="dog-list" element={<DogsTablePage />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </DogsProvider>
  );
};

export default AppRouter;
