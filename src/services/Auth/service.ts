import api from "../api";
import { IAuthLoginParser, IRefreshTokenParser } from "./dtos/IAuthParser"
import { IAuthLoginModel, IRefreshTokenModel } from "./dtos/IAuthModel";

export const TOKEN_KEY = "@menteSa-Token";
export const REFRESH_TOKEN = "@menteSa-RefreshTokem";
export const USER_EMAIL = "@menteSa-UserEmail";
export const CURRENT_WORKER_ID = "@menteSa-CurrentWorkerId";
export const SWORDFISH = "@menteSa-Swordfish";

export async function fetchLoginUser({ email, password }: IAuthLoginModel): Promise<IAuthLoginParser>{
    const url = 'v1/auth/login'
    const payload = { email, password }
    const { data, status } = await api.post(url, payload);

    if (status === 200) {
        localStorage.setItem(CURRENT_WORKER_ID, JSON.stringify(data.user.id))
        localStorage.setItem(SWORDFISH, JSON.stringify(password))
        localStorage.setItem(TOKEN_KEY, JSON.stringify(data.token.accessToken))
        localStorage.setItem(REFRESH_TOKEN, JSON.stringify(data.token.refreshToken))
        localStorage.setItem(USER_EMAIL, JSON.stringify(data.user.email))
    }
    return data
}

export const getCurrentWorkerId = () => localStorage.getItem(CURRENT_WORKER_ID);
export const getCurrentSwordfish = () => localStorage.getItem(SWORDFISH);
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);
export const getUserEmail = () => localStorage.getItem(USER_EMAIL);

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export async function fetchRefreshToken({ email, refreshToken }: IRefreshTokenModel): Promise<IRefreshTokenParser>{
    const url = 'v1/auth/refresh-token'

    const payload = { email, refreshToken }

    const { data, status } = await api.post(url, payload);

    if (status === 200) {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(data.accessToken))
        localStorage.setItem(REFRESH_TOKEN, JSON.stringify(data.refreshToken))
    }
    return data
}

export async function fetchRegisterUser({ email, password }: IAuthLoginModel) {
    const url = 'v1/auth/register'
    const payload = { email, password }
    const { data, status } = await api.post(url, payload);

    if (status === 201) {
        localStorage.setItem(CURRENT_WORKER_ID, JSON.stringify(data.user.id))
        localStorage.setItem(SWORDFISH, JSON.stringify(password))
        localStorage.setItem(TOKEN_KEY, JSON.stringify(data.token.accessToken))
        localStorage.setItem(REFRESH_TOKEN, JSON.stringify(data.token.refreshToken))
        localStorage.setItem(USER_EMAIL, JSON.stringify(data.user.email))
    }
    return data
}