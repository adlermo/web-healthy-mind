import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { fetchRefreshToken, getRefreshToken, getToken, getUserEmail } from './Auth/service';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, no-param-reassign
    config.headers!.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const refresh_token = getRefreshToken();
    const user_email = getUserEmail();

    if (error.response.status === 401 && refresh_token && user_email) {
      const response = await fetchRefreshToken({
        email: JSON.parse(user_email),
        refreshToken: JSON.parse(refresh_token),
      });
      return response;
    }
    return Promise.reject(error);
  },
);

export default api;
