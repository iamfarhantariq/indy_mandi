import { get, post } from "./HttpClient"
import { API_GET_DAYS_SLOTS } from "./ApisRoutes";

export const ServiceGetDaysSlots = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_DAYS_SLOTS}`).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}
