import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  // 1. Root Route ("/")
  // Thường dùng để check login: chưa login -> đẩy sang /login, rồi -> đẩy sang /dashboard
  index('routes/_index.tsx'),

  // 2. Auth Routes (Bọc bởi AuthLayout)
  layout('layouts/auth-layout.tsx', [
    route('login', 'routes/auth/login.tsx'),
    route('register', 'routes/auth/register.tsx'),
  ]),

  // 3. Admin Routes (Bọc bởi AdminLayout - Có Sidebar)
  layout('layouts/admin-layout.tsx', [
    // URL: /dashboard
    route('dashboard', 'routes/dashboard/overview.tsx'),

    // Module Users
    // URL: /users (List), /users/create, /users/:id
    route('dashboard/users', 'routes/dashboard/users/user-list.tsx'),
    // route('users/create', 'routes/dashboard/users/create.tsx'),
    // route('users/:id', 'routes/dashboard/users/detail.tsx'),

    // Module Movies
    route('dashboard/movies', 'routes/dashboard/movies/movie-list.tsx'),
    // ... thêm các route con của product tại đây

    // // Module Settings
    // route('settings', 'routes/dashboard/settings/profile.tsx'),
  ]),

  // 4. Error Route (Splats)
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
