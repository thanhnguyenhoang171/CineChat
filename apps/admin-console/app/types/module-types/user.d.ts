export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// Interface chính trả về từ Backend
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  picture: {
    url: string;
  };
  username?: string;
  email?: string;
  provider?: number;
  emailVerified?: boolean;
  role: {
    _id: string;
    level: number;
    description?: string;
    name?: string;
  };
  permissions?: {
    _id: string;
    name: string;
    apiPath: string;
    module: string;
  }[];

  deletedAt?: string | null;
  isDeleted?: boolean;
  isActive: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserWithPagination {
  data: User[];
  meta: PaginationMeta;
}

// Interface cho việc tạo mới (DTO)
export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  roleId: string;
  isActive: number;
  pictureUrl?: string;
}

export interface UploadAvatar {
  _id: string;
  picture: {
    url: string;
  };
}

export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
  path?: string;
  timestamp?: string;
  errors?: any;
}
