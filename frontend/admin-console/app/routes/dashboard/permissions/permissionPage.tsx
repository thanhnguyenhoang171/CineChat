import { PermissionList } from '~/features/permissions/components/permissionList';
import type { Route } from './+types/permissionPage';
import { TypographyH2 } from '~/components/shared/text/typographyH2';
import { AppAddButton } from '~/components/shared/button/appAddButton';
import { Plus } from 'lucide-react';
import { AppSearchBar } from '~/components/shared/search/appSearchBar';
import { useBreakpoint } from '~/hooks/layout/useBreakpoint';
import { cn } from '~/lib/utils';
import { useSidebar } from '~/components/ui/sidebar';
import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { permissionQueries } from '~/queries/permisson.queries';
import type {
  PaginationMeta,
  Permission,
} from '~/types/module-types/permission';
import { defaultMeta } from '~/constants/app/app-pagination-constant';
import { getItemTotal } from '~/utils/common-utils';
import { lazy } from 'react';
import { PermissionFilterDialog } from '~/features/permissions/components/permissionFilterDialog';
import { useTranslation } from 'react-i18next';

export default function PermissionPage() {
  const { t } = useTranslation('app');
  const { isMobile, isTablet } = useBreakpoint();
  const { open } = useSidebar();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || defaultMeta.page;
  const pageSize = Number(searchParams.get('limit')) || defaultMeta.limit;
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortDir = (searchParams.get('sortDir') as 'asc' | 'desc') || 'desc';
  const search = searchParams.get('search') || '';
  const projections = searchParams.get('projections') || '';

  const { data, isLoading, error } = useQuery(
    permissionQueries.list(
      page,
      pageSize,
      sortBy,
      sortDir,
      search,
      projections,
    ),
  );

  const permissionsList: Permission[] = data?.data || [];
  const permissionMeta: PaginationMeta = data?.meta || defaultMeta;

  const handleProjections = (newProjections: string) => {
    setSearchParams((prev) => {
      if (newProjections) {
        prev.set('projections', newProjections);
      } else {
        prev.delete('projections');
      }
      return prev;
    });
  };

  const handleSearch = (newKeyword: string) => {
    setSearchParams((prev) => {
      if (newKeyword) {
        prev.set('search', newKeyword);
      } else {
        prev.delete('search'); // remove params empty
      }
      prev.set('page', '1'); //: Reset page to  1 when searching
      return prev;
    });
  };

  const handleSort = (key: string) => {
    const newDir = sortBy === key && sortDir === 'asc' ? 'desc' : 'asc';
    setSearchParams((prev) => {
      prev.set('sortBy', key);
      prev.set('sortDir', newDir);
      prev.set('page', '1');
      return prev;
    });
  };

  const handleOnPageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('page', newPage.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOnChangePageSize = (pageSize: number) => {
    setSearchParams((prev) => {
      prev.set('limit', pageSize.toString());
      prev.set('page', '1');
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const textShow = isMobile
    ? undefined
    : isTablet && open
      ? undefined
      : t('button.addPermission');

  return (
    <div className='min-h-screen flex bg-slate-100 p-4 flex-col h-full'>
      <div
        className={cn(
          'flex flex-row justify-between items-center mt-3 mb-3',
          (isMobile || isTablet) && 'flex-col mt-3 mb-3',
        )}>
        <TypographyH2 text={t('text.permissionTable')} />
        <div className='flex flex-row gap-3 items-center'>
          {!error && (
            <>
              <AppSearchBar
                totalSearchResult={getItemTotal(permissionsList)}
                initialValue={search}
                onSearch={handleSearch}
                placeholder={t('text.searchPlaceHolder')}
                isLoading={isLoading}
              />
              <PermissionFilterDialog />
              <AppAddButton
                text={textShow}
                icon={Plus}
                handleOnClick={() => alert('Thêm người dùng mới')}
              />
            </>
          )}
        </div>
      </div>
      <PermissionList
        error={error}
        handleOnChangePageSize={handleOnChangePageSize}
        handleOnPageChange={handleOnPageChange}
        handleSort={handleSort}
        isLoading={isLoading}
        pageSize={pageSize}
        permissionMeta={permissionMeta}
        permissionsList={permissionsList}
        sortBy={sortBy}
        sortDir={sortDir}
      />

      <div className='w-full h-8 end-page -z-10'></div>
    </div>
  );
}
