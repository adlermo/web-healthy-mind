import axios, { AxiosError } from "axios";
import {
  fetchRefreshToken,
  getToken,
  getRefreshToken,
  logout,
  TOKEN_KEY,
} from "./Auth/service";

let isRefreshing = false;
let failedRequestsQueue: any[] = [];

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers!.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    const refreshToken = getRefreshToken() as string;

    if (error.response?.status === 401) {
      const originalConfig = error.config;

      if (!refreshToken) {
        console.log("foo");
        logout();
        return Promise.reject(error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        fetchRefreshToken({ refreshToken })
          .then((res) => {
            localStorage.setItem(TOKEN_KEY, res.accessToken);
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.accessToken}`;

            console.log("refreshed token");

            failedRequestsQueue.forEach((request) => {
              request.onSuccess(res.accessToken);
              failedRequestsQueue = [];
            });
          })
          .catch((err) => {
            failedRequestsQueue.forEach((request) => {
              request.onFailure(err);
              failedRequestsQueue = [];
            });
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            originalConfig.headers!["Authorization"] = `Bearer ${token}`;
            resolve(api(originalConfig));
          },
          onFailure: reject,
        });
      });
    } else {
      logout();
    }
    return Promise.reject(error);
  }
);

export default api;
