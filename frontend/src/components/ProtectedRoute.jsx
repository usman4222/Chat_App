import { Navigate } from "react-router-dom";
import { appStore } from "../store"

const ProtectedRoute = ({ children }) => {
    const { setUserInfo } = appStore()
    const isAutenticated = !!setUserInfo;
    return isAutenticated ? children : <Navigate to="/auth"/>
}

export default ProtectedRoute
