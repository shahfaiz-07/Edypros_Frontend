import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
    console.log(import.meta.env)
    return axiosInstance({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        method,
        url,
        data: bodyData ? bodyData : null,
        headers: headers ? headers : null,
        params: params ? params : null
    })
}