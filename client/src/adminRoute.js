import { getUser } from "./service/authorize";
import { useLocation, Navigate, Outlet} from "react-router-dom";

// Old Version
// const AdminRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={
//       getUser() ? <Component /> : <Navigate to="/login" replace />
//     }
//   />
// );

// export default AdminRoute;



// New Version
const AdminRoute = ()=>{
  const location = useLocation();

  return(
    getUser() ?
        <Outlet/>
        :<Navigate to="/login" state={{from: location}} replace /> 
        //state={{from: location}} replace เพื่อให้กด Back ที่ Browser ได้
  );   
}

export default AdminRoute;