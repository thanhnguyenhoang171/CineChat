import type { User, UserWithPagination, CreateUserDto, UploadAvatar, ApiResponse } from '~/types/module-types/user';

const MOCK_USERS: User[] = [
  { _id: 'u1', firstName: 'Nguyễn', lastName: 'An', email: 'an.nguyen@example.com', picture: { url: 'https://i.pravatar.cc/150?u=u1' }, isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), role: { _id: 'role_1', name: 'Super Admin', level: 1 } },
  { _id: 'u2', firstName: 'Trần', lastName: 'Bình', email: 'binh.tran@example.com', picture: { url: 'https://i.pravatar.cc/150?u=u2' }, isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), role: { _id: 'role_2', name: 'Content Creator', level: 2 } },
  { _id: 'u3', firstName: 'Lê', lastName: 'Chi', email: 'chi.le@example.com', picture: { url: 'https://i.pravatar.cc/150?u=u3' }, isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), role: { _id: 'role_3', name: 'Moderator', level: 3 } },
  { _id: 'u4', firstName: 'Phạm', lastName: 'Dũng', email: 'dung.pham@example.com', picture: { url: 'https://i.pravatar.cc/150?u=u4' }, isActive: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), role: { _id: 'role_4', name: 'Accountant', level: 4 } },
  { _id: 'u5', firstName: 'Hoàng', lastName: 'Yến', email: 'yen.hoang@example.com', picture: { url: 'https://i.pravatar.cc/150?u=u5' }, isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), role: { _id: 'role_2', name: 'Content Creator', level: 2 } },
  { _id: 'u6', firstName: 'Võ', lastName: 'Hùng', email: 'hung.vo@example.com', picture: { url: 'https://i.pravatar.cc/150?u=u6' }, isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), role: { _id: 'role_3', name: 'Moderator', level: 3 } },
];

export const userService = {
  getAllUsersWithPagination: async ({ page, limit, search, isActive, roleId }: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...MOCK_USERS];
    if (search) filtered = filtered.filter(u => `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()));
    if (isActive !== undefined && isActive !== 'all') filtered = filtered.filter(u => u.isActive === Number(isActive));
    if (roleId && roleId !== 'all') filtered = filtered.filter(u => u.role._id === roleId);

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
      }
    };
  },

  createUser: async (payload: CreateUserDto) => {
    console.log('Fake Create User:', payload);
    return { status: 201, message: 'Success', data: { ...payload, _id: Math.random().toString() } };
  },

  updateUser: async (id: string, payload: Partial<CreateUserDto>) => {
    console.log('Fake Update User:', id, payload);
    return { status: 200, message: 'Success', data: payload };
  },

  deleteUser: async (id: string) => {
    console.log('Fake Delete User:', id);
    return { status: 200, message: 'Success', data: null };
  },

  uploadAvatar: async (folder: string, imageBlob: Blob, originalFile: { name: string; type: string }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { status: 201, message: 'Success', data: { _id: 'new_img', picture: { url: 'https://i.pravatar.cc/150' } } };
  },

  updateFullName: async (firstName: string, lastName: string) => {
    return { status: 200, message: 'Success', data: { firstName, lastName } };
  },
};
