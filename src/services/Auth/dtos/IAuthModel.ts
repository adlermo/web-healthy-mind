export interface IAuthLoginModel {
  email: string;
  password: string;
  userType: string;
}

export interface IAuthRegisterModel {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IRefreshTokenModel {
  refreshToken: string;
}
