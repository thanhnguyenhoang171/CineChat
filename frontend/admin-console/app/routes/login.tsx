import { LoginForm } from '~/features/auth/components/login-form';
import type { Route } from './+types/login';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Đăng nhập | CineChat Admin' },
    { name: 'description', content: 'Trang đăng nhập hệ thống quản trị' },
  ];
}

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100 p-4'>
      <LoginForm />
    </div>
  );
}
