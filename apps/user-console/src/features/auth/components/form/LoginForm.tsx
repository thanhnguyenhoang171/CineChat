'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { SeparatorWithText } from '@/components/shared/SeparatorWithText';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Card className='w-full max-w-md mx-auto shadow-none border-none bg-transparent'>
      <CardHeader className='space-y-1 text-center px-0'>
        <CardTitle className='text-3xl font-bold tracking-tight text-foreground'>
          Chào mừng trở lại
        </CardTitle>
        <CardDescription className='text-muted-foreground'>
          Đăng nhập để tiếp tục hành trình điện ảnh của bạn
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4 px-0'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='username'>Tên đăng nhập</Label>
            <div className='relative group'>
              <User className='absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
              <Input
                id='username'
                placeholder='Nhập tên đăng nhập của bạn'
                className='pl-10 bg-background/50 border-border focus-visible:ring-ring'
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <Label htmlFor='password'>Mật khẩu</Label>
              <Link
                href='/forgot-password'
                className='text-xs font-semibold text-primary hover:underline transition-all'>
                Quên mật khẩu?
              </Link>
            </div>

            <div className='relative group'>
              <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors' />
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='••••••••'
                className='pl-10 pr-10 bg-background/50 border-border focus-visible:ring-ring'
                required
                disabled={isLoading}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground transition-colors'>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button type='submit' className='w-full h-11 text-base font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-primary/10' disabled={isLoading}>
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </form>

        <SeparatorWithText text='Hoặc tiếp tục với' className='my-2' />

        <div className='grid grid-cols-1 gap-4'>
          <Button
            variant='outline'
            type='button'
            disabled={isLoading}
            className='w-full h-11 border-border bg-background/50 hover:bg-muted/50 transition-colors'>
            <svg
              className='mr-2 h-4 w-4'
              aria-hidden='true'
              focusable='false'
              data-prefix='fab'
              data-icon='google'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 488 512'>
              <path
                fill='currentColor'
                d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'></path>
            </svg>
            Google
          </Button>
        </div>
      </CardContent>
      <CardFooter className='flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground px-0 pb-0'>
        <span>Chưa có tài khoản?</span>
        <Link
          href='/register'
          className='font-semibold text-primary hover:underline transition-all underline-offset-4'>
          Đăng ký ngay
        </Link>
      </CardFooter>
    </Card>
  );
}
