import AppConfig from "../helpers/config";
const BASE_URL = AppConfig.baseApiURL;

// AUTH APIS
export const API_AUTH_REGISTER = `${BASE_URL}/auth/register`;
export const API_AUTH_LOGIN = `${BASE_URL}/auth/login`;
export const API_AUTH_LOGOUT = `${BASE_URL}/auth/logout`;
export const API_AUTH_RESEND_CODE = `${BASE_URL}/auth/verify/email/resend`;
export const API_AUTH_VERIFY_EMAIL = `${BASE_URL}/auth/verify/email`;
export const API_AUTH_FORGOT_PASSWORD = `${BASE_URL}/auth/forgot/password`;
export const API_AUTH_RESET_PASSWORD = `${BASE_URL}/auth/reset/password`;
