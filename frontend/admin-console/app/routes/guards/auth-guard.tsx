import { Outlet, redirect } from 'react-router';
import type { Route } from './+types/auth-guard';
import { useBoundStore } from '~/store';
import { Spinner } from '~/components/ui/spinner';

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const store = useBoundStore.getState();
  const token = store.accessToken;
  const user = store.user;

  // Check token
  if (!token) {
    return redirect('/login');
  }

  // logic F5: Has Token but no User -> Re-fetch immediately
  if (!user) {
    try {
      await store.fetchAccount();

      // After fetching, if still no user -> throw error to logout
      if (!useBoundStore.getState().user) {
        throw new Error('User not found');
      }
    } catch (error) {
      // Token expired or User is invalid -> Logout & Redirect to Login
      store.logout();
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
  const isRefreshing = useBoundStore((state) => state.isRefreshToken);
  const isLoadingUser = useBoundStore((state) => state.isLoadingUser);

  // Logic: Chỉ hiện Overlay nếu đang Refresh Token MÀ KHÔNG PHẢI đang tải user lần đầu (F5)
  // Vì nếu đang tải user lần đầu thì HydrateFallback đã hiện rồi.
  const showOverlay = isRefreshing && !isLoadingUser;

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

      <Outlet />
    </>
  );
}
