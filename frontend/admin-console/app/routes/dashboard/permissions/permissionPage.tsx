import { PermissionList } from '~/features/permissions/components/permissionList';
import type { Route } from './+types/permissionPage';
import { TypographyH2 } from '~/components/shared/typographyH2';
import { AppAddButton } from '~/components/shared/appAddButton';
import { Plus } from 'lucide-react';
import { AppSearchBar } from '~/components/shared/appSearchBar';
import { PermissionFilter } from '~/features/permissions/components/permissionFilter';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import { cn } from '~/lib/utils';
import { useSidebar } from '~/components/ui/sidebar';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Quản lý quyền truy cập hệ thống' }];
}

export default function PermissionPage() {
  const { isMobile, isTablet } = useBreakpoint();
  const { open } = useSidebar();

  const textShow = isMobile
    ? undefined
    : isTablet && open
      ? undefined
      : 'Thêm người dùng mới';

  return (
    <div className='min-h-screen flex bg-slate-100 p-4 flex-col h-full'>
      <div
        className={cn(
          'flex flex-row justify-between items-center mt-3 mb-3',
          (isMobile || isTablet) && 'flex-col mt-3 mb-3',
        )}>
        <TypographyH2 text='Quản lý danh sách người dùng' />
        <div className='flex flex-row gap-3 items-center'>
          <AppSearchBar />
          <PermissionFilter />
          <AppAddButton
            text={textShow}
            icon={Plus}
            handleOnClick={() => alert('Thêm người dùng mới')}
          />
        </div>
      </div>
      <PermissionList />

      <div className='w-full h-8 end-page -z-10'></div>
    </div>
  );
}
