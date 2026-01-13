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
        <SidebarTrigger className={cn(!open && 'hidden')} />
      )}
      <main className='flex-1 overflow-y-auto bg-slate-50'>
        <div className='mx-auto max-w-7xl animate-in fade-in duration-200'>
          <Outlet />
        </div>
      </main>
      {isMobile && (
        <AppMobileMenu className='fixed bottom-4 left-1/2 -translate-x-1/2' />
      )}
    </>
  );
}
