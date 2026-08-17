import axios, {
    type AxiosError,
    type InternalAxiosRequestConfig,
} from "axios";

import { authStorage } from "./../lib/auth-storage";

interface RetryableRequestConfig
    extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 15_000,
});

let isRefreshing = false;

interface RefreshSubscriber {
    resolve: (accessToken: string) => void;
    reject: (error: unknown) => void;
}

let refreshSubscribers: RefreshSubscriber[] = [];

const subscribeTokenRefresh = (
    resolve: (accessToken: string) => void,
    reject: (error: unknown) => void,
) => {
    refreshSubscribers.push({ resolve, reject });
};

const notifyTokenRefreshed = (
    accessToken: string,
) => {
    refreshSubscribers.forEach(
        (subscriber) => subscriber.resolve(accessToken),
    );

    refreshSubscribers = [];
};

const notifyTokenRefreshFailed = (
    error: unknown,
) => {
    refreshSubscribers.forEach(
        (subscriber) => subscriber.reject(error),
    );

    refreshSubscribers = [];
};

const forceLogout = () => {
    authStorage.clear();

    window.dispatchEvent(
        new Event("auth:logout"),
    );
};

apiClient.interceptors.request.use(
    (config) => {
        const accessToken =
            authStorage.getAccessToken();

        if (accessToken) {
            if (config.headers && typeof config.headers.set === "function") {
                config.headers.set("Authorization", `Bearer ${accessToken}`);
            } else if (config.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    (error) =>
        Promise.reject(error),
);

apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest =
            error.config as
            | RetryableRequestConfig
            | undefined;

        if (
            error.response?.status !== 401 ||
            !originalRequest
        ) {
            return Promise.reject(error);
        }

        const requestUrl =
            originalRequest.url ?? "";

        if (
            requestUrl.includes(
                "/api/v1/auth/login",
            ) ||
            requestUrl.includes(
                "/api/v1/auth/register",
            ) ||
            requestUrl.includes(
                "/api/v1/auth/refresh-token",
            ) ||
            requestUrl.includes(
                "/api/v1/auth/logout",
            )
        ) {
            return Promise.reject(error);
        }

        if (originalRequest._retry) {
            forceLogout();
            return Promise.reject(error);
        }

        const refreshToken =
            authStorage.getRefreshToken();

        if (!refreshToken) {
            forceLogout();
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                subscribeTokenRefresh(
                    (newAccessToken) => {
                        originalRequest._retry =
                            true;

                        if (originalRequest.headers) {
                            if (typeof originalRequest.headers.set === "function") {
                                originalRequest.headers.set(
                                    "Authorization",
                                    `Bearer ${newAccessToken}`,
                                );
                            } else {
                                originalRequest.headers.Authorization =
                                    `Bearer ${newAccessToken}`;
                            }
                        }

                        apiClient(
                            originalRequest,
                        )
                            .then(resolve)
                            .catch(reject);
                    },
                    (err) => {
                        reject(err);
                    },
                );
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const response =
                await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/refresh-token`,
                    {
                        refreshToken,
                    },
                );

            const {
                accessToken,
                refreshToken:
                newRefreshToken,
            } = response.data;

            if (
                !accessToken ||
                !newRefreshToken
            ) {
                throw new Error(
                    "Refresh response is incomplete.",
                );
            }

            authStorage.setTokens(
                accessToken,
                newRefreshToken,
            );

            notifyTokenRefreshed(
                accessToken,
            );

            if (originalRequest.headers) {
                if (typeof originalRequest.headers.set === "function") {
                    originalRequest.headers.set(
                        "Authorization",
                        `Bearer ${accessToken}`,
                    );
                } else {
                    originalRequest.headers.Authorization =
                        `Bearer ${accessToken}`;
                }
            }

            return await apiClient(
                originalRequest,
            );
        } catch (refreshError) {
            notifyTokenRefreshFailed(refreshError);
            forceLogout();

            return Promise.reject(
                refreshError,
            );
        } finally {
            isRefreshing = false;
        }
    },
);

export default apiClient;