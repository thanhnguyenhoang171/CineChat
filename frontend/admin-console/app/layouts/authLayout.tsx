import { Outlet } from 'react-router';
import type { Route } from './+types/authLayout';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Đăng nhập | CineChat Admin' },
    { name: 'description', content: 'Trang đăng nhập hệ thống quản trị' },
  ];
}

export default function AuthLayout() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-background'>
      <Outlet />
    </div>
  );
}
