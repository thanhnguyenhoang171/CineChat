// auth-layout.tsx
import { Outlet } from 'react-router';
import type { Route } from './+types/auth-layout';
import { Clapperboard } from 'lucide-react';
import { LoginCarousel } from '~/features/auth/components/login-carousel';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Đăng nhập | CineChat Admin' },
    { name: 'description', content: 'Trang đăng nhập hệ thống quản trị' },
  ];
}

export default function AuthLayout() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-background'>
      <div className='min-h-screen w-full lg:grid lg:grid-cols-2'>
        {/* --- COL LEFT --- */}
        <div className='hidden lg:flex flex-col bg-primary text-primary-foreground p-10 relative overflow-hidden h-full'>
          {/* 1. LAYER CAROUSEL (Nền nằm dưới cùng) */}
          <div className='absolute inset-0 w-full h-full z-0'>
            <LoginCarousel />
          </div>

          {/* 2. LAYER PHỦ MÀU (Overlay nằm trên Carousel) */}
          {/* bg-primary/80 sẽ đẹp hơn /90 giúp nhìn thấy ảnh rõ hơn chút */}
          <div className='absolute inset-0 bg-primary/80 mix-blend-multiply z-10' />

          {/* 3. NỘI DUNG (Logo & Text nằm trên cùng) */}
          <div className='relative z-20 flex items-center gap-2 text-lg font-medium'>
            <div className='flex h-8 w-8 items-center justify-center rounded bg-foreground text-background'>
              <Clapperboard className='h-5 w-5' />
            </div>
            CineChat Admin
          </div>

          <div className='relative z-20 mt-auto'>
            <blockquote className='space-y-2'>
              <p className='text-lg font-medium leading-relaxed'>
                &ldquo;Quản lý kho phim và tương tác AI chưa bao giờ dễ dàng đến
                thế.&rdquo;
              </p>
              <footer className='text-sm text-primary-foreground/80'>
                Admin Console v1.0
              </footer>
            </blockquote>
          </div>
        </div>

        {/* --- COL RIGHT (Form) --- */}
        <div className='flex items-center justify-center p-8 bg-background relative z-30'>
          {/* ... Giữ nguyên phần form của bạn ... */}
          <div className='mx-auto w-full max-w-[350px] flex flex-col justify-center space-y-6 animate-in fade-in slide-in-from-right-8 duration-500'>
            {/* Logo Mobile */}
            <div className='flex flex-col space-y-2 text-center lg:hidden'>
              <div className='flex justify-center text-primary'>
                <Clapperboard className='h-10 w-10' />
              </div>
              <h1 className='text-2xl font-semibold tracking-tight text-primary'>
                CineChat
              </h1>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
