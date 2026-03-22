import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { videoService } from '~/services/video.service';
import { videoKeys } from '~/queries/video.queries';
import { VideoForm } from '../form/videoForm';
import { type VideoFormValues } from '../../schemas';
import { Video } from 'lucide-react';

interface CreateVideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateVideoModal({
  open,
  onOpenChange,
}: CreateVideoModalProps) {
  const { t } = useTranslation(['video', 'app']);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: VideoFormValues) => videoService.createVideo(values),
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success(t('video:createDialog.success'));
        queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
        onOpenChange(false);
      } else {
        toast.error(response.message || t('app:error.general'));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t('app:error.general'));
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[700px] p-0 overflow-hidden border-none shadow-2xl'>
        <DialogHeader className='p-6 bg-primary/5 border-b'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-primary/10 rounded-lg'>
              <Video className='w-5 h-5 text-primary' />
            </div>
            <DialogTitle className='text-xl font-bold text-foreground'>
              {t('video:createDialog.title')}
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className='p-6 max-h-[80vh] overflow-y-auto'>
          <VideoForm
            onSubmit={mutate}
            onCancel={() => onOpenChange(false)}
            isPending={isPending}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
