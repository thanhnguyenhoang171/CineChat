import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Switch } from '~/components/ui/switch';
import { videoService } from '~/services/video.service';
import { videoKeys } from '~/queries/video.queries';
import type { Video } from '@cinechat/types';
import { videoSchema, type VideoFormValues } from '../schemas';
import { movieQueries } from '~/queries/movie.queries';

interface UpdateVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  video: Video | null;
}

const videoTypes = ['Trailer', 'Teaser', 'Clip', 'Featurette', 'Behind the Scenes', 'Bloopers'];
const videoQualities = [1080, 720, 480, 360, 240];

export function UpdateVideoModal({ open, onOpenChange, video }: UpdateVideoModalProps) {
  const { t } = useTranslation(['video', 'app']);
  const queryClient = useQueryClient();
  const { data: moviesData } = useQuery(movieQueries.list(1, 100));

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      name: '',
      movieId: '',
      key: '',
      site: 'YouTube',
      type: 'Trailer',
      size: 1080,
      official: false,
      isActive: 1,
    },
  });

  useEffect(() => {
    if (video) {
      form.reset({
        name: video.name,
        movieId: video.movieId,
        key: video.key,
        site: video.site as any,
        type: video.type as any,
        size: video.size,
        official: video.official,
        isActive: video.isActive,
      });
    }
  }, [video, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: VideoFormValues) => {
      if (!video) throw new Error('No video selected');
      return videoService.updateVideo(video._id, data);
    },
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success(t('video:updateDialog.success'));
        queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
        onOpenChange(false);
      } else {
        toast.error(res.message || t('app:toast.errorInternal'));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t('app:toast.errorInternal'));
    },
  });

  const onSubmit = (data: VideoFormValues) => {
    mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>{t('video:updateDialog.title')}</DialogTitle>
          <DialogDescription>{t('video:updateDialog.description')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField control={form.control} name='name' render={({ field }) => ( <FormItem> <FormLabel>{t('video:form.name')}</FormLabel> <FormControl> <Input placeholder={t('video:form.namePlaceholder')} {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
            <FormField control={form.control} name='movieId' render={({ field }) => ( <FormItem> <FormLabel>{t('video:table.movie')}</FormLabel> <Select onValueChange={field.onChange} value={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder={t('app:select.placeholder')} /> </SelectTrigger> </FormControl> <SelectContent> {moviesData?.data?.map((m: any) => ( <SelectItem key={m._id} value={m._id}>{m.title}</SelectItem> ))} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
            <div className='grid grid-cols-2 gap-4'>
              <FormField control={form.control} name='type' render={({ field }) => ( <FormItem> <FormLabel>{t('video:table.type')}</FormLabel> <Select onValueChange={field.onChange} value={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder={t('app:select.placeholder')} /> </SelectTrigger> </FormControl> <SelectContent> {videoTypes.map(type => ( <SelectItem key={type} value={type}>{type}</SelectItem> ))} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
              <FormField control={form.control} name='size' render={({ field }) => ( <FormItem> <FormLabel>{t('video:table.quality')}</FormLabel> <Select onValueChange={(v) => field.onChange(Number(v))} value={String(field.value)}> <FormControl> <SelectTrigger> <SelectValue placeholder={t('app:select.placeholder')} /> </SelectTrigger> </FormControl> <SelectContent> {videoQualities.map(q => ( <SelectItem key={q} value={String(q)}>{q}p</SelectItem> ))} </SelectContent> </Select> <FormMessage /> </FormItem> )} />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <FormField control={form.control} name='official' render={({ field }) => ( <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'> <div className='space-y-0.5'> <FormLabel>{t('video:form.official')}</FormLabel> </div> <FormControl> <Switch checked={field.value} onCheckedChange={field.onChange} /> </FormControl> </FormItem> )} />
              <FormField control={form.control} name='isActive' render={({ field }) => ( <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'> <div className='space-y-0.5'> <FormLabel>{t('app:status.active')}</FormLabel> </div> <FormControl> <Switch checked={field.value === 1} onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)} /> </FormControl> </FormItem> )} />
            </div>
            <DialogFooter>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                {t('app:button.cancel')}
              </Button>
              <Button type='submit' disabled={isPending}>
                {isPending ? t('app:button.updating') : t('app:button.update')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
