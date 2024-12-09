
import axios from "axios";
import { refresh } from "./authService";
import {store} from "../redux/store"
const api = axios.create({
    baseURL: "http://localhost:8888/lib"
});

api.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});


let isRefreshToken = false;
api.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    switch (error.status) {
        case 401:
            // const refreshToken = store.getState().user.user.refreshToken; // Lấy từ Redux
            // if (isRefreshToken === false) {
            //     isRefreshToken = true;
            //     const response = await refresh(refreshToken);
            //     console.log(response);
            //     if (response.data.code === 200) {
            //         store.dispatch({
            //             type: 'LOGIN',
            //             payload: response,
            //         });
            //         isRefreshToken = false;
            //         window.location.reload();
            //     }
            //     else {
            //         store.dispatch({type: "LOGOUT"})
            //     }
            // }
            break;
        case 403:
            console.error("Forbidden: You do not have the necessary permissions.");
            alert("You don't have permission to access this resource.");
            break;
        case 404:
            console.error("Not Found: The requested resource does not exist.");
            alert("The resource you're looking for cannot be found.");
            break;
        case 411:
            console.error("RefreshToken invalid. Please re login.");
            store.dispatch({ type: "LOGOUT" })
            break;
        case 500:
            console.error("Server Error: An error occurred on the server.");
            alert("A server error occurred. Please try again later.");
            break;
        default:
            console.error(`Unhandled error status: ${error.status}`);
            alert("An unexpected error occurred.");
    }
            
    return  Promise.reject(error);
});

export default api;