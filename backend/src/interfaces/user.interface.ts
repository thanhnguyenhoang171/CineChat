export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  username?: string;
  password?: string;
  provider?: string;
  email?: string;
  role: {
    _id: string;
    name: string;
  };
  permissions?: {
    _id: string;
    name: string;

    apiPath: string;
    module: string;
  }[];
}

export interface IGGUser {
  firstName?: string;
  lastName?: string;
  picture?: string;
  email: string;
  role: string;
  verified: boolean;
  provider?: string;
  googleId: string;
  emailVerified: boolean;
}
