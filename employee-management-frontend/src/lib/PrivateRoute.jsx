import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth);
  const auth = isAuthenticated.isAuthenticated;

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
