import { Navigate } from "react-router-dom";

const PublicRoute = ({ isAuthenticated, children }) => {
  console.log(isAuthenticated);
  return !isAuthenticated ? children : <Navigate to="dogs/home" />;
};

export default PublicRoute;
