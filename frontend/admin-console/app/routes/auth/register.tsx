import { LoginForm } from '~/features/auth/components/login-form';
import type { Route } from './+types/register';


export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Đăng ký | CineChat Admin' },
    { name: 'description', content: 'Trang đăng ký hệ thống quản trị' },
  ];
}

export default function LoginPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-slate-100 p-4'>
      Trang đăng ký
    </div>
  );
}
