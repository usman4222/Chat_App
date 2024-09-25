import { Navigate } from "react-router-dom";
import { appStore } from "../store"

const ProtectedRoute = ({ children }) => {
    const { userInfo  } = appStore()
    const isAutenticated = !!userInfo ;
    console.log(isAutenticated);
    
    return isAutenticated ? children : <Navigate to="/auth"/>
}

export default ProtectedRoute
