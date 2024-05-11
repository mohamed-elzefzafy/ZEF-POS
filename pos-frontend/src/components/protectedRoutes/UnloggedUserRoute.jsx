import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const UnloggedUserRoute = () => {
  const {userInfo} = useSelector(state => state.auth);
     return !userInfo ? <Outlet/> : <Navigate to="/" replace/>
}

export default UnloggedUserRoute;