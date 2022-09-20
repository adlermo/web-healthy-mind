// eslint-disable-next-line import/no-cycle
import { api } from '../api';
import { IAuthLoginParser, IRefreshTokenParser } from './dtos/IAuthParser';
import { IAuthLoginModel, IAuthRegisterModel, IRefreshTokenModel } from './dtos/IAuthModel';

export const TOKEN_KEY = '@menteSa-Token';
export const REFRESH_TOKEN = '@menteSa-RefreshTokem';
export const USER_EMAIL = '@menteSa-UserEmail';
export const USER_ROLE = '@menteSa-UserRole';
export const CURRENT_WORKER_ID = '@menteSa-CurrentWorkerId';
export const SWORDFISH = '@menteSa-Swordfish';

export async function fetchLoginUser(
  { email, password }: IAuthLoginModel,
  remember = false,
): Promise<IAuthLoginParser> {
  const url = '/signin';
  const payload = { email, password };
  const { data, status } = await api.post(url, payload);

  if (status === 200) {
    localStorage.setItem(CURRENT_WORKER_ID, JSON.stringify(data.id));
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data.accessToken));
    localStorage.setItem(USER_ROLE, JSON.stringify('professional'));

    if (remember) {
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
    }
  }
  return data;
}

export const getUserRole = () => localStorage.getItem(USER_ROLE)?.replace(/[""]+/g, '');
export const getCurrentWorkerId = () => localStorage.getItem(CURRENT_WORKER_ID);
export const getCurrentSwordfish = () => localStorage.getItem(SWORDFISH);
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);
export const getUserEmail = () => localStorage.getItem(USER_EMAIL)?.replace(/[""]+/g, '');

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(CURRENT_WORKER_ID);
};

export async function fetchRefreshToken({
  refreshToken,
}: IRefreshTokenModel): Promise<IRefreshTokenParser> {
  const url = '/refresh-token';

  const { data, status } = await api.post(url, { refreshToken });

  if (status === 200) {
    localStorage.setItem(CURRENT_WORKER_ID, JSON.stringify(data.id));
  }
  return data;
}

export async function fetchRegisterUser({
  name,
  email,
  password,
  confirmPassword,
}: IAuthRegisterModel) {
  const url = '/signup';
  const payload = { name, email, password, confirmPassword };
  const { data, status } = await api.post(url, payload);

  if (status === 201) {
    localStorage.setItem(CURRENT_WORKER_ID, JSON.stringify(data.id));
  }
  return data;
}
