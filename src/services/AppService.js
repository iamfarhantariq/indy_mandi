import { get, post, put, remove } from "./HttpClient"
import {
    API_DELETE_PRODUCT_FROM_WISHLISTS,
    API_GET_ALL_SELLER_STORIES,
    API_GET_BLOGS_CATEGORIES,
    API_GET_BLOGS_EXPLORE,
    API_GET_COUNTRY_STATES,
    API_GET_PAYMENTS,
    API_GET_PAYMENTS_INVOICE,
    API_GET_SINGLE_SELLER_STORY,
    API_GET_USER_WISHLIST,
    API_GET_WISHLIST_LISTS,
    API_POST_PRODUCT_TO_WISHLISTS,
    API_POST_STORE_ADDRESS,
    API_POST_USER_WISHLIST_STORE,
    API_POST_WISHLIST_PRODUCTS,
    API_PUT_USER_WISHLIST_UPDATE
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
        return new Promise((resolve, reject) => {
            put(`${API_PUT_USER_WISHLIST_UPDATE}/${id}`, params).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
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
    } else {
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

export const ServiceDeleteProductFromWishList = (wishListId, productId) => {
    return new Promise((resolve, reject) => {
        remove(`${API_DELETE_PRODUCT_FROM_WISHLISTS}/${wishListId}/product/${productId}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const DeleteWishlist = (id) => {
    return new Promise((resolve, reject) => {
        remove(`${API_DELETE_PRODUCT_FROM_WISHLISTS}/${id}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetUserPayments = (page) => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_PAYMENTS}?page=${page}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetUserPaymentsInvoice = (id) => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_PAYMENTS_INVOICE}/${id}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetBlogsCategories = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_BLOGS_CATEGORIES}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetBlogsToExplore = (payload, page = 1) => {
    return new Promise((resolve, reject) => {
        post(`${API_GET_BLOGS_EXPLORE}?page=${page}`, payload).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetAllSellerStories = (page = 1) => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_ALL_SELLER_STORIES}?page=${page}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetSingleStory = (slug) => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_SINGLE_SELLER_STORY}/${slug}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}
