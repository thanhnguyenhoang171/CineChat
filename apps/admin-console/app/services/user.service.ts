import { axiosClient } from '~/lib/axios-client';
import type {
  User,
  CreateUserDto,
  ApiResponse,
} from '@cinechat/types';
import type { Role } from '@cinechat/types';

const now = new Date().toISOString();

const MOCK_ROLES: (Role & { level: number })[] = [
  {
    _id: 'role_1',
    name: 'Super Admin',
    description: 'Toàn quyền quản trị hệ thống',
    isActive: 1,
    level: 0,
    createdAt: now,
    updatedAt: now,
    permissionIds: ['1', '2', '3', '4', '5', '6', '7', '8'],
  },
  {
    _id: 'role_2',
    name: 'Content Creator',
    description: 'Quản lý nội dung phim và lịch chiếu',
    isActive: 1,
    level: 1,
    createdAt: now,
    updatedAt: now,
    permissionIds: ['5', '6', '7'],
  },
  {
    _id: 'role_3',
    name: 'Moderator',
    description: 'Kiểm duyệt người dùng và bình luận',
    isActive: 1,
    level: 2,
    createdAt: now,
    updatedAt: now,
    permissionIds: ['2', '3'],
  },
  {
    _id: 'role_4',
    name: 'Accountant',
    description: 'Xem báo cáo và thống kê tài chính',
    isActive: 1,
    level: 3,
    createdAt: now,
    updatedAt: now,
    permissionIds: ['1', '8'],
  },
  {
    _id: 'role_5',
    name: 'Guest',
    description: 'Người dùng vãng lai, chỉ xem',
    isActive: 0,
    level: 4,
    createdAt: now,
    updatedAt: now,
    permissionIds: ['6'],
  },
];

// Giả lập dữ liệu người dùng
const MOCK_USERS: User[] = [
  {
    _id: 'user_1',
    firstName: 'Chánh',
    lastName: 'Trần',
    email: 'superadmin@cinechat.dev',
    isActive: 1,
    role: MOCK_ROLES[0],
    createdAt: now,
    updatedAt: now,
    picture: { url: 'https://i.pravatar.cc/150?u=superadmin@cinechat.dev' },
  },
  {
    _id: 'user_2',
    firstName: 'An',
    lastName: 'Nguyễn',
    email: 'an.nguyen@example.com',
    isActive: 1,
    role: MOCK_ROLES[1],
    createdAt: now,
    updatedAt: now,
    picture: { url: 'https://i.pravatar.cc/150?u=an.nguyen@example.com' },
  },
  {
    _id: 'user_3',
    firstName: 'Bình',
    lastName: 'Trần',
    email: 'binh.tran@example.com',
    isActive: 1,
    role: MOCK_ROLES[2],
    createdAt: now,
    updatedAt: now,
    picture: { url: 'https://i.pravatar.cc/150?u=binh.tran@example.com' },
  },
  {
    _id: 'user_4',
    firstName: 'Chi',
    lastName: 'Lê',
    email: 'chi.le@example.com',
    isActive: 0,
    role: MOCK_ROLES[3],
    createdAt: now,
    updatedAt: now,
    picture: { url: 'https://i.pravatar.cc/150?u=chi.le@example.com' },
  },
  {
    _id: 'user_5',
    firstName: 'Dũng',
    lastName: 'Phạm',
    email: 'dung.pham@example.com',
    isActive: 1,
    role: MOCK_ROLES[4],
    createdAt: now,
    updatedAt: now,
    picture: { url: 'https://i.pravatar.cc/150?u=dung.pham@example.com' },
  },
  {
    _id: 'user_6',
    firstName: 'Elon',
    lastName: 'Musk',
    email: 'elon.musk@x.com',
    isActive: 1,
    role: MOCK_ROLES[0],
    createdAt: now,
    updatedAt: now,
    picture: { url: 'https://i.pravatar.cc/150?u=elon.musk@x.com' },
  },
  {
    _id: 'user_7',
    firstName: 'Jeff',
    lastName: 'Bezos',
    email: 'jeff.bezos@amazon.com',
    isActive: 1,
    role: MOCK_ROLES[0],
    createdAt: now,
    updatedAt: now,
    picture: { url: 'https://i.pravatar.cc/150?u=jeff.bezos@amazon.com' },
  },
];
interface GetUsersParams {
  page: number;
  limit: number;
  search?: string;
  isActive?: string;
  roleId?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  projections?: string;
}

