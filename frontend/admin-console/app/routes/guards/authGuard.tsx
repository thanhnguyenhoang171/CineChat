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

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  let token = useBoundStore.getState().accessToken;
  const store = useBoundStore.getState();

  // case 1: lose token in RAM but have cookie (httpOnly refresh token)
  if (!token) {
    const success = await silentRefreshToken();
    if (!success) {
      toast.error('Vui lòng đăng nhập để tiếp tục.');
      return redirect('/login');
    }
    token = useBoundStore.getState().accessToken;
  }

  // Kiểm tra nếu đã có user
  if (store.user) {
    if (store.user.role?.level !== 0) {
      await authService.logout(); // call api to clear refresh token cookie
      store.logout(); // clear all state
      toast.error(
        'Tài khoản không có quyền truy cập vào trang quản trị hệ thống',
        { id: 'login-role-error' },
      );
      return redirect('/login');
    }
    return null;
  }

  // case 2: fetch user info
  if (token && !store.user) {
    try {
      await store.fetchAccount();
      const currentUser = useBoundStore.getState().user;

      if (currentUser?.role?.level !== 0) {
        await authService.logout(); // call api to clear refresh token cookie
        store.logout(); // clear all state

        toast.error(
          'Tài khoản không có quyền truy cập vào trang quản trị hệ thống',
          { id: 'login-role-error' },
        );
        return redirect('/login');
      }

      return null;
    } catch (error) {
      await authService.logout(); // call api to clear refresh token cookie
      store.logout(); // clear all state

      toast.error(
        'Tài khoản không có quyền truy cập vào trang quản trị hệ thống',
        { id: 'login-role-error' },
      );
      return redirect('/login');
    }
  }

  return null;
}

export function HydrateFallback() {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-slate-50'>
      <div className='flex flex-col items-center gap-4'>
        <Spinner className='size-10 text-primary' />
        <p className='text-sm text-slate-500 font-medium'>
          Đang tải dữ liệu...
        </p>
      </div>
    </div>
  );
}

// Loading when Refresh Token)
export default function AuthGuard() {
  const user = useBoundStore((state) => state.user);
  const isRefreshing = useBoundStore((state) => state.isRefreshToken);
  const isLoadingUser = useBoundStore((state) => state.isLoadingUser);
  const { isMobile } = useBreakpoint();

  // Logic: Chỉ hiện Overlay nếu đang Refresh Token MÀ KHÔNG PHẢI đang tải user lần đầu (F5)
  // Vì nếu đang tải user lần đầu thì HydrateFallback đã hiện rồi.
  const showOverlay = isRefreshing && !isLoadingUser;

  // Nếu chưa có User (do đang F5 load lại) -> Hiện Spinner xoay xoay
  // KHÔNG render <Outlet /> để tránh các component con chạy useQuery lung tung
  if (!user) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-slate-50'>
        <Spinner className='size-10 text-primary' />
      </div>
    );
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
