import type { Role, RoleWithPagination } from '@cinechat/types';

const MOCK_ROLES: Role[] = [
  { _id: 'role_1', name: 'Super Admin', description: 'Toàn quyền quản trị hệ thống', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), permissionIds: ['1', '2', '3', '4', '5', '6', '7', '8'] },
  { _id: 'role_2', name: 'Content Creator', description: 'Quản lý nội dung phim và lịch chiếu', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), permissionIds: ['5', '6', '7'] },
  { _id: 'role_3', name: 'Moderator', description: 'Kiểm duyệt người dùng và bình luận', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), permissionIds: ['2', '3'] },
  { _id: 'role_4', name: 'Accountant', description: 'Xem báo cáo và thống kê tài chính', isActive: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), permissionIds: ['1', '8'] },
  { _id: 'role_5', name: 'Guest', description: 'Người dùng vãng lai, chỉ xem', isActive: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), permissionIds: ['6'] },
];

export interface CreateRoleDto {
  name: string;
  description: string;
  isActive: number;
  permissionIds?: string[];
}

export const roleService = {
  getAllRolesWithPagination: async ({ page, limit, search, isActive }: any) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...MOCK_ROLES];
    if (search) filtered = filtered.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
    if (isActive !== undefined && isActive !== 'all') filtered = filtered.filter(r => r.isActive === Number(isActive));

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

  createRole: async (payload: CreateRoleDto) => {
    console.log('Fake Create Role:', payload);
    return { status: 201, message: 'Success', data: { ...payload, _id: Math.random().toString() } };
  },

  updateRole: async (id: string, payload: Partial<CreateRoleDto>) => {
    console.log('Fake Update Role:', id, payload);
    return { status: 200, message: 'Success', data: payload };
  },

  deleteRole: async (id: string) => {
    console.log('Fake Delete Role:', id);
    return { status: 200, message: 'Success', data: null };
  },
};

