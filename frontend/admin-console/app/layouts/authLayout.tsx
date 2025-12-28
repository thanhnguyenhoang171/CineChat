// auth-layout.tsx
import { Outlet } from 'react-router';
import type { Route } from './+types/authLayout';
import { LoginCarousel } from '~/features/auth/components/loginCarousel';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Đăng nhập | CineChat Admin' },
    { name: 'description', content: 'Trang đăng nhập hệ thống quản trị' },
  ];
}

export default function AuthLayout() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-background'>
      <div className='min-h-screen w-full lg:grid lg:grid-cols-2 '>
        {/* --- COL LEFT --- */}
        <div className='hidden lg:flex flex-col bg-primary text-primary-foreground p-10 relative overflow-hidden h-full'>
          <LoginCarousel />
        </div>

        {/* --- COL RIGHT (Form) --- */}
        <div className='flex items-center justify-center p-8 bg-background relative z-30'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
