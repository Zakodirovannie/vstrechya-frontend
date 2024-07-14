import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const PrivateRoute = () => {
  const isAuth = useSelector((state) => state.auth.isAuth)
  console.log('isAuth: ', isAuth)
  if (isAuth) {
    return <Outlet/>
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;