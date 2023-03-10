import { post } from "./HttpClient";
import { API_POST_EXPLORE } from "./ApisRoutes";

export const ServiceExploreData = (formData) => {
    return new Promise((resolve, reject) => {
        post(`${API_POST_EXPLORE}`, formData).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}
