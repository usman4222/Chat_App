import { Navigate } from "react-router-dom";
import { appStore } from "../store"

const AuthRoute = ({ children }) => {
    const { setUserInfo } = appStore()
    const isAutenticated = !!setUserInfo;
    return isAutenticated ? <Navigate to="/chat" /> : children
}

export default AuthRoute
