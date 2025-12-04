import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  // 1. Root Route ("/") -> Landing page hoặc redirect
  // Nếu bạn muốn vào "/" tự động nhảy vào dashboard nếu login rồi:
  index('routes/_index.tsx'),

  // ==========================================
  // 1. PUBLIC ROUTES (Login, Register...)
  // ==========================================
  layout('routes/guards/guest-guard.tsx', [
    // 🛡️ Layer 1: Check Guest (đã login chưa)
    layout('layouts/auth-layout.tsx', [
      // 🎨 Layer 2: UI Layout
      route('login', 'routes/auth/login.tsx'),
      route('register', 'routes/auth/register.tsx'),
    ]),
  ]),

  // ==========================================
  // 2. PROTECTED ROUTES (Admin)
  // ==========================================
  layout('routes/guards/auth-guard.tsx', [
    // 🛡️ Layer 1: Check Token

    // ✅ URL Prefix "dashboard" nằm ở đây -> Con bên trong không cần gõ lại
    route('dashboard', 'layouts/admin-layout.tsx', [
      // 🎨 Layer 2: UI Layout + Base Path

      // URL: /dashboard
      index('routes/dashboard/overview.tsx'),

      // URL: /dashboard/users
      route('users', 'routes/dashboard/users/user-list.tsx'),

      // URL: /dashboard/movies
      route('movies', 'routes/dashboard/movies/movie-list.tsx'),
    ]),
  ]),

  // 4. Fallback 404
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
