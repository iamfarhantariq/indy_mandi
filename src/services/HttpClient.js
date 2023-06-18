import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConfig from "../helpers/config"

const axiosApiInstance = axios.create();

export const post = (api, data, source) => {
    if (source) {
        const config = { cancelToken: source.token };
        return axiosApiInstance.post(api, data, config);
    }
    return axiosApiInstance.post(api, data);
};

export const postMultipartData = async (api, data) => {
    const value = await AsyncStorage.getItem("auth_token");
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    };
    if (value !== null) {
        headers['Authorization'] = `Bearer ${value}`
    }
    return axios.post(api, data, {
        headers
    });
};

export const putMultipartData = async (api, data) => {
    const value = await AsyncStorage.getItem("auth_token");
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    };
    if (value !== null) {
        headers['Authorization'] = `Bearer ${value}`
    }
    return axios.put(api, data, {
        headers
    });
};

export const postWithoutBody = (api) => {
    return axiosApiInstance.post(api);
};

export const get = (api) => {
    return axiosApiInstance.get(api);
};

export const getWithParams = (api, data) => {
    return axiosApiInstance.get(api, data);
};

export const patch = (api, data) => {
    return axiosApiInstance.patch(api, data);
};

export const put = (api, data) => {
    return axiosApiInstance.put(api, data);
};

export const remove = (api) => {
    return axiosApiInstance.delete(api);
};

axiosApiInstance.interceptors.request.use(async config => {
    const value = await AsyncStorage.getItem("auth_token");
    config.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    if (value) {
        config.headers['Authorization'] = `Bearer ${value}`
    }
    return config;
},
    error => {
        Promise.reject(error)
    });

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
        // originalRequest._retry = true;
        // const res = await postWithoutBody(`${AppConfig.baseApiURL}/Authenticate/GetAccessToken`);
        // await AsyncStorage.setItem("auth_token", res.data.access_token);
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;
        // return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
});