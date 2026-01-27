import { Outlet } from 'react-router';
import { AppMobileMenu } from '~/components/layout/appMobileMenu';
import { SidebarProvider } from '~/components/ui/sidebar';
import { AppSidebar } from '~/components/layout/appSideBar';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import { SidebarTriggerWrapper } from '~/components/shared/sidebar/sidebarTriggerWrapper';

export default function AdminLayout() {
  const { isMobile } = useBreakpoint();

  return (
    <SidebarProvider>
      {!isMobile && <AppSidebar />}
      <main className='flex-1 overflow-y-auto bg-slate-50 relative w-full'>
        <div className='mx-auto max-w-8xl animate-in fade-in duration-200 p-4'>
          <SidebarTriggerWrapper className='absolute' isMobile={isMobile} />
          <Outlet />
        </div>
      </main>
      {isMobile && (
        <AppMobileMenu className='fixed bottom-4 left-1/2 -translate-x-1/2' />
      )}
    </SidebarProvider>
  );
}
