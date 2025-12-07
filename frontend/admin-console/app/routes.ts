import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  index('routes/_index.tsx'),

  layout('routes/guards/guest-guard.tsx', [
    layout('layouts/auth-layout.tsx', [
      route('login', 'routes/auth/login.tsx'),
      route('register', 'routes/auth/register.tsx'),
    ]),
  ]),

  layout('routes/guards/auth-guard.tsx', [
    route('dashboard', 'layouts/admin-layout.tsx', [
      index('routes/dashboard/overview.tsx'),
      route('users', 'routes/dashboard/users/user-list.tsx'),
      route('movies', 'routes/dashboard/movies/movie-list.tsx'),
    ]),
  ]),

  // Fallback 404
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
