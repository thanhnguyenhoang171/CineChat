export interface LoginRequest {
  username: string;
  password?: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
    username?: string;
    role: {
      _id: string;
      name: string;
    };
    permissions?: {
      _id: string;
      name: string;
      apiPath: string;
      module: string;
    };
  };
}

