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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { useTranslation } from 'react-i18next';
import {
  Loader2,
  ShieldCheck,
  UserCog,
  User,
  Check,
  Globe,
} from 'lucide-react';
import { Badge } from '~/components/ui/badge';
import {
  createPermissionSchema,
  type CreatePermissionValues,
} from '../../schemas';
import { cn } from '~/lib/utils';
import { Switch } from '~/components/ui/switch';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { roleQueries } from '~/queries/role.queries';

interface PermissionFormProps {
  onSubmit: (values: CreatePermissionValues) => void;
  onCancel: () => void;
  isPending: boolean;
  initialValues?: CreatePermissionValues;
  submitLabel?: string;
}

const getRoleIcon = (roleName?: string) => {
  if (!roleName) return User;
  const name = roleName.toLowerCase();
  if (name.includes('super')) return ShieldCheck;
  if (name.includes('admin')) return UserCog;
  return User;
};

const getRoleColor = (roleName?: string) => {
  if (!roleName) return { color: 'text-green-500', bgColor: 'bg-green-500/10' };
  const name = roleName.toLowerCase();
  if (name.includes('super')) return { color: 'text-red-500', bgColor: 'bg-red-500/10' };
  if (name.includes('admin')) return { color: 'text-blue-500', bgColor: 'bg-blue-500/10' };
  return { color: 'text-green-500', bgColor: 'bg-green-500/10' };
};

