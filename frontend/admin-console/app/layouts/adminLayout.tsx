import { Outlet, NavLink, Link, redirect, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Users,
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

export default function AdminLayout() {
  const user = useBoundStore((state) => state.user);

  const { mutate: logout, isPending } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <main className='flex-1 overflow-y-auto bg-slate-50 p-6'>
      <div className='mx-auto max-w-6xl animate-in fade-in duration-500'>
        <Outlet />
      </div>
    </main>
  );
}
