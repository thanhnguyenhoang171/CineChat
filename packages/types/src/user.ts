export interface IPicture {
  url: string;
  publicId?: string;
  folder?: string;
}

export interface IRole {
  _id: string;
  level: number;
  description?: string;
  name?: string;
}

export interface IPermission {
  _id: string;
  name: string;
  apiPath: string;
  module: string;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  picture?: IPicture;
  username?: string;
  email?: string;
  password?: string;
  provider?: string | number;
  emailVerified?: boolean;
  isActive: number;
  tokenVersion?: number;
  role: IRole;
  permissions?: IPermission[];
  isDeleted?: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
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

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  roleId: string;
  isActive: number;
  pictureUrl?: string;
}
