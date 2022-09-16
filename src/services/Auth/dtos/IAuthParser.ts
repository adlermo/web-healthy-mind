export interface IAuthLoginParser {
  token: IToken;
  user: IUser;
}

export interface IRefreshTokenParser {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface IToken {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface IUser {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}
