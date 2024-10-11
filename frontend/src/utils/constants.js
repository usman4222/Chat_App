export const HOST = import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTES = "api/auth"
export const USER_ROUTES = "api/user"
export const CONTACT_ROUTES = "/api/contacts"
export const MESSAGES_ROUTES = "api/messages"
export const GROUP_ROUTES = "api/group"

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`

export const USERINFO_ROUTE = `${USER_ROUTES}/userdata`
export const UPDATE_USER_ROUTE = `${USER_ROUTES}/updateprofile`
export const PROFILE_IMAGE_ROUTE = `${USER_ROUTES}/profileimage`
export const DELETE_IMAGE_ROUTE = `${USER_ROUTES}/deleteimage`

export const SEARCH_CONTACT_ROUTE = `${CONTACT_ROUTES}/searchcontact`
export const GET_CONTACT_FOR_DM = `${CONTACT_ROUTES}/getcontactfordm`
export const GET_ALL_CONTACTS = `${CONTACT_ROUTES}/getallcontacts`

export const GET_MESSAGES_ROUTE = `${MESSAGES_ROUTES}/getmessages`
export const UPLOAD_FILE_ROUTE = `${MESSAGES_ROUTES}/uploadfile`  

export const CREATE_GROUP_ROUTE = `${GROUP_ROUTES}/creategroup`
export const ALL_GROUPS_ROUTE = `${GROUP_ROUTES}/getallgroups`
export const ALL_GROUP_MESSAGES_ROUTE = `${GROUP_ROUTES}/getgroupmessages`
export const ALL_GROUP_MEMBERS_ROUTE = `${GROUP_ROUTES}/allgroupmembers`
export const ADD_NEW_MEMBER_ROUTE = `${GROUP_ROUTES}/addnewmember`
export const REMOVE_MEMBER_ROUTE = `${GROUP_ROUTES}/removemember`
export const REMOVE_MEMBER_ITSELF_ROUTE = `${GROUP_ROUTES}/removememberitself`
export const DELETE_GROUP_BY_ADMIN_ROUTE = `${GROUP_ROUTES}/delgroupbyadmin`
