import { Outlet, redirect } from 'react-router';

import { useBoundStore } from '~/store';
import { Spinner } from '~/components/ui/spinner';
import { silentRefreshToken } from '~/helpers/silent-refresh-token';
import type { Route } from './+types/authGuard';
import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import { AppSidebar } from '~/components/layout/appSideBar';

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  let token = useBoundStore.getState().accessToken;

  // case 1: lose token in RAM but have cookie (httpOnly refresh token)
  if (!token) {
    const success = await silentRefreshToken();
    if (success) {
      token = useBoundStore.getState().accessToken;
    } else {
      return redirect('/login');
    }
  }

  //case 2: have token in RAM but haven't user info yet -> fetch user info
  if (token && !useBoundStore.getState().user) {
    try {
      await useBoundStore.getState().fetchAccount();

      // After fetching user info, double check if user is valid
      if (!useBoundStore.getState().user) {
        throw new Error('No user info after fetching account');
      }
    } catch (error) {
      // Token invalid or user is blocked/deleted
      useBoundStore.getState().logout();
      return redirect('/login');
    }
    return null; //case 3: have token and have user info --> allow access
  }
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

  // Logic: Chỉ hiện Overlay nếu đang Refresh Token MÀ KHÔNG PHẢI đang tải user lần đầu (F5)
  // Vì nếu đang tải user lần đầu thì HydrateFallback đã hiện rồi.
  const showOverlay = isRefreshing && !isLoadingUser;

  // 👇 THÊM LOGIC MỚI: CHẶN CỬA
  // Nếu chưa có User (do đang F5 load lại) -> Hiện Spinner xoay xoay
  // KHÔNG render <Outlet /> để tránh các component con chạy useQuery lung tung
  if (!user) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-slate-50'>
        <Spinner className='size-10 text-primary' />
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
        <AppSidebar/>
        <SidebarTrigger />
        <Outlet />
      </SidebarProvider>
    </>
  );
}
