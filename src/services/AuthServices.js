import { get, post } from "./HttpClient"
import { API_AUTH_FORGOT_PASSWORD, API_AUTH_LOGIN, API_AUTH_LOGOUT, API_AUTH_REGISTER, API_AUTH_RESET_PASSWORD, API_AUTH_VERIFY_EMAIL } from "./ApisRoutes";

export const ServiceRegisterUser = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_AUTH_REGISTER}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceVerifyEmail = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_AUTH_VERIFY_EMAIL}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceLoginUser = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_AUTH_LOGIN}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceForgotPassword = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_AUTH_FORGOT_PASSWORD}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceResetPasswordWithCode = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_AUTH_RESET_PASSWORD}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceLogout = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_AUTH_LOGOUT}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}