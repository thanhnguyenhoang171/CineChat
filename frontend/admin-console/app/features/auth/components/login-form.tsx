'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

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
import { useLogin } from '~/hooks/useLogin';

export function LoginForm() {
  // 1. Gọi Hook: Lấy hàm login và trạng thái loading từ TanStack Query
  const { mutate: login, isPending } = useLogin();

  // 2. Setup Form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '', // Lưu ý: Backend thường dùng 'email' hoặc 'username', hãy check lại service
      password: '',
    },
  });

  // 3. Xử lý Submit (Cực gọn)
  function onSubmit(data: LoginFormValues) {
    // Gọi mutation. Hook sẽ lo việc: Gọi API -> Lưu Token -> Toast -> Redirect
    login(data);
  }

  return (
    <Card className='w-full max-w-md mx-auto shadow-lg'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold text-center text-primary'>
          CineChat Admin
        </CardTitle>
        <CardDescription className='text-center'>
          Nhập thông tin để truy cập hệ thống
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {/* Input Email/Username */}
            <FormField
              control={form.control}
              name='username' // Đảm bảo name khớp với schema và API
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email / Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='admin@cinechat.com'
                      {...field}
                      disabled={isPending} // Disable khi đang call API
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input Password */}
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
                      disabled={isPending} // Disable khi đang call API
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
