import axios from "axios";
import { authStorage } from "../lib/auth-storage";

const apiClient = axios.create({    //create axios url with base url and headers
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15_000,
});

apiClient.interceptors.request.use(     //interceptor for adding access token to request headers 
    (config) => {
        const accessToken = authStorage.getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

export default apiClient;

//simdilik kullanilmiyor, ileride kullanilabilir.
//now not used, but can be used in the future.