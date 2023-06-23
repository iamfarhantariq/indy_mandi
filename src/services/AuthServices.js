import { get, post, postMultipartData, remove } from "./HttpClient"
import { API_AUTH_FORGOT_PASSWORD, API_AUTH_LOGIN, API_AUTH_LOGOUT, API_AUTH_REGISTER, API_AUTH_RESET_PASSWORD, API_AUTH_VERIFY_EMAIL, API_DELETE_THUMBNAIL_BANNER, API_GET_UPDATED_USER, API_POST_RESET_PASSWORD, API_POST_SOCIAL_OBJECT, API_POST_UPLOAD_THUMBNAIL, API_POST_UPLOAD_THUMBNAIL_BANNER, API_POST_VERIFY_NEW_EMAIL, API_UPDATE_CURRENT_EMAIL, API_UPDATE_USER_NAME } from "./ApisRoutes";

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

export const ServiceUserChangePassword = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_POST_RESET_PASSWORD}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceUserChangeImage = (formData) => {
    return new Promise((resolve, reject) => {
        postMultipartData(`${API_POST_UPLOAD_THUMBNAIL}`, formData).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceChangeStoreImage = (formData) => {
    return new Promise((resolve, reject) => {
        postMultipartData(`${API_POST_UPLOAD_THUMBNAIL_BANNER}`, formData).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceDeleteStoreImage = () => {
    return new Promise((resolve, reject) => {
        post(`${API_DELETE_THUMBNAIL_BANNER}`).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceUserChangeName = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_UPDATE_USER_NAME}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceGetUser = () => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_UPDATED_USER}`).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceUserEmailChange = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_UPDATE_CURRENT_EMAIL}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceUserEmailVerifyNew = (requestPayload) => {
    return new Promise((resolve, reject) => {
        post(`${API_POST_VERIFY_NEW_EMAIL}`, requestPayload).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}

export const ServiceVerifySocialAuth = (object) => {
    return new Promise((resolve, reject) => {
        post(`${API_POST_SOCIAL_OBJECT}`, object).then(response => {
            resolve(response?.data);
        }).catch(error => {
            reject(error);
        });
    });
}
