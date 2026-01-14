import { Outlet, redirect } from 'react-router';

import { useBoundStore } from '~/store';
import { Spinner } from '~/components/ui/spinner';
import { silentRefreshToken } from '~/helpers/silent-refresh-token';
import type { Route } from './+types/authGuard';
import { SidebarProvider } from '~/components/ui/sidebar';
import { AppSidebar } from '~/components/layout/appSideBar';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import { authService } from '~/services/auth.service';
import { toast } from 'sonner';
import { LayoutSpinner } from '~/components/shared/spinner/layoutSpinner';
import { useTranslation } from 'react-i18next';

import i18n from '~/lib/locales/i18n';

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const t = (key: string) => i18n.t(key, { ns: 'login' });
  let token = useBoundStore.getState().accessToken;
  const store = useBoundStore.getState();

  // Lose token in RAM but have cookie (httpOnly refresh token)
  if (!token) {
    const success = await silentRefreshToken();
    if (!success) {
      toast.error(t('toast.noLogin'));
      return redirect('/login');
    }
    token = useBoundStore.getState().accessToken;
  }

  // Check if has user in state -> check level
  if (store.user) {
    if (store.user.role?.level !== 0) {
      await authService.logout();
      store.logout();
      toast.error(t('toast.unauthorized'), { id: 'login-role-error' });
      return redirect('/login');
    }
    return null;
  }

  // Has token but hasn't user in state -> fetch and check level
  if (token && !store.user) {
    try {
      await store.fetchAccount();
      const currentUser = useBoundStore.getState().user;

      if (currentUser?.role?.level !== 0) {
        await authService.logout(); // call api to clear refresh token cookie
        store.logout(); // clear all state

        toast.error(t('toast.unauthorized'), { id: 'login-role-error' });
        return redirect('/login');
      }

      return null;
    } catch (error: any) {
      await authService.logout();
      store.logout();
      const errorMessage =
        error?.response?.data?.message || error?.message || t('toast.error');
      toast.error(`${errorMessage}`, { id: 'login-role-error' });
      return redirect('/login');
    }
  }

  return null; // pass
}

export function HydrateFallback() {
  return <LayoutSpinner />;
}

export default function AuthGuard() {
  const user = useBoundStore((state) => state.user);
  const isRefreshing = useBoundStore((state) => state.isRefreshToken);
  const isLoadingUser = useBoundStore((state) => state.isLoadingUser);
  const { isMobile } = useBreakpoint();

  // Only show overlay if is refreshing token but not first loading user (F5)
  //-> because logic loading user first that HydrateFallback have already worked
  const showOverlay = isRefreshing && !isLoadingUser;

  if (!user) {
    return <LayoutSpinner />; // if hasn't user (F5) -> load spinner
  }

  if (user.role?.level !== 0) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <h1>403 - Forbidden: Bạn không có quyền truy cập Dashboard</h1>
      </div>
    );
  }
  return (
    <>
      {showOverlay && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all'>
          <div className='bg-white p-4 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in zoom-in duration-200'>
            <Spinner className='size-6 text-primary' />
            <span className='text-sm font-medium text-slate-700'>
              Đang làm mới phiên làm việc...
            </span>
          </div>
        </div>
      )}

      <SidebarProvider>
        {!isMobile && <AppSidebar />}
        <Outlet />
      </SidebarProvider>
    </>
  );
}
