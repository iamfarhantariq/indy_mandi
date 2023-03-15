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

// App
export const API_GET_COUNTRY_STATES = `${BASE_URL}/getstates`;
export const API_POST_STORE_ADDRESS = `${BASE_URL}/customer/addresses`;
export const API_GET_USER_WISHLIST = `${BASE_URL}/customer/wishlists`;
export const API_POST_USER_WISHLIST_STORE = `${BASE_URL}/customer/wishlist/store`;

// IndyView 
export const API_GET_DAYS_SLOTS = `${BASE_URL}/indyviews/getdates`;
export const API_POST_INDY_MANDI_AD = `${BASE_URL}/indyviews/store`;

// Products
export const API_GET_PRODUCT_CATEGORIES = `${BASE_URL}/home/categories`;
export const API_GET_PRODUCT_HOME_PAGE_TYPES = `${BASE_URL}/home/trending-curated-editors`;
export const API_GET_HOME_INDY_BLOGS_STORY = `${BASE_URL}/home/indyview-blog-story`;
export const API_GET_CIRCLE_CATEGORY = `${BASE_URL}/home/categories/circles`;

// Explore
export const API_POST_EXPLORE = `${BASE_URL}/explore`;
