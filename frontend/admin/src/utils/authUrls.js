// ルーティングとApiのエンドポイントを置く
const ROOT_URL = process.env.REACT_APP_API;

export const AuthUrls = {
    STAFF_LOGIN: `${ROOT_URL}/account/staff-login/`,
    REGISTER: `${ROOT_URL}/account/registration/`,
    LOGOUT: `${ROOT_URL}/account/logout/`,
    CHANGE_PASSWORD: `${ROOT_URL}/account/password/change/`,
    RESET_PASSWORD: `${ROOT_URL}/account/password/reset/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}/account/password/reset/confirm/`,
    GET_USER_DATA: `${ROOT_URL}/account/user/`,
    GET_USER_LIST: `${ROOT_URL}/api/users/`,
};
