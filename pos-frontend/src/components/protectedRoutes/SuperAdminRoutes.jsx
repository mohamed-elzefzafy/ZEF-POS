import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const SuperAdminRoutes = () => {
  const {userInfo} = useSelector(state => state.auth);
  
  return userInfo && userInfo.role === 'superAdmin' ? <Outlet/> :
   userInfo && userInfo.role === 'admin' ? <Navigate to="/"/> :  <Navigate to="/login"/> 
}

export default SuperAdminRoutes;