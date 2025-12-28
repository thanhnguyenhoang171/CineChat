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
      route('register', 'routes/auth/register.tsx'),
    ]),
  ]),

  layout('routes/guards/authGuard.tsx', [
    route('dashboard', 'layouts/adminLayout.tsx', [
      index('routes/dashboard/overview.tsx'),
      route('users', 'routes/dashboard/users/userList.tsx'),
      route('movies', 'routes/dashboard/movies/movieList.tsx'),
    ]),
  ]),

  // Fallback 404
  route('*', 'routes/notFound.tsx'),
] satisfies RouteConfig;
