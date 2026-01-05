import type { AxiosError } from 'axios';

export interface ApiError {
  status: number;
  code: string;
  timestamp: string;
  path: string;
  errors: string | string[];
}

declare module '@tanstack/react-query' {
  interface Register {
    // Mặc định error sẽ là AxiosError chứa cục data ApiError
    defaultError: AxiosError<ApiError>;
  }
}
