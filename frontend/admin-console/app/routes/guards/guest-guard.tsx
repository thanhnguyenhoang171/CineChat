import { Outlet, redirect } from 'react-router';
import type { Route } from './+types/guest-guard';
import { useBoundStore } from '~/store';

// 🚪 LOGIC KHÁCH: Nếu đã login thì đá về Dashboard
export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const { accessToken, isAuthenticated } = useBoundStore.getState();
  if (accessToken && isAuthenticated) {
    return redirect('/dashboard'); // Hoặc /admin/dashboard tùy route bạn
  }
  return null;
}

export default function GuestGuard() {
  return <Outlet />;
}
