import type { User } from './user';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  level: number;
}

export interface RefreshTokenResponse {
  access_token: string;
}

export interface RegisterAccountResponse {
  _id: string;
  createdAt: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}
