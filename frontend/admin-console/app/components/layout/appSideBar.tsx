import {
  EarthLock,
  ChevronDown,
  ChevronUp,
  ShieldUser,
  LayoutDashboard,
  BookUser,
  SquareUserRound,
  ChartBarStacked,
  Film,
  FilePlay,
  ChevronsLeftRightEllipsis,
  ListEnd,
  DatabaseZap,
  LogOut,
  ContactRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
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
  SidebarTrigger,
  useSidebar,
} from '../ui/sidebar';
import { cn } from '~/lib/utils';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { env } from '~/lib/env';
import type { User } from '~/types/module-types/user';
import { useBoundStore } from '~/store';

import { useLogout } from '~/hooks/useLogout';
import { formatFullName } from '~/utils/common-utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router';
import { modules, workspaces, type Item } from '~/types/app-types/sidebar';

export function AppSidebar() {
  const { isMobile, isDesktop, isTablet } = useBreakpoint();
  const navigation = useNavigate();
  const user = useBoundStore((state) => state.user);
  const { mutate: logout, isPending } = useLogout();
  const { open } = useSidebar();

  const [selectedModule, setSelectedModule] = useState<Item | null>(null);

  const handleLogout = () => {
    logout();
  };

  const handSelectWorkspace = (workspace: Item) => {
    window.open(workspace.url, '_blank', 'noopener,noreferrer');
  };

  const handSelectModule = (module: Item) => {
    setSelectedModule(module);
    navigation(module.url);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedModule = modules.find((module) => {
      return (
        currentPath === module.url || currentPath.startsWith('/' + module.url)
      );
    });

    if (matchedModule) {
      setSelectedModule(matchedModule);
    }
  }, [location.pathname]);

  return (
    <Sidebar
      collapsible='icon'
      variant={`${isDesktop ? 'sidebar' : isTablet ? 'floating' : 'inset'}`}>
      <SidebarHeader className={cn(!open && 'items-center')}>
        <SidebarTrigger className={cn(open && 'hidden')} />
        <SidebarMenu className={cn(!open && 'hidden')}>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  Select Workspace
                  <ChevronDown className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[--radix-popper-anchor-width]'>
                {workspaces.map((workspace) => (
                  <DropdownMenuItem
                    key={workspace.id}
                    onClick={() => handSelectWorkspace(workspace)}>
                    <workspace.icon />
                    <span>{workspace.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className={cn(!open && 'justify-center')}>
        <SidebarGroup>
          <SidebarGroupLabel>ADMIN CONSOLE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className={cn(!open && 'items-center')}>
              {modules.map((modules) => (
                <SidebarMenuItem
                  key={modules.id}
                  onClick={() => handSelectModule(modules)}>
                  <SidebarMenuButton
                    asChild
                    isActive={!!(modules === selectedModule)}>
                    <div>
                      <modules.icon />
                      <span>{modules.title}</span>
                    </div>
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
                <DropdownMenuTrigger
                  asChild
                  className={cn(open && 'pt-5 pb-5')}>
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
                      </div>
                    </div>
                    <ChevronUp className='ml-auto flex justify-end' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side='top'
                  className='w-[--radix-popper-anchor-width]'>
                  <DropdownMenuItem>
                    <ContactRound />
                    <Link to='#'>Tài khoản</Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant='destructive'>
                    <LogOut />
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
