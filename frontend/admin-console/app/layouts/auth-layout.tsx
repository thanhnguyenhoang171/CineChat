import { Outlet, redirect } from 'react-router';
import type { Route } from './+types/auth-layout'; // Auto-generated type

// 👇 LOGIC: Kiểm tra nếu đã đăng nhập thì không cho vào trang Auth nữa
export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const token = localStorage.getItem('accessToken');
  if (token) {
    // Nếu có token, đá sang dashboard ngay
    return redirect('/dashboard');
  }
  return null;
}

export default function AuthLayout() {
  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-slate-50'>
      <Outlet />
    </div>
  );
}
