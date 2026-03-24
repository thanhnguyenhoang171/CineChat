import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  TriangleAlert,
  Youtube,
  Video,
  PlayCircle,
  MonitorPlay,
  ExternalLink,
  ShieldCheck,
  Clock,
  Layers,
} from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppDeleteButton } from '~/components/shared/button/AppDeleteButton';
import { AppModifyButton } from '~/components/shared/button/AppModifyButton';
import { AppPagination } from '~/components/shared/pagination/appPagination';
import { AppPaginationMobile } from '~/components/shared/pagination/appPaginationMobile';
import { Skeleton } from '~/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { useBreakpoint } from '~/hooks/layout/useBreakpoint';
import { cn } from '~/lib/utils';
import type {
  PaginationMeta,
  Video as VideoType,
} from '~/types/module-types/video';
import { get4LastDigitsFromId } from '~/utils/common-utils';
import { AppAlertDialog } from '~/components/shared/alert-dialog/appAlertDialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { videoService } from '~/services/video.service';
import { toast } from 'sonner';
import { videoKeys } from '~/queries/video.queries';
import { Badge } from '~/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { UpdateVideoModal } from './modal/updateVideoModal';

interface VideoListProps {
  isLoading: boolean;
  error: any;
  handleSort: (key: string) => void;
  sortBy: string;
  sortDir: string;
  videosList: VideoType[];
  handleOnChangePageSize: (pageSize: number) => void;
  pageSize: number;
  handleOnPageChange: (page: number) => void;
  videoMeta: PaginationMeta;
}

