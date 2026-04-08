import type { IUser } from './user.js';

export interface LoginRequest {
  username?: string;
  email?: string;
  password?: string;
}

export interface LoginResponse {
  access_token: string;
  level?: number;
  refreshToken?: string;
  user?: IUser;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email?: string;
  password?: string;
  username?: string;
  gender?: number;
  dateOfBirth?: Date | string;
  phoneNumber?: string;
}

export interface RegisterAccountResponse {
  user: IUser;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  loading: boolean;
}
