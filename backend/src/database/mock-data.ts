
export const PERMISSIONS_DATA = [
  // --- User Module ---
  { name: 'Create User', apiPath: '/api/users', method: 'POST', module: 'User Management' },
  { name: 'Get All Users', apiPath: '/api/users', method: 'GET', module: 'User Management' },
  { name: 'Update User', apiPath: '/api/users/:id', method: 'PATCH', module: 'User Management' },
  { name: 'Delete User', apiPath: '/api/users/:id', method: 'DELETE', module: 'User Management' },

  // --- Role Module ---
  { name: 'Create Role', apiPath: '/api/roles', method: 'POST', module: 'Role Management' },
  { name: 'Get Roles', apiPath: '/api/roles', method: 'GET', module: 'Role Management' },

  // --- Auth Module ---
  { name: 'Login', apiPath: '/api/auth/login', method: 'POST', module: 'Auth' },
];

export const ROLES_DATA = [
  {
    name: 'ADMIN',
    description: 'Quản trị viên hệ thống, full quyền',
    isActive: true,
  },
  {
    name: 'USER',
    description: 'Người dùng cơ bản',
    isActive: true,
  }
];

export const USERS_DATA = [
  {
    firstName: 'Admin',
    lastName: 'System',
    username: 'admin',
    password: '123', // Sẽ được hash trong script
    email: 'admin@cinechat.com',
    picture: '',
    // role sẽ được gán động trong script
  },
  {
    firstName: 'Thanh',
    lastName: 'Nguyen',
    username: 'thanh171',
    password: '123',
    email: 'thanh171@gmail.com',
    picture: 'https://i.pravatar.cc/300',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    password: '123',
    email: 'john@example.com',
    picture: '',
  }
];