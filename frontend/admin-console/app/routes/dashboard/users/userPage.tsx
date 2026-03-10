import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppAddButton } from '~/components/shared/button/appAddButton';
import { AppSearchBar } from '~/components/shared/search/appSearchBar';
import { userQueries } from '~/queries/user.queries';
import { UserList } from '~/features/users/components/userList';
import { UserFilter } from '~/features/users/components/userFilter';
import { CreateUserModal } from '~/features/users/components/modal/createUserModal';

export default function UserPage() {
  const { t } = useTranslation(['app', 'user']);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');
  const [isActive, setIsActive] = useState('all');
  const [roleId, setRoleId] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, error } = useQuery(
    userQueries.list(page, limit, sortBy, sortDir, search, '', isActive, roleId),
  );

  const handleSort = (key: string) => {
    if (sortBy === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDir('asc');
    }
  };

  const handleApplyFilter = (filters: { isActive: string; roleId: string }) => {
    setIsActive(filters.isActive);
    setRoleId(filters.roleId);
    setPage(1);
  };

  const handleResetFilter = () => {
    setIsActive('all');
    setRoleId('all');
    setPage(1);
  };

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>{t('app:sidebar.management.user')}</h1>
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
            className='w-full md:w-[300px]'
          />
          <UserFilter
            isOpen={isFilterOpen}
            setIsOpen={setIsFilterOpen}
            onApply={handleApplyFilter}
            onReset={handleResetFilter}
            currentFilters={{ isActive, roleId }}
          />
          <AppAddButton
            handleOnClick={() => setIsCreateModalOpen(true)}
            title={t('user:createDialog.title')}
          />
        </div>
      </div>

      <UserList
        usersList={data?.data || []}
        userMeta={
          data?.meta || { total: 0, page: 1, limit: 10, totalPages: 0 }
        }
        isLoading={isLoading}
        error={error}
        handleSort={handleSort}
        sortBy={sortBy}
        sortDir={sortDir}
        handleOnPageChange={setPage}
        handleOnChangePageSize={setLimit}
        pageSize={limit}
      />

      <CreateUserModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
