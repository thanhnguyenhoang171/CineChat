
import { useBreakpoint } from '~/hooks/useBreakpoint';
import type { Route } from './+types/login';
import { LoginCarousel } from '~/features/auth/components/login/loginCarousel';
import { LoginForm } from '~/features/auth/components/login/loginForm';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Đăng ký | CineChat Admin' }];
}

export default function LoginPage() {
  const { isMobile } = useBreakpoint();

  if (!isMobile) {
    return (
      <div className='min-h-screen w-full grid grid-cols-2 '>
        {/* --- COL LEFT --- */}
        <div className='z-10 flex flex-col bg-primary text-primary-foreground p-10 relative overflow-hidden h-full'>
          <LoginCarousel />
        </div>

        {/* --- COL RIGHT (Form) --- */}
        <div className='z-0 flex items-center justify-center bg-background relative'>
          <LoginForm />
        </div>
      </div>
    );
  }
  return (
    <div className='w-full flex justify-center px-4 sm:px-6 md:px-8'>
      <div className='w-full max-w-md'>
        <LoginForm />
      </div>
    </div>
  );
}
