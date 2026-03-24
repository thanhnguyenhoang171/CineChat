import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppAddButton } from '~/components/shared/button/AppAddButton';
import { AppSearchBar } from '~/components/shared/search/appSearchBar';
import { genreQueries } from '~/queries/genre.queries';
import { GenreList } from '~/features/genres/components/genreList';
import { GenreFilter } from '~/features/genres/components/genreFilter';
import { CreateGenreModal } from '~/features/genres/components/modal/createGenreModal';

export default function GenrePage() {
  const { t } = useTranslation(['app', 'genre']);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery(
    genreQueries.list(page, limit, search, isActive),
  );

  const handleSort = (key: string) => {
    console.log('Sort by:', key);
  };

  const handleApplyFilter = (filters: { isActive: string }) => {
    setIsActive(filters.isActive);
    setPage(1);
  };

  const handleResetFilter = () => {
    setIsActive('all');
    setPage(1);
  };

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>
            {t('app:sidebar.management.genre')}
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
          <GenreFilter
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
            currentFilters={{ isActive }}
          />
          <AppAddButton
            handleOnClick={() => setIsCreateModalOpen(true)}
            text={t('genre:createDialog.title')}
          />
        </div>
      </div>

      <GenreList
        genresList={data?.data || []}
        genreMeta={
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

      <CreateGenreModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
