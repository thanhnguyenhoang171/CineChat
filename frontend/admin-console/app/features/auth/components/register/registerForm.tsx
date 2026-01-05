import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { type LoginFormValues } from '../login/schemas';
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
import { SeparatorWithText } from '~/components/ui/separatorWithText';
import AuthLogo from '../authLogo';
import { registerSchema, type RegisterFormValues } from './shemas';
import { motion } from 'framer-motion';
import { fadeVariant } from '~/components/animations/variants';
import { fadeMotionProps } from '~/components/animations/helpers';
import { useRegister } from '~/hooks/useRegister';
import { parseFullName } from '~/utils/common-utils';

export function RegisterForm() {
  const { mutate: registerAccount, isPending } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: RegisterFormValues) {
    const { fullName, confirmPassword, ...rest } = data;
    const { firstName, lastName } = parseFullName(fullName);
    const payload = {
      ...rest,
      firstName,
      lastName,
    };
    registerAccount(payload);
  }

  return (
    <motion.div
      variants={fadeVariant}
      {...fadeMotionProps}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='z-10 mx-auto w-full max-w-[600px] flex flex-col justify-center'>
      <Card className='relative  w-full max-w-md mx-auto shadow-lg'>
        <div className='absolute top-0 left-0 z-20'>
          <AuthLogo />
        </div>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center text-primary'>
            REGISTER
          </CardTitle>
          <CardDescription className='text-center'>
            Nhập thông tin để đăng ký tài khoản ngay!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* Input fullname */}
              <FormField
                control={form.control}
                name='fullName' // ensure it joint with schema
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Cinema AI'
                        {...field}
                        disabled={isPending} // Disable when calling API
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Input Username */}
              <FormField
                control={form.control}
                name='username' // ensure it joint with schema
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='newmember@cinechat.com'
                        {...field}
                        disabled={isPending} // Disable when calling API
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
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Input Confirm Password */}
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='••••••'
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <div className='flex justify-center'>
                <Button
                  type='submit'
                  className='w-[70%] rounded-[5px]'
                  disabled={isPending}>
                  {isPending && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  {isPending ? 'Đang đăng ký...' : 'Đăng ký'}
                </Button>
              </div>

              <SeparatorWithText text='OR' />

              {/* Have an account */}
              <div className='flex items-center justify-center gap-1'>
                <p>Bạn đã có tài khoản?</p>
                <a
                  href='/login'
                  className='text-primary font-medium hover:underline hover:text-muted-foreground transition-colors'>
                  Đăng ký
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
