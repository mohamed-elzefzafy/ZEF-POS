import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoutes = () => {
  const {userInfo} = useSelector(state => state.auth);

  return  userInfo && (userInfo.role === 'admin'  ||  userInfo.role === 'superAdmin') ? <Outlet/> : 
   <Navigate to="/" replace/> 
}
 
export default AdminRoutes;


