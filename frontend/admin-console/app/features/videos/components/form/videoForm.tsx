import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { useTranslation } from 'react-i18next';
import {
  Loader2,
  Film,
  Type,
  Video,
  Settings2,
  Globe,
  Monitor,
  ShieldCheck,
  Hash,
} from 'lucide-react';
import { videoSchema, type VideoFormValues, defaultVideoValues } from '../../schemas';
import { Switch } from '~/components/ui/switch';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useQuery } from '@tanstack/react-query';
import { movieQueries } from '~/queries/movie.queries';
import { cn } from '~/lib/utils';

interface VideoFormProps {
  onSubmit: (values: VideoFormValues) => void;
  onCancel: () => void;
  isPending: boolean;
  initialValues?: VideoFormValues;
  submitLabel?: string;
}

export function VideoForm({
  onSubmit,
  onCancel,
  isPending,
  initialValues,
  submitLabel,
}: VideoFormProps) {
  const { t } = useTranslation(['video', 'app', 'movie']);
  const { data: moviesData } = useQuery(movieQueries.list(1, 100));

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: initialValues || defaultVideoValues,
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  const videoTypes = ['Trailer', 'Teaser', 'Clip', 'Featurette', 'Behind the Scenes', 'Bloopers'];
  const videoSites = ['YouTube', 'Vimeo', 'Other'];
  const videoSizes = [360, 480, 720, 1080, 2160, 4320];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className='space-y-6'>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Movie Selection */}
          <FormField
            control={form.control}
            name='movieId'
            render={({ field }) => (
              <FormItem className='col-span-full md:col-span-1'>
                <FormLabel className='text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1.5'>
                  <Film size={12} className='text-primary' />
                  {t('video:table.movie')}
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='h-10 border-muted-foreground/20'>
                      <SelectValue placeholder={t('app:select.placeholder')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {moviesData?.data?.map((movie: any) => (
                      <SelectItem key={movie._id} value={movie._id}>{movie.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Video Name */}
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='col-span-full md:col-span-1'>
                <FormLabel className='text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1.5'>
                  <Type size={12} className='text-primary' />
                  {t('video:table.name')}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g. Official Trailer 1'
                    className='h-10 border-muted-foreground/20 font-medium'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Site Selection */}
          <FormField
            control={form.control}
            name='site'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1.5'>
                  <Globe size={12} className='text-primary' />
                  Platform
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='h-10 border-muted-foreground/20'>
                      <SelectValue placeholder='Select platform' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {videoSites.map(site => (
                      <SelectItem key={site} value={site}>{site}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Video Key */}
          <FormField
            control={form.control}
            name='key'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1.5'>
                  <Hash size={12} className='text-primary' />
                  Video Key / ID
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g. JfVOs4VSpmA'
                    className='h-10 border-muted-foreground/20 font-mono text-xs'
                    {...field}
                  />
                </FormControl>
                <FormDescription className='text-[10px]'>
                  YouTube Video ID or provider unique key.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type Selection */}
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1.5'>
                  <Settings2 size={12} className='text-primary' />
                  {t('video:table.type')}
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className='h-10 border-muted-foreground/20'>
                      <SelectValue placeholder='Select type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {videoTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Size / Quality Selection */}
          <FormField
            control={form.control}
            name='size'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1.5'>
                  <Monitor size={12} className='text-primary' />
                  {t('video:table.quality')}
                </FormLabel>
                <Select 
                  onValueChange={(val) => field.onChange(Number(val))} 
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger className='h-10 border-muted-foreground/20'>
                      <SelectValue placeholder='Select resolution' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {videoSizes.map(size => (
                      <SelectItem key={size} value={size.toString()}>{size}p</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Official Switch */}
          <FormField
            control={form.control}
            name='official'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border bg-muted/5 p-3 h-12'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-[11px] font-bold uppercase text-muted-foreground flex items-center gap-1.5'>
                    <ShieldCheck size={12} className='text-blue-500' />
                    Official Content
                  </FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className='scale-90 origin-right'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Status Switch */}
          <FormField
            control={form.control}
            name='isActive'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border bg-muted/5 p-3 h-12'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-[11px] font-bold uppercase text-muted-foreground'>
                    {field.value === 1 ? t('app:status.active') : t('app:status.inactive')}
                  </FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value === 1}
                    onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                    className='scale-90 origin-right'
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Footer Actions */}
        <div className='flex justify-end gap-3 pt-6 border-t mt-4'>
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
            {submitLabel || t('video:createDialog.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
