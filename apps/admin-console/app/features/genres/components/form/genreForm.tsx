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
} from 'lucide-react';
import { genreSchema, type GenreFormValues } from '../../schemas';
import { Switch } from '~/components/ui/switch';
import { useEffect } from 'react';
import { Textarea } from '~/components/ui/textarea';

interface GenreFormProps {
  onSubmit: (values: GenreFormValues) => void;
  onCancel: () => void;
  isPending: boolean;
  initialValues?: GenreFormValues;
  submitLabel?: string;
}

export function GenreForm({
  onSubmit,
  onCancel,
  isPending,
  initialValues,
  submitLabel,
}: GenreFormProps) {
  const { t } = useTranslation(['genre', 'app']);

  const form = useForm<GenreFormValues>({
    resolver: zodResolver(genreSchema),
    defaultValues: initialValues || {
      name: '',
      description: '',
      isActive: 1,
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
        
        <div className='space-y-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                  {t('genre:createDialog.name')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('genre:createDialog.namePlaceholder')}
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
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                  {t('genre:createDialog.description')}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('genre:createDialog.descriptionPlaceholder')}
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
                  {t('genre:createDialog.status')}
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
            {submitLabel || t('genre:createDialog.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
