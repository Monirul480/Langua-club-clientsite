import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return   <div className="text-center lg:min-h-[calc(100vh_-_10vh)] flex flex-col justify-center">
        <div role="status">
            <div className="flex items-center flex-col">

          <span className="loading   loading-bars loading-lg"></span>
          <span className="text-xl text-black">Loading...</span>
            </div>
        </div>
      </div>
    }

    if (user) {
        return children;
    }
    return <Navigate state={{ from: location }} to="/login" replace></Navigate>;
};

export default PrivateRoute;