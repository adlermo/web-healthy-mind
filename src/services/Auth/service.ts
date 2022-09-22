// eslint-disable-next-line import/no-cycle
import { api } from '../api';
import { IAuthLoginParser, IRefreshTokenParser } from './dtos/IAuthParser';
import { IAuthLoginModel, IAuthRegisterModel, IRefreshTokenModel } from './dtos/IAuthModel';

export const TOKEN_KEY = '@menteSa-Token';
export const REFRESH_TOKEN = '@menteSa-RefreshTokem';
export const USER_EMAIL = '@menteSa-UserEmail';
export const USER_ROLE = '@menteSa-UserRole';
export const CURRENT_USER_ID = '@menteSa-CurrentUserId';
export const FIRST_LOGIN = '@menteSa-FirstLogin';
export const SWORDFISH = '@menteSa-Swordfish';
export const PATIENT_FIRST_PASSWORD = '@menteSa-PatientFirstPassword';

export async function fetchLoginUser(
  { email, password, userType }: IAuthLoginModel,
  remember = false,
): Promise<IAuthLoginParser> {
  const url = `/signin?type=${userType}`;
  const payload = { email, password };
  const { data, status } = await api.post(url, payload);

  if (status === 200) {
    localStorage.setItem(CURRENT_USER_ID, JSON.stringify(data.id));
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data.accessToken));
    if (data.roleId) {
      localStorage.setItem(USER_ROLE, JSON.stringify(data.roleId));
    } else {
      localStorage.setItem(USER_ROLE, JSON.stringify(2));
    }

    if (remember) {
      localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
    }
  }

  return data;
}

export const getUserRole = () => localStorage.getItem(USER_ROLE)?.replace(/[""]+/g, '');
export const getCurrentWorkerId = () => localStorage.getItem(CURRENT_USER_ID);
export const getCurrentSwordfish = () => localStorage.getItem(SWORDFISH);
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN);
export const getUserEmail = () => localStorage.getItem(USER_EMAIL)?.replace(/[""]+/g, '');

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN);
  localStorage.removeItem(CURRENT_USER_ID);
};

export async function fetchRefreshToken({
  refreshToken,
}: IRefreshTokenModel): Promise<IRefreshTokenParser> {
  const url = '/refresh-token';

  const { data, status } = await api.post(url, { refreshToken });

  if (status === 200) {
    localStorage.setItem(CURRENT_USER_ID, JSON.stringify(data.id));
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
    localStorage.setItem(CURRENT_USER_ID, JSON.stringify(data.id));
  }
  return data;
}
