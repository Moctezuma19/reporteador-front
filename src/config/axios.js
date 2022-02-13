import axios from 'axios';
import {USER_TOKEN} from "../util/Constants";

axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(USER_TOKEN);
        if (accessToken) {
            config.headers["Authorization"] = "Bearer " + accessToken;
        }
        config.headers["Access-Control-Allow-Origin"] = "*";
        config.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
        config.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
        config.headers["Content-type"] = "application/json";

        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);


export {axios as ApiProtected};