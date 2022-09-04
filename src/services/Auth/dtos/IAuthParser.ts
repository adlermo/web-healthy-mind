export interface IAuthLoginParser {
  token: Token
  user: User
}

export interface IRefreshTokenParser {
  tokenType: string
  accessToken: string
  refreshToken: string
  expiresIn: string
}

export interface Token {
  tokenType: string
  accessToken: string
  refreshToken: string
  expiresIn: string
}

export interface User {
  id: string
  email: string
  role: string
  createdAt: string
}