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
  Calendar as CalendarIcon,
  Clock,
  Film,
  Type,
  User,
  Video,
  Info,
} from 'lucide-react';
import { movieSchema, type MovieFormValues } from '../../schemas';
import { Switch } from '~/components/ui/switch';
import { useEffect } from 'react';
import { Textarea } from '~/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { genreQueries } from '~/queries/genre.queries';
import { Checkbox } from '~/components/ui/checkbox';
import { ImageUploader } from '~/components/shared/image/imageUploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

interface MovieFormProps {
  onSubmit: (values: MovieFormValues) => void;
  onCancel: () => void;
  isPending: boolean;
  initialValues?: MovieFormValues;
  submitLabel?: string;
}

export function MovieForm({
  onSubmit,
  onCancel,
  isPending,
  initialValues,
  submitLabel,
}: MovieFormProps) {
  const { t } = useTranslation(['movie', 'app']);
  const { data: genresData } = useQuery(genreQueries.list(1, 100));

  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieSchema),
    defaultValues: initialValues || {
      title: '',
      originalTitle: '',
      overview: '',
      tagline: '',
      releaseDate: '',
      runtime: 0,
      status: 'Released',
      posterPath: '',
      backdropPath: '',
      genreIds: [],
      isActive: 1,
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  const movieStatuses = [
    'Rumored', 'Planned', 'In Production', 'Post Production', 'Released', 'Canceled'
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className='space-y-6'>
        
        <Tabs defaultValue='info' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 mb-6 h-12'>
            <TabsTrigger value='info' className='flex items-center gap-2 h-10'>
              <Info size={16} /> {t('app:text.info')}
            </TabsTrigger>
            <TabsTrigger value='cast' className='flex items-center gap-2 h-10'>
              <User size={16} /> {t('app:sidebar.management.cast')}
            </TabsTrigger>
            <TabsTrigger value='video' className='flex items-center gap-2 h-10'>
              <Video size={16} /> {t('app:sidebar.management.video')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value='info' className='space-y-6'>
            <div className='flex flex-col lg:flex-row gap-8'>
              {/* Poster Section */}
              <div className='flex flex-col items-center gap-4 w-full lg:w-1/3'>
                <FormLabel className='text-xs font-bold uppercase text-muted-foreground self-start'>
                  Poster
                </FormLabel>
                <FormField
                  control={form.control}
                  name='posterPath'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <div className='w-full aspect-2/3'>
                        <ImageUploader
                          initialImage={field.value}
                          onImageUpload={(url: string) => field.onChange(url)}
                          aspectRatio={2 / 3}
                          className='rounded-xl border-4 border-muted object-cover'
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Main Info Section */}
              <div className='flex-1 space-y-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5'>
                          <Film size={12} className='text-primary' />
                          {t('movie:createDialog.name')}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t('movie:createDialog.namePlaceholder')}
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
                    name='originalTitle'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5'>
                          <Type size={12} className='text-primary' />
                          Original Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter original title'
                            className='h-10'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <FormField
                    control={form.control}
                    name='releaseDate'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5'>
                          <CalendarIcon size={12} className='text-primary' />
                          {t('movie:createDialog.releaseDate')}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='date'
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
                    name='runtime'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5'>
                          <Clock size={12} className='text-primary' />
                          Runtime (mins)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            className='h-10'
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                        {t('movie:createDialog.status')}
                      </FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className='h-10'>
                            <SelectValue placeholder='Select status' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {movieStatuses.map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='space-y-3'>
                  <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                    {t('movie:createDialog.genres')}
                  </FormLabel>
                  <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg border bg-muted/20'>
                    {genresData?.data?.map((genre: any) => (
                      <FormField
                        key={genre._id}
                        control={form.control}
                        name='genreIds'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={genre._id}
                              className='flex flex-row items-start space-x-2 space-y-0'
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(genre._id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, genre._id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== genre._id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='text-xs font-medium cursor-pointer'>
                                {genre.name}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </div>

                <FormField
                  control={form.control}
                  name='overview'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xs font-bold uppercase text-muted-foreground'>
                        {t('movie:createDialog.overview')}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('movie:createDialog.overviewPlaceholder')}
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
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value='cast'>
            <div className='p-12 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground gap-4'>
              <User size={48} className='opacity-20' />
              <p className='font-medium italic'>Cast management integration coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value='video'>
            <div className='p-12 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground gap-4'>
              <Video size={48} className='opacity-20' />
              <p className='font-medium italic'>Video management integration coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>

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
            {submitLabel || t('movie:createDialog.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
