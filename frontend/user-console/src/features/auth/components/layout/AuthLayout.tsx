'use client';

import { cn } from '@/lib/utils';
import { AuthBanner } from '../card/AuthBanner';

interface AuthLayoutProps {
  children: React.ReactNode;
  variant?: 'split' | 'centered';
}

export function AuthLayout({ children, variant = 'split' }: AuthLayoutProps) {
  if (variant === 'centered') {
    return (
      <div className='relative flex w-full max-w-[500px] flex-col items-center justify-center rounded-[2rem] border border-border/40 bg-card/70 p-8 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.15)] backdrop-blur-xl md:p-10'>
         {/* Decorative elements for centered variant */}
         <div className='absolute -top-12 -z-10 h-24 w-24 rounded-full bg-primary/20 blur-2xl animate-pulse'></div>
         <div className='w-full relative z-10'>
            {children}
         </div>
      </div>
    );
  }

  return (
    <div className='flex h-full max-h-[750px] w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-border/50 bg-card shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] md:flex-row flex-col transition-all duration-500'>
      {/* PHẦN BÊN TRÁI: Cinematic Banner */}
      <AuthBanner />
      
      {/* PHẦN BÊN PHẢI: Form */}
      <div className='flex w-full items-center justify-center p-6 md:w-1/2 bg-card relative overflow-hidden shrink-0'>
        <div className='absolute top-0 right-0 -mr-16 -mt-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl'></div>
        <div className='w-full max-w-[340px] relative z-10'>
          {children}
        </div>
      </div>
    </div>
  );
}
