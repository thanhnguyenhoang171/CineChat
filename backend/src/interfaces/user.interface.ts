export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  picture: string;
  username?: string;
  password: string;
  email?: string;
  role?: string;
  // Permission
}