export function PermissionForm({
  onSubmit,
  onCancel,
  isPending,
  initialValues,
  submitLabel,
}: PermissionFormProps) {
  const { t } = useTranslation(['permission', 'app']);

  // Fetch real roles
  const { data: rolesData, isLoading: isLoadingRoles } = useQuery(
    roleQueries.list(1, 100, 'name', 'asc', '', '', '1')
  );

  const roles = rolesData?.data || [];

  const form = useForm<CreatePermissionValues>({
    resolver: zodResolver(createPermissionSchema),
    defaultValues: initialValues || {
      name: '',
      apiPath: '',
      method: 'GET',
      module: '',
      isActive: 1,
      roleIds: [],
    },
  });

  // Reset form when initialValues change (useful for edit mode)
  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className='space-y-7'>
        {/* Row 1: Basic Info */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-bold uppercase text-muted-foreground mb-1'>
                  {t('permission:createDialog.name')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('permission:createDialog.namePlaceholder')}
                    className='h-10 border-muted-foreground/20 focus-visible:ring-primary/20 bg-background'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='module'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-bold uppercase text-muted-foreground mb-1'>
                  {t('permission:createDialog.module')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('permission:createDialog.modulePlaceholder')}
                    className='h-10 border-muted-foreground/20 focus-visible:ring-primary/20 bg-background'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 2: API Details Card */}
        <div className='bg-muted/30 border border-muted-foreground/10 rounded-xl p-5 shadow-sm'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='bg-primary/10 p-2 rounded-lg'>
              <Globe className='w-4 h-4 text-primary' />
            </div>
            <h3 className='text-[15px] font-bold text-foreground'>
              {t('permission:createDialog.apiConfig')}
            </h3>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start'>
            {/* Method Column */}
            <div className='md:col-span-2'>
              <FormField
                control={form.control}
                name='method'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[10px] font-bold text-muted-foreground uppercase mb-1'>
                      {t('permission:createDialog.method')}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className='h-10 border-muted-foreground/20 focus:ring-primary/20 bg-background'>
                          <SelectValue placeholder={t('app:select.placeholder', 'Select')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='[&_[data-slot=select-item-indicator]]:hidden'>
                        {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((m) => (
                          <SelectItem
                            key={m}
                            value={m}
                            className='justify-center px-2 focus:bg-primary/10'>
                            <Badge
                              variant={
                                m === 'GET'
                                  ? 'default'
                                  : m === 'POST'
                                    ? 'secondary'
                                    : m === 'DELETE'
                                      ? 'destructive'
                                      : 'outline'
                              }
                              className='w-16 justify-center text-[10px] h-5'>
                              {m}
                            </Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* API Path Column */}
            <div className='md:col-span-6'>
              <FormField
                control={form.control}
                name='apiPath'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[10px] font-bold text-muted-foreground uppercase mb-1'>
                      {t('permission:createDialog.apiPath')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='h-10 font-mono text-[12px] border-muted-foreground/20 focus-visible:ring-primary/20 bg-background'
                        placeholder='/api/v1/resource'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Active Switch Column */}
            <div className='md:col-span-4'>
              <FormField
                control={form.control}
                name='isActive'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-[10px] font-bold text-muted-foreground uppercase mb-1'>
                      {t('permission:createDialog.status', 'Status')}
                    </FormLabel>
                    <FormControl>
                      <div className='flex items-center justify-between rounded-lg border border-muted-foreground/20 bg-background h-10 px-3 shadow-sm'>
                        <span className='text-[11px] font-bold text-muted-foreground uppercase truncate mr-2'>
                          {field.value === 1 ? t('app:status.active') : t('app:status.inactive')}
                        </span>
                        <Switch
                          className='scale-75 origin-right shrink-0'
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

        {/* Section 3: Roles Assignment */}
        <div className='space-y-4'>
          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 p-2 rounded-lg'>
              <UserCog className='w-4 h-4 text-primary' />
            </div>
            <h3 className='text-[15px] font-bold text-foreground'>
              {t('permission:createDialog.assignRoles')}
            </h3>
          </div>

          <FormField
            control={form.control}
            name='roleIds'
            render={({ field }) => (
              <FormItem>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3.5'>
                  {isLoadingRoles ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className='h-32 rounded-xl bg-muted animate-pulse' />
                    ))
                  ) : roles.length > 0 ? (
                    roles.map((role) => {
                      const isChecked = field.value?.includes(role._id);
                      const RoleIcon = getRoleIcon(role.name);
                      const { color, bgColor } = getRoleColor(role.name);
                      return (
                        <button
                          key={role._id}
                          type='button'
                          onClick={() => {
                            const newValue = isChecked
                              ? field.value?.filter((id) => id !== role._id)
                              : [...(field.value || []), role._id];
                            field.onChange(newValue);
                          }}
                          className={cn(
                            'relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 group',
                            isChecked
                              ? 'border-primary bg-primary/[0.04] shadow-sm ring-1 ring-primary/5'
                              : 'border-muted-foreground/10 bg-background hover:border-primary/40',
                          )}>
                          {/* Role Media (Image or Icon) */}
                          <div
                            className={cn(
                              'w-12 h-12 rounded-xl mb-2.5 flex items-center justify-center overflow-hidden transition-all duration-300',
                              isChecked
                                ? 'bg-primary text-primary-foreground scale-105 shadow-lg shadow-primary/20'
                                : cn(
                                    'bg-muted group-hover:bg-primary/5',
                                    bgColor,
                                    color,
                                  ),
                            )}>
                            {/* @ts-ignore - support dynamic image fields if they exist in API */}
                            {role.image || role.picture?.url ? (
                              <img
                                /* @ts-ignore */
                                src={role.image || role.picture?.url}
                                alt={role.name}
                                className='w-full h-full object-cover'
                              />
                            ) : (
                              <RoleIcon className='h-6 w-6' />
                            )}
                          </div>

                          <span
                            className={cn(
                              'text-xs font-bold transition-colors text-center',
                              isChecked
                                ? 'text-primary'
                                : 'text-muted-foreground group-hover:text-primary',
                            )}>
                            {role.name}
                          </span>

                          {isChecked && (
                            <div className='absolute top-2.5 right-2.5'>
                              <div className='bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm animate-in zoom-in duration-300'>
                                <Check className='h-2.5 w-2.5 stroke-[4px]' />
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <div className='col-span-full py-8 text-center text-muted-foreground border-2 border-dashed rounded-xl'>
                      {t('permission:createDialog.noRolesFound', 'No roles found')}
                    </div>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Footer Actions */}
        <div className='flex justify-end gap-3 pt-5 border-t mt-4'>
          <Button
            type='button'
            variant='ghost'
            onClick={onCancel}
            className='h-10 px-6 text-sm font-bold text-muted-foreground hover:bg-muted'>
            {t('app:upload.cancelBtn', 'Cancel')}
          </Button>
          <Button
            type='submit'
            disabled={isPending}
            className='h-10 px-8 text-sm font-bold shadow-md shadow-primary/20 bg-primary hover:bg-primary/90'>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {submitLabel || t('permission:createDialog.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