export function VideoList({
  error,
  handleOnChangePageSize,
  handleOnPageChange,
  handleSort,
  isLoading,
  pageSize,
  videoMeta,
  videosList,
  sortBy,
  sortDir,
}: VideoListProps) {
  const { t } = useTranslation(['app', 'video']);
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const queryClient = useQueryClient();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<VideoType | null>(null);

  const handleEditClick = (video: VideoType) => {
    setSelectedVideo(video);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (video: VideoType) => {
    setVideoToDelete(video);
    setIsDeleteDialogOpen(true);
  };

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => videoService.deleteVideo(id),
    onSuccess: (response) => {
      if (response.status === 200) {
        toast.success(t('video:deleteDialog.success'));
        queryClient.invalidateQueries({ queryKey: videoKeys.lists() });
        setIsDeleteDialogOpen(false);
      } else {
        toast.error(response.message || t('app:error.general'));
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t('app:error.general'));
    },
  });

  if (error)
    return (
      <div className='text-destructive'>Đã xảy ra lỗi khi tải dữ liệu.</div>
    );

  const tableHeaders = [
    { label: 'video:table.name', key: 'name', sortable: true },
    { label: 'video:table.movie', key: 'movieId', sortable: true },
    { label: 'video:table.type', key: 'type', sortable: true },
    { label: 'video:table.quality', key: 'size', sortable: true },
    { label: 'video:table.status', key: 'isActive', sortable: true },
    { label: 'video:table.actions', key: 'actions', sortable: false },
  ];

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'Trailer':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Teaser':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Behind the Scenes':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Bloopers':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getYoutubeThumbnail = (key: string) =>
    `https://img.youtube.com/vi/${key}/default.jpg`;

  return (
    <div className='flex flex-col h-full w-full justify-center'>
      <div className='rounded-md border border-border overflow-hidden bg-card'>
        <Table>
          <TableHeader className='bg-muted/50'>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableHead
                  key={header.key}
                  className={cn(
                    'text-muted-foreground select-none whitespace-nowrap px-4 py-3',
                    header.sortable &&
                      'cursor-pointer hover:text-foreground transition-colors',
                  )}
                  onClick={() => header.sortable && handleSort(header.key)}>
                  <div
                    className={cn(
                      'flex items-center gap-1',
                      ['actions', 'isActive', 'size', 'type'].includes(
                        header.key,
                      )
                        ? 'justify-center'
                        : 'justify-start',
                    )}>
                    {t(header.label)}
                    {header.sortable && (
                      <span className='ml-1'>
                        {sortBy === header.key ? (
                          sortDir === 'asc' ? (
                            <ArrowUp size={14} />
                          ) : (
                            <ArrowDown size={14} />
                          )
                        ) : (
                          <ArrowUpDown size={14} className='opacity-30' />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, index) => (
                <TableRow key={index}>
                  {tableHeaders.map((h) => (
                    <TableCell key={h.key} className='px-4 py-4'>
                      <Skeleton className='h-5 w-full max-w-[120px]' />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : videosList.length > 0 ? (
              videosList.map((video) => (
                <TableRow
                  key={video._id}
                  className='hover:bg-muted/30 transition-colors group'>
                  {/* Name & Site */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center gap-3'>
                      <div className='relative shrink-0 group/thumb'>
                        <Avatar className='h-10 w-16 border border-border rounded-sm overflow-hidden'>
                          {video.site === 'YouTube' ? (
                            <AvatarImage
                              src={getYoutubeThumbnail(video.key)}
                              alt={video.name}
                              className='object-cover'
                            />
                          ) : null}
                          <AvatarFallback className='bg-primary/5 text-primary text-[10px] font-bold rounded-sm'>
                            VIDEO
                          </AvatarFallback>
                        </Avatar>
                        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity cursor-pointer'>
                          <PlayCircle className='text-white w-6 h-6' />
                        </div>
                      </div>
                      <div className='flex flex-col min-w-0'>
                        <div className='flex items-center gap-2'>
                          <span className='font-bold text-sm truncate text-foreground group-hover:text-primary transition-colors'>
                            {video.name}
                          </span>
                          {video.official && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <ShieldCheck className='w-3.5 h-3.5 text-blue-500' />
                                </TooltipTrigger>
                                <TooltipContent>Official Video</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                        <div className='flex items-center gap-2 mt-0.5'>
                          {video.site === 'YouTube' ? (
                            <Badge
                              variant='outline'
                              className='h-4 px-1 py-0 text-[9px] bg-red-50 text-red-600 border-red-200 gap-0.5'>
                              <Youtube size={10} /> YouTube
                            </Badge>
                          ) : (
                            <Badge
                              variant='outline'
                              className='h-4 px-1 py-0 text-[9px] bg-blue-50 text-blue-600 border-blue-200 gap-0.5'>
                              <Video size={10} /> {video.site}
                            </Badge>
                          )}
                          <span className='text-[10px] text-muted-foreground font-mono'>
                            {get4LastDigitsFromId(video._id)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Movie */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium'>
                        Movie ID: {get4LastDigitsFromId(video.movieId)}
                      </span>
                      <span className='text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5'>
                        <Layers size={10} /> Related Content
                      </span>
                    </div>
                  </TableCell>

                  {/* Type */}
                  <TableCell className='px-4 py-3 text-center'>
                    <span
                      className={cn(
                        'font-bold text-[10px] uppercase px-2 py-0.5 rounded border whitespace-nowrap',
                        getTypeBadgeVariant(video.type),
                      )}>
                      {video.type}
                    </span>
                  </TableCell>

                  {/* Quality */}
                  <TableCell className='px-4 py-3 text-center'>
                    <Badge
                      variant='secondary'
                      className='font-mono font-bold text-[10px] bg-slate-800 text-slate-100'>
                      {video.size}p
                    </Badge>
                  </TableCell>

                  {/* Status */}
                  <TableCell className='px-4 py-3 text-center'>
                    <Badge
                      variant={video.isActive === 1 ? 'default' : 'outline'}
                      className={cn(
                        'text-[10px] px-2 py-0 h-5',
                        video.isActive === 1
                          ? 'bg-emerald-500'
                          : 'text-muted-foreground',
                      )}>
                      {video.isActive === 1 ? 'ACTIVE' : 'INACTIVE'}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className='px-4 py-3'>
                    <div className='flex items-center justify-center gap-1'>
                      <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 text-muted-foreground hover:text-primary'>
                        <ExternalLink size={16} />
                      </Button>
                      <AppModifyButton
                        handleOnClick={() => handleEditClick(video)}
                      />
                      <AppDeleteButton
                        handleOnClick={() => handleDeleteClick(video)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableHeaders.length}
                  className='text-center h-32 text-muted-foreground italic'>
                  {t('app:noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <UpdateVideoModal
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        video={selectedVideo}
      />

      <AppAlertDialog
        openAlertDialog={isDeleteDialogOpen}
        setOpenAlertDialog={setIsDeleteDialogOpen}
        title={t('video:deleteDialog.title')}
        description={t('video:deleteDialog.description', {
          name: videoToDelete?.name,
        })}
        onConfirm={() => videoToDelete && deleteMutate(videoToDelete._id)}
        variantConfirmBtn='destructive'
        confirmText={t('video:deleteDialog.confirm')}
        cancelText={t('video:deleteDialog.cancel')}
        icon={<TriangleAlert className='text-destructive w-5 h-5' />}
      />

      <div className={isLoading ? 'opacity-50 pointer-events-none' : ''}>
        {isDesktop && (
          <AppPagination
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={videoMeta.page}
            totalPages={videoMeta.totalPages}
          />
        )}
        {(isMobile || isTablet) && (
          <AppPaginationMobile
            onPageSizeChange={handleOnChangePageSize}
            pageSize={pageSize}
            className='mt-4'
            onPageChange={handleOnPageChange}
            currentPage={videoMeta.page}
            totalPages={videoMeta.totalPages}
          />
        )}
      </div>
    </div>
  );
}
