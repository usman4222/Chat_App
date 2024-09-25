import { Navigate } from "react-router-dom";
import { appStore } from "../store"

const AuthRoute = ({ children }) => {
    const { userInfo  } = appStore()
    const isAutenticated = !!userInfo ;
    return isAutenticated ? <Navigate to="/chat" /> : children
}

export default AuthRoute
