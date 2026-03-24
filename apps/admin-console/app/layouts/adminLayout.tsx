import { Outlet } from 'react-router';
import { AppMobileMenu } from '~/components/layout/appMobileMenu';
import { SidebarProvider, useSidebar } from '~/components/ui/sidebar';
import { AppSidebar } from '~/components/layout/appSideBar';
import { useBreakpoint } from '~/hooks/layout/useBreakpoint';
import { SidebarTriggerWrapper } from '~/components/shared/sidebar/sidebarTriggerWrapper';
import { useEffect, useState } from 'react';

export default function AdminLayout() {
  const { isMobile } = useBreakpoint();
  const { open } = useSidebar();
  const [showTrigger, setShowTrigger] = useState(false);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setShowTrigger(true), 200);
      return () => clearTimeout(t);
    } else {
      setShowTrigger(false);
    }
  }, [open]);
  return (
    <>
      {!isMobile && <AppSidebar />}
      <main className='flex-1 overflow-y-auto bg-slate-50 relative w-full'>
        <div className='mx-auto max-w-8xl animate-in fade-in duration-200 p-4'>
          {showTrigger && (
            <SidebarTriggerWrapper
              className='fixed top-0 left-[calc(var(--sidebar-width)+0.1rem)] z-50'
              isMobile={isMobile}
            />
          )}
          <Outlet />
        </div>
      </main>
      {isMobile && (
        <AppMobileMenu className='fixed bottom-4 left-1/2 -translate-x-1/2' />
      )}
    </>
  );
}
