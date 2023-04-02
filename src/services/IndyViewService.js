import { get, postMultipartData } from "./HttpClient"
import { API_GET_DAYS_SLOTS, API_POST_BECOME_A_SELLER, API_POST_INDY_MANDI_AD, API_POST_RAISE_DISPUTE } from "./ApisRoutes";

export const ServiceGetDaysSlots = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_DAYS_SLOTS}`).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceStoreIndyView = (formData) => {
    return new Promise((resolve, reject) => {
        postMultipartData(`${API_POST_INDY_MANDI_AD}`, formData).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServicePostRaiseDispute = (formData) => {
    return new Promise((resolve, reject) => {
        postMultipartData(`${API_POST_RAISE_DISPUTE}`, formData).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServicePostBecomeASeller = (formData) => {
    return new Promise((resolve, reject) => {
        postMultipartData(`${API_POST_BECOME_A_SELLER}`, formData).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}
