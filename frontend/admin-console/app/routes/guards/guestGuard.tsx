import { Outlet, redirect } from 'react-router';
import type { Route } from './+types/guestGuard';
import { useBoundStore } from '~/store';

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const { accessToken, isAuthenticated } = useBoundStore.getState();
  if (accessToken && isAuthenticated) {
    return redirect('/dashboard');
  }
  return null;
}

export default function GuestGuard() {
  return <Outlet />;
}
