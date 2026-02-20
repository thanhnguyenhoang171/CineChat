export interface IPicture {
  url?: string;
  public_id?: string;
  folder?: string;
}

export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  picture?: IPicture;
  username?: string;
  password?: string;
  provider?: string;
  email?: string;
  isDeleted?: boolean;
  isActive?: number;
  tokenVersion?: number;
  role: {
    _id: string;
    level: number;
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
