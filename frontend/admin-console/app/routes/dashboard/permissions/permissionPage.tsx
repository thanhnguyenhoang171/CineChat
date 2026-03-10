import { PermissionList } from '~/features/permissions/components/permissionList';
import type { Route } from './+types/permissionPage';
import { TypographyH2 } from '~/components/shared/text/typographyH2';
import { AppAddButton } from '~/components/shared/button/appAddButton';
import { Plus, Filter } from 'lucide-react';
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
import { lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '~/components/ui/button';
import { PermissionFilter } from '~/features/permissions/components/permissionFilter';
import { Badge } from '~/components/ui/badge';

import { CreatePermissionModal } from '~/features/permissions/components/modal/createPermissionModal';

export default function PermissionPage() {
  const { t } = useTranslation(['app', 'permission']);
  const { isMobile, isTablet } = useBreakpoint();
  const { open } = useSidebar();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const page = Number(searchParams.get('page')) || defaultMeta.page;
  const pageSize = Number(searchParams.get('limit')) || defaultMeta.limit;
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortDir = (searchParams.get('sortDir') as 'asc' | 'desc') || 'desc';
  const search = searchParams.get('search') || '';
  const projections = searchParams.get('projections') || '';
  
  // Filters from URL
  const method = searchParams.get('method') || '';
  const module = searchParams.get('module') || '';
  const isActive = searchParams.get('isActive') || 'all';

  const { data, isLoading, error } = useQuery(
    permissionQueries.list(
      page,
      pageSize,
      sortBy,
      sortDir,
      search,
      projections,
      method,
      module,
      isActive,
    ),
  );

  const permissionsList: Permission[] = data?.data || [];
  const permissionMeta: PaginationMeta = data?.meta || defaultMeta;

  const handleSearch = (newKeyword: string) => {
    setSearchParams((prev) => {
      if (newKeyword) {
        prev.set('search', newKeyword);
      } else {
        prev.delete('search');
      }
      prev.set('page', '1');
      return prev;
    });
  };

  const handleApplyFilters = (filters: { 
    method: string; 
    module: string; 
    isActive: string;
    sortBy: string;
    sortDir: 'asc' | 'desc';
  }) => {
    setSearchParams((prev) => {
      // Handle Filtering
      if (filters.method) prev.set('method', filters.method); else prev.delete('method');
      if (filters.module) prev.set('module', filters.module); else prev.delete('module');
      if (filters.isActive !== 'all') prev.set('isActive', filters.isActive); else prev.delete('isActive');
      
      // Handle Sorting
      prev.set('sortBy', filters.sortBy);
      prev.set('sortDir', filters.sortDir);
      
      prev.set('page', '1');
      return prev;
    });
  };

  const handleResetFilters = () => {
    setSearchParams((prev) => {
      prev.delete('method');
      prev.delete('module');
      prev.delete('isActive');
      prev.set('sortBy', 'createdAt');
      prev.set('sortDir', 'desc');
      prev.set('page', '1');
      return prev;
    });
  };

  const activeFiltersCount = [method, module, isActive !== 'all' ? isActive : ''].filter(Boolean).length;

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
      : t('app:button.addPermission');

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>{t('app:text.permissionTable')}</h1>
          <p className='text-muted-foreground text-sm italic'>
            {t('app:text.searchResult', { var: permissionMeta.total || 0 })}
          </p>
        </div>
        <div className='flex items-center gap-2 w-full md:w-auto'>
          <AppSearchBar
            placeholder={t('app:text.searchPlaceHolder')}
            onSearch={handleSearch}
            initialValue={search}
            className='w-full md:w-[300px]'
          />
          <div className='relative'>
            <Button
              variant='outline'
              size='default'
              className={cn(
                'bg-background border-muted-foreground/20 hover:bg-muted/50 h-10 px-3 transition-all',
                activeFiltersCount > 0 && 'border-primary/50 bg-primary/[0.02]'
              )}
              onClick={() => setIsFilterOpen(true)}>
              <Filter className={cn('w-4 h-4 mr-2', activeFiltersCount > 0 && 'text-primary')} />
              <span className='hidden sm:inline font-bold text-sm'>
                {t('app:button.apply')}
              </span>
              {activeFiltersCount > 0 && (
                <Badge 
                  variant='default' 
                  className='ml-2 h-5 min-w-5 flex items-center justify-center p-0 text-[10px] bg-primary'
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
          <AppAddButton
            handleOnClick={() => setIsCreateDialogOpen(true)}
            title={t('app:button.addPermission')}
          />
        </div>
      </div>

      <PermissionFilter
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        filters={{ method, module, isActive, sortBy, sortDir }}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
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

      <CreatePermissionModal
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

      <div className='w-full h-8 end-page -z-10'></div>
    </div>
  );
}
