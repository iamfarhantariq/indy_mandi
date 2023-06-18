import { get, post, postMultipartData, put, putMultipartData, remove } from "./HttpClient"
import {
    API_DELETE_COLLECTION,
    API_DELETE_PRODUCT,
    API_DELETE_PRODUCT_FROM_COLLECTION,
    API_DELETE_PRODUCT_FROM_WISHLISTS,
    API_DELETE_PRODUCT_IMAGE,
    API_GET_All_CHAT_MESSAGES,
    API_GET_All_COVERSATIONS,
    API_GET_All_KEYS,
    API_GET_All_ORDER,
    API_GET_ALL_SELLER_STORIES,
    API_GET_All_STATS,
    API_GET_BLOGS_CATEGORIES,
    API_GET_BLOGS_EXPLORE,
    API_GET_COUNTRY_STATES,
    API_GET_DELETE_STORE_TEXT,
    API_GET_FEATURE_ARTICLE,
    API_GET_PAYMENTS,
    API_GET_PAYMENTS_INVOICE,
    API_GET_PAYMENT_MODE_LIST,
    API_GET_PRODUCT_DETAIL_TO_EDIT,
    API_GET_SELLER_CATEGORY_BOOK,
    API_GET_SELLER_TYPES,
    API_GET_SINGLE_SELLER_CATEGORY_BOOK,
    API_GET_SINGLE_SELLER_STORY,
    API_GET_USER_WISHLIST,
    API_GET_WISHLIST_LISTS,
    API_POST_DELETE_STORE,
    API_POST_DUPLICATE_PRODUCT,
    API_POST_NEW_COLLECTION,
    API_POST_PRODUCT_TO_COLLECTION,
    API_POST_PRODUCT_TO_WISHLISTS,
    API_POST_READ_BY_RECEIVER,
    API_POST_SEND_MESSAGE,
    API_POST_STORE_ADDRESS,
    API_POST_USER_WISHLIST_STORE,
    API_POST_WISHLIST_PRODUCTS,
    API_PUT_UPDATE_COLLECTION,
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

export const ServiceCreateCollection = (payload) => {
    return new Promise((resolve, reject) => {
        postMultipartData(`${API_POST_NEW_COLLECTION}`, payload).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceUpdateCollection = (collectionId, payload) => {
    return new Promise((resolve, reject) => {
        postMultipartData(`${API_PUT_UPDATE_COLLECTION}/${collectionId}?_method=PUT`, payload).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceDeleteCollection = (collectionId) => {
    return new Promise((resolve, reject) => {
        remove(`${API_DELETE_COLLECTION}/${collectionId}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceDuplicateProduct = (id) => {
    return new Promise((resolve, reject) => {
        post(`${API_POST_DUPLICATE_PRODUCT}/${id}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceDeleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        remove(`${API_DELETE_PRODUCT}/${id}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetLogoutText = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_DELETE_STORE_TEXT}`).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceDeleteStore = () => {
    return new Promise((resolve, reject) => {
        post(`${API_POST_DELETE_STORE}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServicePostProductToCollection = (targetCollectionId, productId, action = 'copy', currectCollection) => {
    let URL = `${API_POST_PRODUCT_TO_COLLECTION}/${targetCollectionId}/product/${productId}/${action}/${currectCollection}`
    return new Promise((resolve, reject) => {
        post(URL).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceDeleteProductFromCollection = (collectionId, productId) => {
    return new Promise((resolve, reject) => {
        remove(`${API_DELETE_PRODUCT_FROM_COLLECTION}/${collectionId}/product/${productId}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetProductsForCollection = (collectionId, page) => {
    return new Promise((resolve, reject) => {
        get(`${API_POST_PRODUCT_TO_COLLECTION}/${collectionId}/products?page=${page}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetFeaturePost = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_FEATURE_ARTICLE}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetSellerCategories = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_SELLER_TYPES}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServicePostNewProducts = (collectionId, payload) => {
    return new Promise((resolve, reject) => {
        post(`${API_POST_PRODUCT_TO_COLLECTION}/${collectionId}/products`, payload).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetBooksOfCategory = (categoryId) => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_SELLER_CATEGORY_BOOK}/${categoryId}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetSingleBooksOfCategory = (bookID) => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_SINGLE_SELLER_CATEGORY_BOOK}/${bookID}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetOrders = (user = 'customer', type, page) => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_All_ORDER}/${user}/all-orders?page=${page}&type=${type}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetStats = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_All_STATS}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetAppKeys = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_All_KEYS}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetAllConversations = () => {
    return new Promise((resolve, reject) => {
        post(`${API_GET_All_COVERSATIONS}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetAllChatMessages = (payload) => {
    return new Promise((resolve, reject) => {
        post(`${API_GET_All_CHAT_MESSAGES}`, payload).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServicePostSendMessage = (conversation_id, payload) => {
    return new Promise((resolve, reject) => {
        postMultipartData(`${API_POST_SEND_MESSAGE}/${conversation_id}`, payload).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServicePostReadMessageByReceiver = (payload) => {
    return new Promise((resolve, reject) => {
        post(`${API_POST_READ_BY_RECEIVER}`, payload).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const GetPaymentModes = () => {
    return new Promise((resolve, reject) => {
        get(API_GET_PAYMENT_MODE_LIST).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const DeletePaymentModes = (id) => {
    return new Promise((resolve, reject) => {
        remove(`${API_GET_PAYMENT_MODE_LIST}/${id}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const PostPutPaymentMode = (params, id) => {
    if (id) {
        return new Promise((resolve, reject) => {
            postMultipartData(`${API_GET_PAYMENT_MODE_LIST}/${id}?_method=PUT`, params).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            });
        });
    }

    return new Promise((resolve, reject) => {
        postMultipartData(API_GET_PAYMENT_MODE_LIST, params).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const GetProductToEdit = (id) => {
    return new Promise((resolve, reject) => {
        post(`${API_GET_PRODUCT_DETAIL_TO_EDIT}/${id}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const DeleteProductImage = (value) => {
    return new Promise((resolve, reject) => {
        remove(`${API_DELETE_PRODUCT_IMAGE}/${value}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}