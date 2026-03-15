import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useTranslation } from 'react-i18next';
import {
  Loader2,
  Mail,
  User as UserIcon,
  Shield,
  Key,
} from 'lucide-react';
import { createUserSchema, type CreateUserValues } from '../../schemas';
import { cn } from '~/lib/utils';
import { Switch } from '~/components/ui/switch';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { roleQueries } from '~/queries/role.queries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { ImageUploader } from '~/components/shared/image/imageUploader';

interface UserFormProps {
  onSubmit: (values: CreateUserValues) => void;
  onCancel: () => void;
  isPending: boolean;
  initialValues?: CreateUserValues;
  submitLabel?: string;
}

export function UserForm({
  onSubmit,
  onCancel,
  isPending,
  initialValues,
  submitLabel,
}: UserFormProps) {
  const { t } = useTranslation(['user', 'app']);

  // Fetch roles for selection
  const { data: rolesData, isLoading: isLoadingRoles } = useQuery(
    roleQueries.list(1, 100, 'name', 'asc', '', '', '1')
  );

  const roles = rolesData?.data || [];

  const form = useForm<CreateUserValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: initialValues || {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleId: '',
      isActive: 1,
      pictureUrl: '',
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className='space-y-6'>
        
        <div className='flex flex-col md:flex-row gap-8 items-start'>
          {/* Avatar Upload Section */}
          <div className='flex flex-col items-center gap-4 w-full md:w-1/3'>
            <FormLabel className='text-xs font-bold uppercase text-muted-foreground self-start'>
              {t('user:createDialog.avatar')}
            </FormLabel>
            <FormField
              control={form.control}
              name='pictureUrl'
              render={({ field }) => (
                <FormItem className='w-full flex justify-center'>
                  <ImageUploader
                    initialImage={field.value}
                    onImageUpload={(url: string) => field.onChange(url)}
                    className='w-40 h-40 rounded-full border-4 border-muted'
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* User Details Section */}
          <div className='flex-1 w-full space-y-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                      {t('user:createDialog.firstName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('user:createDialog.firstNamePlaceholder')}
                        className='h-10'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                      {t('user:createDialog.lastName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('user:createDialog.lastNamePlaceholder')}
                        className='h-10'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                    {t('user:createDialog.email')}
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        placeholder={t('user:createDialog.emailPlaceholder')}
                        className='h-10 pl-10'
                        disabled={!!initialValues}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!initialValues && (
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                      {t('user:createDialog.password')}
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Key className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                        <Input
                          type='password'
                          placeholder={t('user:createDialog.passwordPlaceholder')}
                          className='h-10 pl-10'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='roleId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                      {t('user:createDialog.role')}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className='h-10'>
                          <SelectValue placeholder={t('app:select.placeholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role._id} value={role._id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='isActive'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                      {t('user:createDialog.status')}
                    </FormLabel>
                    <FormControl>
                      <div className='flex items-center justify-between rounded-lg border bg-background h-10 px-3 shadow-sm'>
                        <span className='text-[11px] font-bold text-muted-foreground uppercase'>
                          {field.value === 1 ? t('app:status.active') : t('app:status.inactive')}
                        </span>
                        <Switch
                          className='scale-75 origin-right'
                          checked={field.value === 1}
                          onCheckedChange={(checked) =>
                            field.onChange(checked ? 1 : 0)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className='flex justify-end gap-3 pt-5 border-t mt-4'>
          <Button
            type='button'
            variant='ghost'
            onClick={onCancel}
            className='h-10 px-6 text-sm font-bold text-muted-foreground hover:bg-muted'>
            {t('app:upload.cancelBtn')}
          </Button>
          <Button
            type='submit'
            disabled={isPending}
            className='h-10 px-8 text-sm font-bold shadow-md shadow-primary/20 bg-primary hover:bg-primary/90'>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {submitLabel || t('user:createDialog.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
