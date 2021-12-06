// ルーティングとApiのエンドポイントを置く
const ROOT_URL = process.env.REACT_APP_API;

export const AuthUrls = {
    LOGIN: `${ROOT_URL}/account/login/`,
    // LOGIN: `${ROOT_URL}/account/token/create/`,
    REGISTRATION: `${ROOT_URL}/account/registration/`,
    LOGOUT: `${ROOT_URL}/account/logout/`,
    // LOGOUT: `${ROOT_URL}/account/token/logout/`,
    CHANGE_PASSWORD: `${ROOT_URL}/account/password/change/`,
    RESET_PASSWORD: `${ROOT_URL}/account/password/reset/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}/account/password/reset/confirm/`,
    TOKEN: `${ROOT_URL}/account/token/`,
    TOKEN_VERIFY: `${ROOT_URL}/account/token/verify/`,
    TOKEN_REFRESH: `${ROOT_URL}/account/token/refresh/`,
    GET_USER_DATA: `${ROOT_URL}/account/user/`,
    // GET_USER_DATA: `${ROOT_URL}/account/login-user/`,
    GET_USER_LIST: `${ROOT_URL}/api/users/`,
};
