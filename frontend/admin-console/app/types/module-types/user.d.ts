export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// Interface chính trả về từ Backend
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  picture: string;
  username?: string;
  //   password: string;  // Thông tin nhạy cảm, thường không trả về từ API
  email?: string;
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

  deletedAt?: Date | null;

  isDeleted?: boolean;

  isActive: number;

  createdAt?: Date;
  updatedAt?: Date;
}

// Interface cho việc tạo mới (DTO) - Chuẩn bị sẵn cho tương lai
export interface CreateUserDto {
  email: string;
  fullName: string;
  password?: string;
  role?: UserRole;
}

export interface ApiResponse<T> {
  status: number;
  code: string;
  message: string;
  data: T;
}
