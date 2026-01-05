import { RegisterCarousel } from '~/features/auth/components/register/registerCarousel';
import type { Route } from './+types/register';
import { RegisterForm } from '~/features/auth/components/register/registerForm';
import { useBreakpoint } from '~/hooks/useBreakpoint';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Đăng ký | CineChat Admin' },
    { name: 'description', content: 'Trang đăng ký hệ thống quản trị' },
  ];
}

export default function RegisterPage() {
  const { isMobile } = useBreakpoint();
  return (
    <div className='min-h-screen flex items-center justify-center w-full px-4 sm:px-6 md:px-8'>
      {!isMobile && <RegisterCarousel />}
      <RegisterForm />
    </div>
  );
}
