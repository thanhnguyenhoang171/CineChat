import { Outlet, NavLink, Link, redirect, useLocation } from 'react-router';
import { AppMobileMenu } from '~/components/layout/appMobileMenu';
import { SidebarTrigger, useSidebar } from '~/components/ui/sidebar';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import { useLogout } from '~/hooks/useLogout';
import { cn } from '~/lib/utils';

export default function AdminLayout() {
  const { open } = useSidebar();
  const { isMobile, isDesktop, isTablet } = useBreakpoint();
  return (
    <>
      {!isMobile && (
        <SidebarTrigger
          className={cn(
            !open && 'hidden',
            isMobile && 'absolute bottom-4 left-4 border-2 border-slate-200',
          )}
        />
      )}
      <main className='flex-1 overflow-y-auto bg-slate-50'>
        <div className='mx-auto max-w-7xl animate-in fade-in duration-500'>
          <Outlet />
        </div>
      </main>
      {isMobile && (
        <AppMobileMenu className='fixed bottom-4 left-1/2 -translate-x-1/2' />
      )}
    </>
  );
}
