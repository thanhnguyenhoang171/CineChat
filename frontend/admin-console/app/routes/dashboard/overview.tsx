import { LoginCarousel } from '~/features/auth/components/login-carousel';
import type { Route } from './+types/overview';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard quản trị viên' },
    { name: 'description', content: 'Welcome to Admin Dashboard!' },
  ];
}

export default function Overview() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100 p-4'>
      Dashboard Overview
      <LoginCarousel />
    </div>
  );
}
