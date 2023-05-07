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
export const API_POST_RESET_PASSWORD = `${BASE_URL}/update/current/password`;
export const API_POST_UPLOAD_THUMBNAIL = `${BASE_URL}/upload/thumbnail`;
export const API_POST_UPLOAD_THUMBNAIL_BANNER = `${BASE_URL}/vendor/upload/banner-image`;
export const API_DELETE_THUMBNAIL_BANNER = `${BASE_URL}/vendor/delete/banner-image`;
export const API_UPDATE_USER_NAME = `${BASE_URL}/customer/profile/setting`;
export const API_GET_UPDATED_USER = `${BASE_URL}/get-updated-user`;
export const API_UPDATE_CURRENT_EMAIL = `${BASE_URL}/update/current/email/authenticate`;
export const API_POST_VERIFY_NEW_EMAIL = `${BASE_URL}/update/current/email`;

// App
export const API_GET_COUNTRY_STATES = `${BASE_URL}/getstates`;
export const API_POST_STORE_ADDRESS = `${BASE_URL}/customer/addresses`;
export const API_GET_USER_WISHLIST = `${BASE_URL}/customer/wishlists`;
export const API_POST_USER_WISHLIST_STORE = `${BASE_URL}/customer/wishlist/store`;
export const API_PUT_USER_WISHLIST_UPDATE = `${BASE_URL}/customer/wishlist/update`;
export const API_POST_WISHLIST_PRODUCTS = `${BASE_URL}/customer/wishlist/products`;
export const API_GET_WISHLIST_LISTS = `${BASE_URL}/customer/wishlists/list`;
export const API_POST_PRODUCT_TO_WISHLISTS = `${BASE_URL}/customer/wishlist/add`;
export const API_DELETE_PRODUCT_FROM_WISHLISTS = `${BASE_URL}/customer/wishlist/delete`;
export const API_POST_RAISE_DISPUTE = `${BASE_URL}/raise-an-dispute/store`;
export const API_GET_PAYMENTS = `${BASE_URL}/payments`;
export const API_GET_PAYMENTS_INVOICE = `${BASE_URL}/view-invoice`;
export const API_GET_BLOGS_EXPLORE = `${BASE_URL}/explore`;
export const API_GET_BLOGS_CATEGORIES = `${BASE_URL}/explore/blog-categories`;
export const API_GET_ALL_SELLER_STORIES = `${BASE_URL}/seller-stories`;
export const API_GET_SINGLE_SELLER_STORY = `${BASE_URL}/seller-story`;
export const API_GET_DELETE_STORE_TEXT = `${BASE_URL}/vendor/store/delete/text`;
export const API_POST_DELETE_STORE = `${BASE_URL}/vendor/store/delete`;
export const API_POST_UPDATE_STORE = `${BASE_URL}/vendor/store/update`;
export const API_POST_PRODUCT_TO_COLLECTION = `${BASE_URL}/vendor/collection/add`;
export const API_DELETE_PRODUCT_FROM_COLLECTION = `${BASE_URL}/vendor/collection/delete`;
export const API_GET_FEATURE_ARTICLE = `${BASE_URL}/vendor/sellerhandbook/feature-article`;
export const API_GET_SELLER_TYPES = `${BASE_URL}/vendor/sellerhandbook/categories`;
export const API_GET_SELLER_CATEGORY_BOOK = `${BASE_URL}/vendor/sellerhandbook/articles`;
export const API_GET_SINGLE_SELLER_CATEGORY_BOOK = `${BASE_URL}/vendor/sellerhandbook/articles/detail`;
export const API_GET_All_ORDER = `${BASE_URL}`;
export const API_GET_All_STATS = `${BASE_URL}/vendor/widgets/qr-code`;
export const API_GET_All_KEYS = `${BASE_URL}/get-keys/Hl07rf68BWuY6QLT6UtN4rdsyNl8JVrxT7OxOuOYRNzrLwasOMxc1dPyVBq65LK0`;
export const API_GET_All_COVERSATIONS = `${BASE_URL}/get/all/conversations`;
export const API_GET_All_CHAT_MESSAGES = `${BASE_URL}/get/all/chats`;
export const API_POST_SEND_MESSAGE = `${BASE_URL}/send/message/chat`;
export const API_POST_READ_BY_RECEIVER = `${BASE_URL}/read/by/reciever`;

// IndyView 
export const API_GET_DAYS_SLOTS = `${BASE_URL}/indyviews/getdates`;
export const API_POST_INDY_MANDI_AD = `${BASE_URL}/indyviews/store`;
export const API_POST_BECOME_A_SELLER = `${BASE_URL}/become-a-seller/store`;

// Products
export const API_GET_PRODUCT_CATEGORIES = `${BASE_URL}/home/categories`;
export const API_GET_PRODUCT_HOME_PAGE_TYPES = `${BASE_URL}/home/trending-curated-editors`;
export const API_GET_HOME_INDY_BLOGS_STORY = `${BASE_URL}/home/indyview-blog-story`;
export const API_GET_CIRCLE_CATEGORY = `${BASE_URL}/home/categories/circles`;
export const API_GET_PRODUCT_DETAIL = `${BASE_URL}/explore/view/product`;
export const API_GET_STORE_DETAIL = `${BASE_URL}/explore/visit/store`;
export const API_GET_STORE_FIRST_COLLECTION = `${BASE_URL}/store/collections-all`;
export const API_GET_STORE_OTHER_COLLECTION = `${BASE_URL}/store/collections`;
export const API_GET_STORE_PRODUCTS = `${BASE_URL}/store/products`;
export const API_GET_STORE_COLLECTION_SORTED_PRODUCTS = `${BASE_URL}/vendor/update-products-order`;
export const API_GET_UPDATE_PRODUCT_STATUS = `${BASE_URL}/vendor/updateproductstatus`;
export const API_UPLOAD_STORE_IMAGE = `${BASE_URL}/vendor/product/crop-image/store`;
export const API_POST_CREATE_PRODUCT = `${BASE_URL}/vendor/product/store`;

// Collection
export const API_POST_NEW_COLLECTION = `${BASE_URL}/vendor/collection/store`;
export const API_PUT_UPDATE_COLLECTION = `${BASE_URL}/vendor/collection/update`;
export const API_DELETE_COLLECTION = `${BASE_URL}/vendor/collection/delete`;
export const API_POST_DUPLICATE_PRODUCT = `${BASE_URL}/vendor/duplicate-product`;
export const API_DELETE_PRODUCT = `${BASE_URL}/vendor/delete-product`;

// Explore
export const API_POST_EXPLORE = `${BASE_URL}/explore`;
