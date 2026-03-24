import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Venus, VenusAndMars, Mars, Phone, CalendarIcon } from 'lucide-react';
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
import { SeparatorWithText } from '~/components/shared/text/separatorWithText';
import AuthLogo from '../authLogo';
import { registerSchema, type RegisterFormValues } from './shemas';
import { motion } from 'framer-motion';
import { fadeVariant } from '~/components/animations/variants';
import { fadeMotionProps } from '~/components/animations/helpers';
import { useRegister } from '~/hooks/auth/useRegister';
import { convertGenderToNumber, parseFullName } from '~/utils/common-utils';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import AppSubmitButton from '~/components/shared/button/AppSubmitButton';
import { PasswordInput } from '~/components/shared/input/PasswordInput';

export function RegisterForm() {
  const { t } = useTranslation('register');
  const { mutate: registerAccount, isPending } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      gender: undefined,
      phoneNumber: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: RegisterFormValues) {
    const { gender, confirmPassword, ...rest } = data;
    const payload = {
      ...rest,
      gender: convertGenderToNumber(gender),
    };
    registerAccount(payload);
  }

  return (
    <motion.div
      variants={fadeVariant}
      {...fadeMotionProps}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='z-10 mx-auto w-full max-w-2xl flex flex-col justify-center'>
      <Card className='relative w-full shadow-lg border'>
        <div className='absolute top-0 left-0 z-20'>
          <AuthLogo />
        </div>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold text-center text-primary'>
            {t('form.register')}
          </CardTitle>
          <CardDescription className='text-center'>
            {t('form.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (errors) =>
                console.log(errors),
              )}
              className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Input firstName */}
                <FormField
                  control={form.control}
                  name='firstName' // ensure it joint with schema
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.firstName')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Thanh'
                          {...field}
                          disabled={isPending} // Disable when calling API
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Input lastName */}
                <FormField
                  control={form.control}
                  name='lastName' // ensure it joint with schema
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.lastName')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Nguyễn Hoàng'
                          {...field}
                          disabled={isPending} // Disable when calling API
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Input gender */}
                <FormField
                  control={form.control}
                  name='gender'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.gender.title')}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}>
                        <FormControl>
                          <div className='relative'>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t('form.gender.placeholder')}
                              />
                            </SelectTrigger>
                          </div>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='male'>
                            <div className='flex items-center gap-2'>
                              <Mars className='h-4 w-4' />
                              <span>{t('form.gender.male')}</span>
                            </div>
                          </SelectItem>
                          <SelectItem value='female'>
                            <div className='flex items-center gap-2'>
                              <Venus className='h-4 w-4' />
                              <span>{t('form.gender.female')}</span>
                            </div>
                          </SelectItem>
                          <SelectItem value='other'>
                            <div className='flex items-center gap-2'>
                              <VenusAndMars className='h-4 w-4' />
                              <span>{t('form.gender.other')}</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Input Phone Number */}
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.phone_label')}</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Phone className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                          <Input
                            type='tel'
                            placeholder='0912345678'
                            className='pl-10'
                            disabled={isPending}
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              field.onChange(value);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Input Date of Birth */}
              <FormField
                control={form.control}
                name='dateOfBirth' // Đảm bảo khớp với key trong defaultValues và schema
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.birthday_label')}</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <CalendarIcon className='absolute left-3 top-2.5 h-4 w-4 text-muted-foreground' />
                        <Input
                          type='date' // Sử dụng bộ chọn ngày mặc định của trình duyệt
                          className='pl-10 block w-full appearance-none'
                          disabled={isPending}
                          {...field}
                          value={
                            field.value instanceof Date
                              ? field.value.toISOString().split('T')[0]
                              : field.value || ''
                          }
                          onChange={(e) => {
                            // Chuyển đổi chuỗi YYYY-MM-DD từ input thành đối tượng Date cho Zod
                            const dateValue = e.target.value;
                            field.onChange(
                              dateValue ? new Date(dateValue) : undefined,
                            );
                          }}
                        />
                      </div>
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
                    <FormLabel>{t('form.username')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='thanhnguyen@admin.com'
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
                    <FormLabel>{t('form.password')}</FormLabel>
                    <FormControl>
                      {/* Chỉ cần thay Input thành PasswordInput */}
                      <PasswordInput
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
                    <FormLabel>{t('form.confirmPassword')}</FormLabel>
                    <FormControl>
                      <PasswordInput
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

              <AppSubmitButton
                isPending={isPending}
                loadingText={t('button.registering')}
                type='submit'
                disabled={isPending}>
                {t('button.register')}
              </AppSubmitButton>

              <SeparatorWithText text={t('text.or')} />

              {/* Have an account */}
              <div className='flex items-center justify-center gap-1'>
                <p>{t('text.haveAccount')}</p>
                <a
                  href='/login'
                  className='text-primary font-medium hover:underline hover:text-muted-foreground transition-colors'>
                  {t('text.login')}
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
