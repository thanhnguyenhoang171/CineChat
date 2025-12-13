export interface IUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  username?: string;
  password?: string;
  email?: string;
  role: {
    _id: string;
    name: string;
  }
  permissions?: {
    _id: string;
    name: string;

    apiPath: string;
    module: string;
  }[]
}
