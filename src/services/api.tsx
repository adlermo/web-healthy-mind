import axios from "axios";
import { fetchRefreshToken, getToken, getRefreshToken, getUserEmail } from "./Auth/service";

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers!.Authorization = `Bearer ${JSON.parse(token)}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const refresh_token = getRefreshToken();
    const user_email = getUserEmail()?.replace(/[""]+/g, '');

    if (error.response.status === 401 && refresh_token && user_email) {
      const response = await fetchRefreshToken({email: JSON.parse(user_email), refreshToken: JSON.parse(refresh_token)});
      return response;
    }
    return Promise.reject(error);
  }
);

export default api