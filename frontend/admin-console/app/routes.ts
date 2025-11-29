import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  // Public routes
  index('routes/home.tsx'),
  route('login', 'routes/login.tsx'),
  //   route('register', 'routes/register.tsx'),

  //   // Auth layout - requires authentication
  //   layout('routes/auth-layout.tsx', [
  //     route('dashboard', 'routes/dashboard.tsx', [
  //       index('routes/dashboard/overview.tsx'),
  //       route('analytics', 'routes/dashboard/analytics.tsx'),
  //       route('reports', 'routes/dashboard/reports.tsx'),
  //     ]),

  //     route('users', 'routes/users.tsx', [
  //       index('routes/users/list.tsx'),
  //       route(':id', 'routes/users/detail.tsx'),
  //       route('create', 'routes/users/create.tsx'),
  //     ]),

  //     route('products', 'routes/products.tsx', [
  //       index('routes/products/list.tsx'),
  //       route(':id', 'routes/products/detail.tsx'),
  //       route('create', 'routes/products/create.tsx'),
  //       route(':id/edit', 'routes/products/edit.tsx'),
  //     ]),
  //   ]),

  //   // Admin routes
  //   layout('routes/admin-layout.tsx', [
  //     route('admin', 'routes/admin/dashboard.tsx'),
  //     route('admin/users', 'routes/admin/users.tsx'),
  //     route('admin/settings', 'routes/admin/settings.tsx'),
  //   ]),

  // Error route
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
