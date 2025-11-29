'use client'; // ← THÊM DÒNG NÀY ĐỂ FIX SSR ISSUE

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router'; // Chỉ import useNavigate từ RR7
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { loginSchema, type LoginFormValues } from '../schemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

export function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // 1. Setup Form với Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Xử lý Submit
  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    try {
      console.log('Login Data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Giả lập login thành công
      localStorage.setItem('accessToken', 'fake-token-123');
      toast.success('Đăng nhập thành công!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className='w-full max-w-md mx-auto shadow-lg'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold text-center text-primary'>
          CineChat Admin
        </CardTitle>
        <CardDescription className='text-center'>
          Nhập email và mật khẩu để truy cập
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* SỬA: Form từ shadcn/ui, không phải từ react-router */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* Email Field */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='admin@cinechat.com'
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='••••••'
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
