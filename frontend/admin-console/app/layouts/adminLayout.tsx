import { Outlet, NavLink, Link, redirect, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Film,
  Menu,
  Loader2,
} from 'lucide-react';
import { useState } from 'react';
import { useBoundStore } from '~/store';
import { useLogout } from '~/hooks/useLogout';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

const navItems = [
  // 👇 Sửa href cho ngắn gọn, khớp với route config bên dưới
  { title: 'Overview', href: '/dashboard', icon: LayoutDashboard, end: true },
  { title: 'Quản lý Users', href: '/dashboard/users', icon: Users, end: false },
  { title: 'Quản lý Phim', href: '/dashboard/movies', icon: Film, end: false },
];

export default function AdminLayout() {
  // 👇 4. Lấy User từ Store để UI tự động cập nhật (Reactive)
  const user = useBoundStore((state) => state.user);

  const { mutate: logout, isPending } = useLogout(); // Giả sử dùng React Query
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Component con render Link (Tái sử dụng)
  const renderNavLinks = () => (
    <nav className='grid gap-1 px-2'>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.href}
          end={item.end}
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
            )
          }>
          <item.icon size={18} />
          {item.title}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className='flex h-screen w-full bg-slate-50 overflow-hidden'>
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className='hidden w-64 flex-col border-r bg-white md:flex shadow-sm z-10'>
        <div className='flex h-16 items-center border-b px-6'>
          <Link
            to='/admin/dashboard'
            className='flex items-center gap-2 font-bold text-xl text-slate-900'>
            <div className='flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white'>
              <Film size={18} />
            </div>
            <span>CineChat</span>
          </Link>
        </div>

        <div className='flex-1 overflow-y-auto py-4'>{renderNavLinks()}</div>

        {/* User Info Footer */}
        <div className='border-t p-4 bg-slate-50/50'>
          <div className='flex items-center gap-3 mb-4'>
            {/* Avatar chữ cái đầu */}
            <img
              src={user?.picture}
              alt={`${user?.firstName || 'User'} avatar`}
              className='h-9 w-9 rounded-full border border-blue-200 shadow-sm object-cover'
            />
            <div className='flex flex-col overflow-hidden'>
              <span className='text-sm font-semibold text-slate-700 truncate'>
                {user?.firstName || 'Admin User'}
              </span>
              <span
                className='text-xs text-slate-500 truncate'
                title={user?.email}>
                {user?.email || 'admin@cinechat.com'}
              </span>
            </div>
          </div>

          <Button
            variant='outline'
            className='w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200'
            onClick={() => logout()}
            disabled={isPending}>
            {isPending ? (
              <Loader2 size={16} className='animate-spin' />
            ) : (
              <LogOut size={16} />
            )}
            {isPending ? 'Đang thoát...' : 'Đăng xuất'}
          </Button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        <header className='flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm'>
          <div className='flex items-center gap-4'>
            {/* --- MOBILE MENU --- */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className='md:hidden -ml-2'>
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-64 p-0'>
                <SheetHeader className='border-b h-16 flex items-center justify-center px-6'>
                  <SheetTitle className='flex items-center gap-2 font-bold text-xl'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white'>
                      <Film size={18} />
                    </div>
                    CineChat
                  </SheetTitle>
                </SheetHeader>
                <div className='py-4'>{renderNavLinks()}</div>
              </SheetContent>
            </Sheet>

            {/* Breadcrumb Title */}
            <h1 className='text-lg font-semibold text-slate-800 capitalize'>
              {location.pathname.split('/').pop()?.replace(/-/g, ' ') ||
                'Overview'}
            </h1>
          </div>
        </header>

        <main className='flex-1 overflow-y-auto bg-slate-50 p-6'>
          <div className='mx-auto max-w-6xl animate-in fade-in duration-500'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
