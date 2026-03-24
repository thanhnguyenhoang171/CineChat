import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppAddButton } from '~/components/shared/button/AppAddButton';
import { AppSearchBar } from '~/components/shared/search/appSearchBar';
import { roleQueries } from '~/queries/role.queries';
import { RoleList } from '~/features/roles/components/roleList';
import { RoleFilter } from '~/features/roles/components/roleFilter';
import { CreateRoleModal } from '~/features/roles/components/modal/createRoleModal';

export default function RolePage() {
  const { t } = useTranslation(['app', 'role']);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery(
    roleQueries.list(page, limit, sortBy, sortDir, search, '', isActive),
  );

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
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
            {t('app:sidebar.management.role')}
          </h1>
          <p className='text-muted-foreground text-sm'>
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
            className='w-full md:w-[300px]'
          />
          <RoleFilter
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
            currentFilters={{ isActive }}
          />
          <AppAddButton
            handleOnClick={() => setIsCreateModalOpen(true)}
            title={t('role:createDialog.title')}
          />
        </div>
      </div>

      <RoleList
        rolesList={data?.data || []}
        roleMeta={data?.meta || { total: 0, page: 1, limit: 10, totalPages: 0 }}
        isLoading={isLoading}
        error={error}
        handleSort={handleSort}
        sortBy={sortBy}
        sortDir={sortDir}
        handleOnPageChange={setPage}
        handleOnChangePageSize={setLimit}
        pageSize={limit}
      />

      <CreateRoleModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
