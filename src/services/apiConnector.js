import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method,
        url,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null
    })
}