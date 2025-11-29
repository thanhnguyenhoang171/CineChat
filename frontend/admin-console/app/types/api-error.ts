export interface ApiError {
  status: number;
  code: string;
  timestamp: string;
  path: string;
  errors: string | string[];
}
