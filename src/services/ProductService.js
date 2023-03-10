import { get } from "./HttpClient"
import { API_GET_CIRCLE_CATEGORY, API_GET_HOME_INDY_BLOGS_STORY, API_GET_PRODUCT_CATEGORIES, API_GET_PRODUCT_HOME_PAGE_TYPES } from "./ApisRoutes";

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