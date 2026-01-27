import { redirect } from 'react-router';
import type { Route } from './+types/_index';
import { useBoundStore } from '~/store';
import { silentRefreshToken } from '~/helpers/silent-refresh-token'; // Import hàm này

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const store = useBoundStore.getState();
  let token = store.accessToken;

  // 1. Nếu không có token trong RAM (do F5), thử lấy lại từ Cookie
  if (!token) {
    const success = await silentRefreshToken();
    if (success) {
      // Nếu refresh thành công, lấy lại token mới từ store
      token = useBoundStore.getState().accessToken;
    }
  }

  // 2. Kiểm tra kết quả cuối cùng
  if (token) {
    return redirect('/dashboard');
  }

  return redirect('/login');
}

export function hydrateFallback() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900'></div>
    </div>
  );
}

export default function Index() {
  return null;
}
