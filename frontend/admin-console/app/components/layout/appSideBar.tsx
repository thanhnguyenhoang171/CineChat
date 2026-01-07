import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Home,
  Inbox,
  Search,
  Settings,
  User2,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '../ui/sidebar';
import { cn } from '~/lib/utils';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { env } from '~/lib/env';
import type { User } from '~/types/user';
import { useBoundStore } from '~/store';

import { useLogout } from '~/hooks/useLogout';
import { formatFullName } from '~/utils/common-utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: Search,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar() {
  const { isMobile, isDesktop, isTablet } = useBreakpoint();
  const user = useBoundStore((state) => state.user);
  const { mutate: logout, isPending } = useLogout();
  const { open } = useSidebar();

  const handleLogout = () => {
    logout(); 
  };

  return (
    <Sidebar
      collapsible='icon'
      variant={`${isDesktop ? 'sidebar' : isTablet ? 'floating' : 'inset'}`}>
      <SidebarHeader className={cn(!open && 'hidden')}>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Select Workspace
                  <ChevronDown className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[--radix-popper-anchor-width]'>
                <DropdownMenuItem>
                  <a href={`${env.apiUrl}/docs`}>API Documentations</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href='#'>BullMQ Dashboard</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href='#'>Redis Dashboard</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ADMIN CONSOLE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={cn(!open && 'items-center justify-center')}>
        {!open ? (
          <Avatar className={cn('object-cover')}>
            <AvatarImage
              src={user?.picture}
              alt={`${user?.firstName || 'User'} avatar`}
            />
            <AvatarFallback>
              {(user?.firstName?.[0] || 'A').toUpperCase()}
              {(user?.lastName?.[0] || '').toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <div className='flex items-center gap-3'>
                      {/* Avatar Component */}
                      <Avatar className={cn('object-cover')}>
                        <AvatarImage
                          src={user?.picture}
                          alt={`${user?.firstName || 'User'} avatar`}
                        />
                        <AvatarFallback>
                          {(user?.firstName?.[0] || 'A').toUpperCase()}
                          {(user?.lastName?.[0] || '').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className='flex flex-col overflow-hidden'>
                        <span className='text-sm font-semibold text-slate-700 truncate'>
                          {formatFullName(user?.firstName, user?.lastName) ||
                            'UNKNOWN'}
                        </span>
                        <span
                          className='text-xs text-slate-500 truncate'
                          title={user?.email}>
                          {user?.email || 'admin@cinechat.com'}
                        </span>
                      </div>
                    </div>

                    <ChevronUp className='ml-auto' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side='top'
                  className='w-[--radix-popper-anchor-width]'>
                  <DropdownMenuItem>
                    <a href='#'>Tài khoản</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {isPending ? (
                      <span>Đang đăng xuất...</span>
                    ) : (
                      <span onClick={handleLogout}>Đăng xuất</span>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
