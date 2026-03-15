import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppAddButton } from '~/components/shared/button/appAddButton';
import { AppSearchBar } from '~/components/shared/search/appSearchBar';
import { movieQueries } from '~/queries/movie.queries';
import { MovieList } from '~/features/movies/components/movieList';
import { MovieFilter } from '~/features/movies/components/movieFilter';
import { CreateMovieModal } from '~/features/movies/components/modal/createMovieModal';

export default function MoviesListPage() {
  const { t } = useTranslation(['app', 'movie']);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [genreId, setGenreId] = useState('all');
  const [isActive, setIsActive] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery(
    movieQueries.list(page, limit, search, status, genreId, isActive),
  );

  const handleSort = (key: string) => {
    console.log('Sort by:', key);
  };

  const handleApplyFilter = (filters: { status: string; genreId: string; isActive: string }) => {
    setStatus(filters.status);
    setGenreId(filters.genreId);
    setIsActive(filters.isActive);
    setPage(1);
  };

  const handleResetFilter = () => {
    setStatus('all');
    setGenreId('all');
    setIsActive('all');
    setPage(1);
  };

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>{t('app:sidebar.management.movie')}</h1>
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
          <MovieFilter
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
            currentFilters={{ status, genreId, isActive }}
          />
          <AppAddButton
            handleOnClick={() => setIsCreateModalOpen(true)}
            text={t('movie:createDialog.title')}
          />
        </div>
      </div>

      <MovieList
        moviesList={data?.data || []}
        movieMeta={
          data?.meta || { total: 0, page: 1, limit: 10, totalPages: 0 }
        }
        isLoading={isLoading}
        error={error}
        handleSort={handleSort}
        sortBy='createdAt'
        sortDir='desc'
        handleOnPageChange={setPage}
        handleOnChangePageSize={setLimit}
        pageSize={limit}
      />

      <CreateMovieModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
