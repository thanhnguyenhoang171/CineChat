import { LoginForm } from '~/features/auth/components/login-form';
import type { Route } from './+types/login';
import { Film } from 'lucide-react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Đăng nhập | CineChat Admin' },
    { name: 'description', content: 'Trang đăng nhập hệ thống quản trị' },
  ];
}

export default function LoginPage() {

  return (
    <div className='min-h-screen w-full lg:grid lg:grid-cols-2'>
      {/* Cột Trái: Chỉ hiện trên màn hình lớn (lg) */}
      <div className='hidden lg:flex flex-col bg-slate-900 text-white p-10 relative overflow-hidden'>
        {/* Lớp phủ Background (Có thể thay bằng ảnh thật) */}
        <div className='absolute inset-0 bg-linear-to-b from-slate-800 to-slate-950 opacity-50' />

        {/* Logo */}
        <div className='relative z-10 flex items-center gap-2 text-lg font-medium'>
          <Film className='h-6 w-6' />
          CineChat Admin
        </div>

        {/* Quote hoặc Giới thiệu */}
        <div className='relative z-10 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              "Quản lý kho phim và tương tác AI chưa bao giờ dễ dàng đến thế."
            </p>
            <footer className='text-sm text-slate-400'>
              Admin Console v1.0
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Cột Phải: Form Login */}
      <div className='flex items-center justify-center p-8 bg-slate-50'>
        <div className='mx-auto w-full max-w-[350px] flex flex-col justify-center space-y-6'>
          {/* Logo hiện trên mobile (khi cột trái ẩn đi) */}
          <div className='flex flex-col space-y-2 text-center lg:hidden'>
            <div className='flex justify-center'>
              <Film className='h-10 w-10' />
            </div>
            <h1 className='text-2xl font-semibold tracking-tight'>CineChat</h1>
          </div>

          {/* Render Form tại đây */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
