import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GeneralError } from '~/components/shared/error/generalError';

import { AppSearchBar } from '~/components/shared/search/appSearchBar';
import { videoQueries } from '~/queries/video.queries';
import { VideoList } from '~/features/videos/components/videoList';
import { VideoFilter } from '~/features/videos/components/videoFilter';
import { CreateVideoModal } from '~/features/videos/components/modal/createVideoModal';
import { AppAddButton } from '~/components/shared/button/AppAddButton';

export default function VideoListPage() {
  const { t } = useTranslation(['app', 'video']);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [movieId, setMovieId] = useState('all');
  const [type, setType] = useState('all');
  const [isActive, setIsActive] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery(
    videoQueries.list(page, limit, search, movieId, type, isActive),
  );

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return (
      <GeneralError message='Could not fetch videos' details={errorMessage} />
    );
  }

  const handleSort = (key: string) => {
    console.log('Sort by:', key);
  };

  const handleApplyFilter = (filters: {
    movieId: string;
    type: string;
    isActive: string;
  }) => {
    setMovieId(filters.movieId);
    setType(filters.type);
    setIsActive(filters.isActive);
    setPage(1);
  };

  const handleResetFilter = () => {
    setMovieId('all');
    setType('all');
    setIsActive('all');
    setPage(1);
  };

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>
            {t('app:sidebar.system.video')}
          </h1>
          <p className='text-muted-foreground text-sm italic'>
            {t('app:text.searchResult', { var: data?.meta?.total || 0 })}
          </p>
        </div>
        <div className='flex items-center gap-2 w-full md:w-auto'>
          <AppSearchBar
            placeholder={t('app:text.searchPlaceHolder')}
            onSearch={(val) => {
              setSearch(val);
              setPage(1);
            }}
            isLoading={isLoading}
            totalSearchResult={data?.meta?.total || 0}
          />
          <VideoFilter
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
            currentFilters={{ movieId, type, isActive }}
          />
          <AppAddButton
            handleOnClick={() => setIsCreateModalOpen(true)}
            text={t('video:createDialog.title')}
          />
        </div>
      </div>

      <VideoList
        videosList={data?.data || []}
        videoMeta={
          data?.meta || { total: 0, page: 1, limit: 10, totalPages: 0 }
        }
        isLoading={isLoading}
        error={null}
        handleSort={handleSort}
        sortBy='createdAt'
        sortDir='desc'
        handleOnPageChange={setPage}
        handleOnChangePageSize={setLimit}
        pageSize={limit}
      />

      <CreateVideoModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
