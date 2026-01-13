import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

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
import { useState } from 'react';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { SeparatorWithText } from '~/components/shared/text/separatorWithText';
import AuthLogo from '../authLogo';
import ForgetPasswordText from '../forgetPasswordText';
import GoogleLoginButton from '../googleLoginButton';
import { motion } from 'framer-motion';
import { fadeInLeft } from '~/components/animations/variants';
import { fadeMotionProps } from '~/components/animations/helpers';
import { loginSchema, type LoginFormValues } from './schemas';
import { useTranslation } from 'react-i18next';

export function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const { t } = useTranslation('login');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: LoginFormValues) {
    login(data);
  }

  return (
    <motion.div
      variants={fadeInLeft}
      {...fadeMotionProps}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='mx-auto w-full max-w-[600px] flex flex-col justify-center'>
      <Card className='relative w-full max-w-md mx-auto shadow-lg'>
        <div className='absolute top-0 left-0 z-20'>
          <AuthLogo />
        </div>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center text-primary'>
            {t('form.login')}
          </CardTitle>
          <CardDescription className='text-center'>
            {t('form.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {/* Input Username */}
              <FormField
                control={form.control}
                name='username' // ensure it joint with schema
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> {t('form.username')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='admin@cinechat.com'
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
                    <FormLabel> {t('form.password')}</FormLabel>
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
                  {isPending ? t('button.logging') : t('button.login')}
                </Button>
              </div>

              <SeparatorWithText text={t('text.or')} />

              <GoogleLoginButton/>

              <ForgetPasswordText />

              {/* Haven't account field */}
              <div className='flex items-center justify-center gap-1'>
                <p> {t('text.notAccount')}</p>
                <a
                  href='/register'
                  className='text-primary font-medium hover:underline hover:text-muted-foreground transition-colors'>
                  {t('text.register')}
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
