import { get, post, put, remove } from "./HttpClient"
import {
    API_GET_COUNTRY_STATES,
    API_GET_USER_WISHLIST,
    API_GET_WISHLIST_LISTS,
    API_POST_PRODUCT_TO_WISHLISTS,
    API_POST_STORE_ADDRESS,
    API_POST_USER_WISHLIST_STORE,
    API_POST_WISHLIST_PRODUCTS
} from "./ApisRoutes"

export const GetCountryStates = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_COUNTRY_STATES}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const PostPutStoreAddress = (params, id) => {
    if (id) {
        return new Promise((resolve, reject) => {
            put(`${API_POST_STORE_ADDRESS}/${id}`, params).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }

    return new Promise((resolve, reject) => {
        post(API_POST_STORE_ADDRESS, params).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServicePostPutWishList = (params, id) => {
    if (id) {

    }
    return new Promise((resolve, reject) => {
        post(API_POST_USER_WISHLIST_STORE, params).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const DeleteStoreAddress = (id) => {
    return new Promise((resolve, reject) => {
        remove(`${API_POST_STORE_ADDRESS}/${id}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const GetUserAddresses = () => {
    return new Promise((resolve, reject) => {
        get(API_POST_STORE_ADDRESS).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetUserWishList = () => {
    return new Promise((resolve, reject) => {
        get(API_GET_USER_WISHLIST).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetWishListProducts = (id, search) => {
    return new Promise((resolve, reject) => {
        get(`${API_POST_WISHLIST_PRODUCTS}/${id}/${search}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetWishListListingForUser = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_WISHLIST_LISTS}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServicePostProductToWishList = (wishListId, productId, action = 'add', otherWishListId) => {
    let URL = ''
    if (action === 'add') {
        URL = `${API_POST_PRODUCT_TO_WISHLISTS}/${wishListId}/product/${productId}/${action}`;
    }else{
        URL = `${API_POST_PRODUCT_TO_WISHLISTS}/${wishListId}/product/${productId}/${action}/${otherWishListId}`;
    }
    return new Promise((resolve, reject) => {
        post(URL).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}