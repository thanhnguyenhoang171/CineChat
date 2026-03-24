import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppAddButton } from '~/components/shared/button/AppAddButton';
import { AppSearchBar } from '~/components/shared/search/appSearchBar';
import { castQueries } from '~/queries/cast.queries';
import { CastList } from '~/features/casts/components/castList';
import { CastFilter } from '~/features/casts/components/castFilter';
import { CreateCastModal } from '~/features/casts/components/modal/createCastModal';

export default function CastPage() {
  const { t } = useTranslation(['app', 'cast']);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('all');
  const [role, setRole] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // We don't have sortBy in fake service yet, keeping it simple
  const { data, isLoading, error } = useQuery(
    castQueries.list(page, limit, search, role, isActive),
  );

  const handleSort = (key: string) => {
    // Fake service logic for sorting could be added here
    console.log('Sort by:', key);
  };

  const handleApplyFilter = (filters: { isActive: string; role: string }) => {
    setIsActive(filters.isActive);
    setRole(filters.role);
    setPage(1);
  };

  const handleResetFilter = () => {
    setIsActive('all');
    setRole('all');
    setPage(1);
  };

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>
            {t('app:sidebar.management.cast')}
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
          <CastFilter
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
            currentFilters={{ isActive, role }}
          />
          <AppAddButton
            handleOnClick={() => setIsCreateModalOpen(true)}
            text={t('cast:createDialog.title')}
          />
        </div>
      </div>

      <CastList
        castsList={data?.data || []}
        castMeta={data?.meta || { total: 0, page: 1, limit: 10, totalPages: 0 }}
        isLoading={isLoading}
        error={error}
        handleSort={handleSort}
        sortBy='createdAt'
        sortDir='desc'
        handleOnPageChange={setPage}
        handleOnChangePageSize={setLimit}
        pageSize={limit}
      />

      <CreateCastModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
