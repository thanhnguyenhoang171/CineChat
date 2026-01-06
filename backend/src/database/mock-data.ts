import { ActiveStatus, LoginProvider, RoleLevel } from '@common/constants/common-constant';

export const PERMISSIONS_DATA = [
  // --- User Module ---
  { name: 'Tạo mới một người dùng', apiPath: '/api/users', method: 'POST', module: 'User Management' },
  { name: 'Lấy tất cả người dùng có phân trang', apiPath: '/api/users', method: 'GET', module: 'User Management' },
  { name: 'Cập nhật một người dùng bằng id', apiPath: '/api/users/:id', method: 'PATCH', module: 'User Management' },
  { name: 'Xóa một người dùng bằng id', apiPath: '/api/users/:id', method: 'DELETE', module: 'User Management' },

  // --- Role Module ---
  { name: 'Tạo mới một vai trò', apiPath: '/api/roles', method: 'POST', module: 'Role Management' },
  { name: 'Lấy tất cả vai trò có phân trang', apiPath: '/api/roles', method: 'GET', module: 'Role Management' },
  { name: 'Lấy một vai trò bằng id', apiPath: '/api/roles/:id', method: 'GET', module: 'Role Management' },
  { name: 'Cập nhật một vai trò bằng id', apiPath: '/api/roles', method: 'PATCH', module: 'Role Management' },
  { name: 'Xóa một vai trò bằng id', apiPath: '/api/roles/:id', method: 'DELETE', module: 'Role Management' },

  // --- Permission Module ---
  { name: 'Tạo mới một quyền hạn', apiPath: '/api/permissions', method: 'POST', module: 'Permission Management' },
  { name: 'Lấy tất cả quyền hạn có phân trang', apiPath: '/api/permissions', method: 'GET', module: 'Permission Management' },
  { name: 'Lấy một quyền hạn bằng id', apiPath: '/api/permissions/:id', method: 'GET', module: 'Permission Management' },
  { name: 'Cập nhật một quyền hạn bằng id', apiPath: '/api/permissions', method: 'PATCH', module: 'Permission Management' },
  { name: 'Xóa một quyền hạn bằng id', apiPath: '/api/permissions/:id', method: 'DELETE', module: 'Permission Management' },

];

export const ROLES_DATA = [
  {
    level: RoleLevel.ADMIN,
    description: 'Quản trị viên hệ thống, full quyền',
  },
  {
    level: RoleLevel.MANAGER,
    description: 'Quản lý hệ thống',
  },
  {
    level: RoleLevel.USER,
    description: 'Người dùng cơ bản',
  },
];

export const USERS_DATA = [
  {
    firstName: 'Admin',
    lastName: 'System',
    username: 'admincinechat',
    password: '@Thanh171', // Sẽ được hash trong script
    email: 'admin@cinechat.com',
    picture: '',
    provider: LoginProvider.USERNAME,
    // role sẽ được gán động trong script
  },
  {
    firstName: 'Thanh',
    lastName: 'Nguyen',
    username: 'thanh171',
    password: '@Thanh171',
    email: 'thanh171@gmail.com',
    picture: 'https://i.pravatar.cc/300',
    provider: LoginProvider.USERNAME,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    password: '@Thanh171',
    email: 'john@example.com',
    picture: 'https://i.pravatar.cc/300',
    provider: LoginProvider.USERNAME,
  },
  {
    firstName: 'Manager',
    lastName: 'System',
    username: 'managercinechat',
    password: '@Thanh171',
    picture: 'https://i.pravatar.cc/300',
    provider: LoginProvider.USERNAME,
  },
];