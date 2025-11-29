import { Outlet, NavLink, useNavigate, Link } from 'react-router';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Film,
  Menu,
  ShoppingBag,
} from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';

// 1. Định nghĩa danh sách Menu
const navItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    end: true, // end=true để chỉ active khi đúng chính xác đường dẫn /dashboard
  },
  {
    title: 'Quản lý Users',
    href: '/dashboard/users',
    icon: Users,
    end: false,
  },
  {
    title: 'Quản lý Phim',
    href: '/dashboard/movies', // Giả sử bạn sẽ làm route này
    icon: Film,
    end: false,
  },
  {
    title: 'Cài đặt',
    href: '/dashboard/settings',
    icon: Settings,
    end: false,
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Xóa token
    localStorage.removeItem('accessToken');
    // 2. Chuyển về login
    navigate('/login');
  };

  return (
    <div className='flex h-screen w-full bg-slate-50 overflow-hidden'>
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className='hidden w-64 flex-col border-r bg-white md:flex'>
        {/* Logo Area */}
        <div className='flex h-16 items-center border-b px-6'>
          <Link
            to='/dashboard'
            className='flex items-center gap-2 font-bold text-xl text-primary'>
            <div className='flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white'>
              <Film size={18} />
            </div>
            <span>CineChat</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className='flex-1 overflow-y-auto py-4'>
          <nav className='grid gap-1 px-2'>
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                end={item.end} // Quan trọng để highlight đúng menu
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-slate-900',
                    isActive
                      ? 'bg-slate-900 text-white hover:bg-slate-900 hover:text-white'
                      : 'text-slate-500',
                  )
                }>
                <item.icon size={18} />
                {item.title}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer (User Info) */}
        <div className='border-t p-4'>
          <div className='flex items-center gap-3 mb-4'>
            <div className='h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold'>
              AD
            </div>
            <div className='flex flex-col'>
              <span className='text-sm font-medium'>Admin User</span>
              <span className='text-xs text-slate-500'>admin@cinechat.com</span>
            </div>
          </div>
          <Button
            variant='outline'
            className='w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200'
            onClick={handleLogout}>
            <LogOut size={16} />
            Đăng xuất
          </Button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className='flex flex-1 flex-col overflow-hidden'>
        {/* Header (Mobile Toggle + Breadcrumbs/Actions) */}
        <header className='flex h-16 items-center justify-between border-b bg-white px-6'>
          <div className='flex items-center gap-4'>
            {/* Nút Menu cho Mobile (Hiện tại chưa xử lý logic mở drawer, chỉ để icon) */}
            <Button variant='ghost' size='icon' className='md:hidden'>
              <Menu size={20} />
            </Button>
            <h1 className='text-lg font-semibold text-slate-800'>
              Admin Console
            </h1>
          </div>

          {/* Header Actions (Right side) */}
          <div className='flex items-center gap-2'>
            {/* Ví dụ nút thông báo hoặc dark mode có thể đặt ở đây */}
          </div>
        </header>

        {/* Content Scrollable Area */}
        <main className='flex-1 overflow-y-auto bg-slate-50 p-6'>
          {/* Container giới hạn độ rộng nội dung cho dễ nhìn */}
          <div className='mx-auto max-w-6xl'>
            {/* 👇 Đây là nơi nội dung các trang con (Dashboard, Users...) hiển thị */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
