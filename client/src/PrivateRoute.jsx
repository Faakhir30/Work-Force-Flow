import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const user  = useSelector((state) => state.global.userId);
  return user ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;
