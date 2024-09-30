export const HOST = import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTES = "api/auth"
export const USER_ROUTES = "api/user"
export const CONTACT_ROUTES = "/api/contacts"
export const MESSAGES_ROUTES = "api/messages"

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`

export const USERINFO_ROUTE = `${USER_ROUTES}/userdata`
export const UPDATE_USER_ROUTE = `${USER_ROUTES}/updateprofile`
export const PROFILE_IMAGE_ROUTE = `${USER_ROUTES}/profileimage`
export const DELETE_IMAGE_ROUTE = `${USER_ROUTES}/deleteimage`

export const SEARCH_CONTACT_ROUTE = `${CONTACT_ROUTES}/searchcontact`
export const GET_CONTACT_FOR_DM = `${CONTACT_ROUTES}/getcontactfordm`

export const GET_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/getmessages`

