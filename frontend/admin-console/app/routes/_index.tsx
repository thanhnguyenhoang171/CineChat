import { redirect } from 'react-router';
import type { Route } from './+types/_index';

// 1. Dùng clientLoader để chạy logic này ở phía trình duyệt
// (Vì localStorage không tồn tại ở phía Server)
export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  // Kiểm tra token trong localStorage
  // (Key 'accessToken' phải khớp với key bạn lưu lúc login)
  const token = localStorage.getItem('accessToken');

  if (token) {
    // Nếu có token -> Đá sang Dashboard
    return redirect('/dashboard');
  }

  // Nếu không có token -> Đá về trang Login
  return redirect('/login');
}

// Cấu hình hydration để báo React Router dùng clientLoader
export function hydrateFallback() {
  // Hiển thị loading trong lúc đang check token (rất nhanh)
  return (
    <div className='min-h-screen flex items-center justify-center'>
      Loading...
    </div>
  );
}

export default function Index() {
  // Component này thực tế sẽ không bao giờ được nhìn thấy lâu
  // vì loader đã redirect đi chỗ khác rồi.
  return null;
}
