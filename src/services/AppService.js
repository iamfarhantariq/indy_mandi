import { get, post } from "./HttpClient"
import { API_GET_BEST_DATES_CALENDER, API_GET_COUNTRY_SEARCH_LISTING } from "./ApisRoutes"

export const GetBestTravelDates = ({ month, persona }) => {
    return new Promise((resolve, reject) => {
        get(`${API_GET_BEST_DATES_CALENDER}?searchMonth=${month}&persona=${persona}`).then(response => {
            const datesObj = response?.data;
            resolve(datesObj);
        }).catch(error => {
            console.log(error, "dates response error");
            reject(error);
        });
    });
}

export const SearchCountries = (params) => {
    return new Promise((resolve, reject) => {
        post(API_GET_COUNTRY_SEARCH_LISTING, params).then(response => {
            const datesObj = response?.data;
            resolve(datesObj);
        }).catch(error => {
            console.log(error, "dates response error");
            reject(error);
        });
    });
}