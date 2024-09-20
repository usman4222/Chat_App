export const HOST = import.meta.env.SERVER_URL

export const AUTH_ROUTES = "api/auth"
export const USER_ROUTES = "api/user"
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const USERINFO_ROUTE = `${USER_ROUTES}/userdata`
export const UPDATE_USER_ROUTE = `${USER_ROUTES}/updateprofile`