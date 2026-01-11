import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  index('routes/_index.tsx'),

  layout('routes/guards/guestGuard.tsx', [
    layout('layouts/authLayout.tsx', [
      route('login', 'routes/auth/login.tsx'),
      route('auth/google-success', 'routes/auth/googleCallback.tsx'),
      route('register', 'routes/auth/register.tsx'),
    ]),
  ]),

  layout('routes/guards/authGuard.tsx', [
    layout('layouts/adminLayout.tsx', [
      route('dashboard', 'routes/dashboard/overview.tsx'),
      route('users', 'routes/dashboard/users/userPage.tsx'),
      route('roles', 'routes/dashboard/roles/rolePage.tsx'),
      route('permissions', 'routes/dashboard/permissions/permissionPage.tsx'),
      route('movies', 'routes/dashboard/movies/movieList.tsx'),
    ]),
  ]),

  // Fallback 404
  route('*', 'routes/notFound.tsx'),
] satisfies RouteConfig;
