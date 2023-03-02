import { get, post } from "./HttpClient"
import { API_AUTH_REGISTER } from "./ApisRoutes"

export const ServiceRegisterUser = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_AUTH_REGISTER}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error?.response?.data);
        });
    });
}

export const ServiceVerifyEmail = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_AUTH_VERIFY_EMAIL}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error?.response?.data);
        });
    });
}