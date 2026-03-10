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
  Check,
  Shield,
  FileText,
  Lock,
} from 'lucide-react';
import { createRoleSchema, type CreateRoleValues } from '../../schemas';
import { cn } from '~/lib/utils';
import { Switch } from '~/components/ui/switch';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { permissionQueries } from '~/queries/permisson.queries';

interface RoleFormProps {
  onSubmit: (values: CreateRoleValues) => void;
  onCancel: () => void;
  isPending: boolean;
  initialValues?: CreateRoleValues;
  submitLabel?: string;
}

export function RoleForm({
  onSubmit,
  onCancel,
  isPending,
  initialValues,
  submitLabel,
}: RoleFormProps) {
  const { t } = useTranslation(['role', 'app']);

  // Fetch all permissions for selection
  const { data: permissionsData, isLoading: isLoadingPermissions } = useQuery(
    permissionQueries.list(1, 1000, 'module', 'asc', '', '', '1')
  );

  const permissions = permissionsData?.data || [];

  // Group permissions by module
  const groupedPermissions = useMemo(() => {
    return permissions.reduce((acc, permission) => {
      const module = permission.module || 'OTHERS';
      if (!acc[module]) acc[module] = [];
      acc[module].push(permission);
      return acc;
    }, {} as Record<string, typeof permissions>);
  }, [permissions]);

  const form = useForm<CreateRoleValues>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: initialValues || {
      name: '',
      description: '',
      isActive: 1,
      permissionIds: [],
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
        className='space-y-7'>
        {/* Row 1: Basic Info */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-bold uppercase text-muted-foreground mb-1'>
                  {t('role:createDialog.name')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('role:createDialog.namePlaceholder')}
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
            name='isActive'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-bold uppercase text-muted-foreground mb-1'>
                  {t('role:createDialog.status')}
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

        {/* Description */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xs font-bold uppercase text-muted-foreground mb-1'>
                {t('role:createDialog.description')}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t('role:createDialog.descriptionPlaceholder')}
                  className='h-10 border-muted-foreground/20 focus-visible:ring-primary/20 bg-background'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Section: Permissions Assignment */}
        <div className='space-y-4'>
          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 p-2 rounded-lg'>
              <Lock className='w-4 h-4 text-primary' />
            </div>
            <h3 className='text-[15px] font-bold text-foreground'>
              {t('role:createDialog.assignPermissions')}
            </h3>
          </div>

          <FormField
            control={form.control}
            name='permissionIds'
            render={({ field }) => (
              <FormItem>
                <div className='space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar'>
                  {isLoadingPermissions ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className='space-y-2'>
                        <div className='h-4 w-24 bg-muted animate-pulse rounded' />
                        <div className='grid grid-cols-2 gap-2'>
                          <div className='h-10 bg-muted animate-pulse rounded' />
                          <div className='h-10 bg-muted animate-pulse rounded' />
                        </div>
                      </div>
                    ))
                  ) : Object.keys(groupedPermissions).length > 0 ? (
                    Object.entries(groupedPermissions).map(([module, perms]) => (
                      <div key={module} className='space-y-3'>
                        <h4 className='text-[11px] font-black text-primary/70 uppercase tracking-wider flex items-center gap-2'>
                          <Shield className='w-3 h-3' />
                          {module}
                        </h4>
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
                          {perms.map((permission) => {
                            const isChecked = field.value?.includes(permission._id);
                            return (
                              <button
                                key={permission._id}
                                type='button'
                                onClick={() => {
                                  const newValue = isChecked
                                    ? field.value?.filter((id) => id !== permission._id)
                                    : [...(field.value || []), permission._id];
                                  field.onChange(newValue);
                                }}
                                className={cn(
                                  'flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left group',
                                  isChecked
                                    ? 'border-primary bg-primary/[0.03] shadow-sm'
                                    : 'border-muted-foreground/10 bg-background hover:border-primary/30',
                                )}>
                                <div className={cn(
                                  'w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-colors',
                                  isChecked 
                                    ? 'bg-primary border-primary text-primary-foreground' 
                                    : 'border-muted-foreground/30 bg-muted/50 group-hover:border-primary/50'
                                )}>
                                  {isChecked && <Check className='w-3.5 h-3.5 stroke-[3px]' />}
                                </div>
                                <div className='flex flex-col min-w-0'>
                                  <span className={cn(
                                    'text-xs font-bold truncate transition-colors',
                                    isChecked ? 'text-primary' : 'text-foreground/70'
                                  )}>
                                    {permission.name}
                                  </span>
                                  <span className='text-[10px] text-muted-foreground truncate font-mono'>
                                    {permission.method} {permission.apiPath}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='py-8 text-center text-muted-foreground border-2 border-dashed rounded-xl italic text-sm'>
                      {t('role:createDialog.noPermissionsFound')}
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
            {t('app:upload.cancelBtn')}
          </Button>
          <Button
            type='submit'
            disabled={isPending}
            className='h-10 px-8 text-sm font-bold shadow-md shadow-primary/20 bg-primary hover:bg-primary/90'>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {submitLabel || t('role:createDialog.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
