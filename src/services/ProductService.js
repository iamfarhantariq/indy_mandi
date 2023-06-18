import { get, post, postMultipartData } from "./HttpClient"
import { API_GET_CIRCLE_CATEGORY, API_GET_HOME_INDY_BLOGS_STORY, API_GET_PRODUCT_CATEGORIES, API_GET_PRODUCT_DETAIL, API_GET_PRODUCT_HOME_PAGE_TYPES, API_GET_STORE_COLLECTION_SORTED_PRODUCTS, API_GET_STORE_DETAIL, API_GET_STORE_FIRST_COLLECTION, API_GET_STORE_OTHER_COLLECTION, API_GET_STORE_PRODUCTS, API_GET_UPDATE_PRODUCT_STATUS, API_POST_CREATE_PRODUCT, API_POST_UPDATE_PRODUCT, API_UPLOAD_STORE_IMAGE } from "./ApisRoutes";

export const ServiceGetCategories = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_PRODUCT_CATEGORIES}`).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetTrendingCuratedEditorsProducts = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_PRODUCT_HOME_PAGE_TYPES}`).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetIndyViewBlogsStories = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_HOME_INDY_BLOGS_STORY}`).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetCategoriesCircle = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_CIRCLE_CATEGORY}`).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetProductDetail = (productId) => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_PRODUCT_DETAIL}/${productId}`).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetStoreDetail = (storeId) => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_STORE_DETAIL}/${storeId}/detail`).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetStoreFirstCollection = (storeId) => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_STORE_FIRST_COLLECTION}/${storeId}`).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetStoreOtherCollection = (storeId) => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_STORE_OTHER_COLLECTION}/${storeId}`).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetStoreProducts = (requestPayload, page = 1) => {
    return new Promise((resolve, reject) => {
        post(`${API_GET_STORE_PRODUCTS}?page=${page}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetCollectionProductsSorted = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_GET_STORE_COLLECTION_SORTED_PRODUCTS}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceUpdateProductStatus = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_GET_UPDATE_PRODUCT_STATUS}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceUploadImageForStore = (payload) => {
    return new Promise((resolve, reject) => {
        postMultipartData(`${API_UPLOAD_STORE_IMAGE}`, payload).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceCreateProductToStore = (payload) => {
    return new Promise((resolve, reject) => {
        postMultipartData(`${API_POST_CREATE_PRODUCT}`, payload).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceUpdateProductToStore = (payload) => {
    return new Promise((resolve, reject) => {
        postMultipartData(`${API_POST_UPDATE_PRODUCT}`, payload).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

