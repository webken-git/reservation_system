// ルーティングとApiのエンドポイントを置く
const ROOT_URL = process.env.REACT_APP_API;

export const AuthUrls = {
  STAFF_LOGIN: `${ROOT_URL}/account/staff-login/`,
  REGISTRATION: `${ROOT_URL}/account/registration/`,
  LOGOUT: `${ROOT_URL}/account/logout/`,
  CHANGE_PASSWORD: `${ROOT_URL}/account/password/change/`,
  RESET_PASSWORD: `${ROOT_URL}/account/password/`,
  RESET_PASSWORD_CONFIRM: `${ROOT_URL}/account/password/reset/`,
  TOKEN: `${ROOT_URL}/account/token/`,
  TOKEN_VERIFY: `${ROOT_URL}/account/token/verify/`,
  TOKEN_REFRESH: `${ROOT_URL}/account/token/refresh/`,
  GET_USER_DATA: `${ROOT_URL}/account/user/`,
  GET_USER_LIST: `${ROOT_URL}/api/users/`,
  APP_SETTINGS: `${ROOT_URL}/api/app-settings/`,
  AUTO_MAIL: `${ROOT_URL}/api/auto-mail/`,
  SEND_MAIL: `${ROOT_URL}/api/send-mail/`,
};
