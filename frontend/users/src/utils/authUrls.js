// ルーティングとApiのエンドポイントを置く
const ROOT_URL = process.env.REACT_APP_API;

export const AuthUrls = {
    LOGIN: `${ROOT_URL}/account/login/`,
    REGISTRATION: `${ROOT_URL}/account/registration/`,
    LOGOUT: `${ROOT_URL}/account/logout/`,
    CHANGE_PASSWORD: `${ROOT_URL}/account/password/change/`,
    RESET_PASSWORD: `${ROOT_URL}/account/password/reset/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}/account/password/reset/confirm/`,
    TOKEN_VERIFY: `${ROOT_URL}/account/token/verify/`,
    TOKEN_REFRESH: `${ROOT_URL}/account/token/refresh/`,
    GET_USER_DATA: `${ROOT_URL}/account/user/`,
    GET_USER_LIST: `${ROOT_URL}/api/users/`,
};
