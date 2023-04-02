import { get, post } from "./HttpClient"
import { API_GET_CIRCLE_CATEGORY, API_GET_HOME_INDY_BLOGS_STORY, API_GET_PRODUCT_CATEGORIES, API_GET_PRODUCT_DETAIL, API_GET_PRODUCT_HOME_PAGE_TYPES, API_GET_STORE_DETAIL, API_GET_STORE_FIRST_COLLECTION, API_GET_STORE_OTHER_COLLECTION, API_GET_STORE_PRODUCTS } from "./ApisRoutes";

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


export const ServiceGetStoreProducts = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_GET_STORE_PRODUCTS}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}
