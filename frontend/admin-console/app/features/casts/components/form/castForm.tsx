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
  User as UserIcon,
  Calendar,
  MapPin,
  Text,
} from 'lucide-react';
import { createCastSchema, type CreateCastValues } from '../../schemas';
import { cn } from '~/lib/utils';
import { Switch } from '~/components/ui/switch';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { ImageUploader } from '~/components/shared/image/imageUploader';
import { Textarea } from '~/components/ui/textarea';

interface CastFormProps {
  onSubmit: (values: CreateCastValues) => void;
  onCancel: () => void;
  isPending: boolean;
  initialValues?: CreateCastValues;
  submitLabel?: string;
}

export function CastForm({
  onSubmit,
  onCancel,
  isPending,
  initialValues,
  submitLabel,
}: CastFormProps) {
  const { t } = useTranslation(['cast', 'app']);

  const form = useForm<CreateCastValues>({
    resolver: zodResolver(createCastSchema),
    defaultValues: initialValues || {
      name: '',
      biography: '',
      birthday: '',
      placeOfBirth: '',
      gender: 0,
      role: 'ACTOR',
      isActive: 1,
      profilePath: '',
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
              {t('cast:createDialog.avatar')}
            </FormLabel>
            <FormField
              control={form.control}
              name='profilePath'
              render={({ field }) => (
                <FormItem className='w-full flex justify-center'>
                  <ImageUploader
                    initialImage={field.value}
                    onImageUpload={(url: string) => field.onChange(url)}
                    className='w-48 h-64 rounded-xl border-4 border-muted object-cover'
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Details Section */}
          <div className='flex-1 w-full space-y-5'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                      {t('cast:createDialog.name')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('cast:createDialog.namePlaceholder')}
                        className='h-10 font-bold'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                      {t('cast:createDialog.role')}
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className='h-10'>
                          <SelectValue placeholder={t('app:select.placeholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='ACTOR'>ACTOR</SelectItem>
                        <SelectItem value='DIRECTOR'>DIRECTOR</SelectItem>
                        <SelectItem value='PRODUCER'>PRODUCER</SelectItem>
                        <SelectItem value='OTHER'>OTHER</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='birthday'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                      {t('cast:createDialog.birthday')}
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Calendar className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                        <Input
                          type='date'
                          className='h-10 pl-10'
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                      {t('cast:createDialog.gender')}
                    </FormLabel>
                    <Select onValueChange={(val) => field.onChange(Number(val))} value={field.value.toString()}>
                      <FormControl>
                        <SelectTrigger className='h-10'>
                          <SelectValue placeholder={t('app:select.placeholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='0'>{t('cast:gender.notSet')}</SelectItem>
                        <SelectItem value='1'>{t('cast:gender.female')}</SelectItem>
                        <SelectItem value='2'>{t('cast:gender.male')}</SelectItem>
                        <SelectItem value='3'>{t('cast:gender.nonBinary')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='placeOfBirth'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                    {t('cast:createDialog.placeOfBirth')}
                  </FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <MapPin className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                      <Input
                        placeholder={t('cast:createDialog.placeOfBirthPlaceholder')}
                        className='h-10 pl-10'
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='biography'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                    {t('cast:createDialog.biography')}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('cast:createDialog.biographyPlaceholder')}
                      className='min-h-[120px] resize-none leading-relaxed'
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
                  <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                    {t('cast:createDialog.status')}
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
            {submitLabel || t('cast:createDialog.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