export const userService = {
  getAllUsersWithPagination: async ({
    page,
    limit,
    search,
    isActive,
    roleId,
    sortBy,
    sortDir,
  }: GetUsersParams) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Giả lập độ trễ mạng

    let filtered = [...MOCK_USERS];

    // Lọc dữ liệu
    if (search) {
      const lowercasedSearch = search.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.firstName?.toLowerCase().includes(lowercasedSearch) ||
          user.lastName?.toLowerCase().includes(lowercasedSearch) ||
          (user.email && user.email.toLowerCase().includes(lowercasedSearch)),
      );
    }
    if (isActive !== undefined && isActive !== 'all') {
      filtered = filtered.filter((user) => user.isActive === Number(isActive));
    }
    if (roleId && roleId !== 'all') {
      filtered = filtered.filter((user) => user.role._id === roleId);
    }

    // Sắp xếp
    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy as keyof User] as any;
        const bValue = b[sortBy as keyof User] as any;
        if (aValue < bValue) return sortDir === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Phân trang
    const total = filtered.length;
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  createUser: async (payload: CreateUserDto) => {
    console.log('Fake Create User:', payload);
    const now = new Date().toISOString();
    const role = MOCK_ROLES.find((r) => r._id === payload.roleId);
    const { password, ...restOfPayload } = payload; // Không lưu mật khẩu
    const newUser: any = {
      ...restOfPayload,
      _id: `user_${Date.now()}`,
      role: role || { _id: payload.roleId, name: 'Unknown', level: 99 },
      createdAt: now,
      updatedAt: now,
      picture: { url: `https://i.pravatar.cc/150?u=${payload.email}` },
    };
    MOCK_USERS.unshift(newUser);
    return { status: 201, message: 'Success', data: newUser };
  },

  updateUser: async (id: string, payload: Partial<CreateUserDto>) => {
    console.log('Fake Update User:', id, payload);
    const index = MOCK_USERS.findIndex((u) => u._id === id);
    if (index > -1) {
      const userToUpdate = { ...MOCK_USERS[index] };
      const { roleId, ...restOfPayload } = payload;

      if (payload.roleId) {
        const role = MOCK_ROLES.find((r) => r._id === payload.roleId);
        if (role) {
          userToUpdate.role = role;
        }
      }
      MOCK_USERS[index] = {
        ...userToUpdate,
        ...restOfPayload,
        updatedAt: new Date().toISOString(),
      };
      return { status: 200, message: 'Success', data: MOCK_USERS[index] };
    }
    return { status: 404, message: 'User not found', data: null };
  },

  deleteUser: async (id: string) => {
    console.log('Fake Delete User:', id);
    const index = MOCK_USERS.findIndex((u) => u._id === id);
    if (index > -1) {
      MOCK_USERS.splice(index, 1);
      return { status: 200, message: 'Success', data: null };
    }
    return { status: 404, message: 'User not found', data: null };
  },

  uploadAvatar: async (
    folder: string,
    imageBlob: Blob,
    originalFile: { name: string; type: string },
  ) => {
    const formData = new FormData();
    // Chuyển Blob thành File để Cloudinary nhận diện đúng định dạng
    const file = new File([imageBlob], originalFile.name, {
      type: originalFile.type,
    });
    formData.append('file', file);

    const response = await axiosClient.post(`/users/upload-avatar`, formData, {
      params: { folder },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      status: response.status,
      message: response.data?.message || 'Upload Success',
      data: response.data?.data, // Chứa { _id, picture: { url } }
    };
  },

  updateFullName: async (firstName: string, lastName: string) => {
    const response = await axiosClient.patch('/users/update-full-name', {
      firstName,
      lastName,
    });
    return {
      status: response.status,
      message: response.data?.message || 'Success',
      data: response.data?.data,
    };
  },

  // API lấy danh sách user để gán quyền (đã có trong Backend)
  fetchUserListToSignRole: async (params: any) => {
    const response = await axiosClient.get('/users/list-to-sign-role', {
      params,
    });
    return response.data;
  },

  signRoleToUser: async (roleId: string, userIds: string[]) => {
    const response = await axiosClient.patch(
      `/users/sign-role-to-users/${roleId}`,
      {
        userIds,
      },
    );
    return response.data;
  },
};

