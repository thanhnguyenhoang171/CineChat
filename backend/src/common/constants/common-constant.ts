export enum RoleLevel {
  ADMIN = 0,
  MANAGER = 1,
  USER = 2,
}

export enum ActiveStatus {
  ACTIVE = 1,
  INACTIVE = 0,
  PENDING = 2,
}

export enum LoginProvider {
  GOOGLE = 0,
  USERNAME = 1,
}

//File
export const MAX_FILE_SIZE = 500 * 1024 * 1024; // 5MB Global Limit
export const ALLOWED_MIME_TYPES = /^image\/(jpg|jpeg|png|gif|webp)$/;
