import {
  ChevronDown,
  ChevronUp,
  LogOut,
  ContactRound,
  Globe,
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useBoundStore } from '~/store';

import { useLogout } from '~/hooks/useLogout';
import { formatFullName } from '~/utils/common-utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { modules, workspaces, type Item } from '~/types/app-types/sidebar';
import { useTranslation } from 'react-i18next';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { AppThemeModeButton } from '../shared/button/appThemeModeButton';
import { ChangeLanguageSubMenu } from '../shared/menu/changeLanguageSubMenu';

export function AppSidebar() {
  const { t } = useTranslation('app');
  const { isDesktop, isTablet } = useBreakpoint();
  const navigation = useNavigate();
  const user = useBoundStore((state) => state.user);
  const { mutate: logout, isPending } = useLogout();
  const { open, setOpen } = useSidebar();

  const [selectedModule, setSelectedModule] = useState<Item | null>(null);

  const handleLogout = () => {
    logout();
  };

  const handSelectWorkspace = (workspace: Item) => {
    window.open(workspace.url, '_blank', 'noopener,noreferrer');
  };

  const handSelectModule = (module: Item) => {
    setSelectedModule(module);
    setOpen(false);
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
                  {t('sidebar.selectWorkspace.title')}
                  <ChevronDown className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-[--radix-popper-anchor-width]'>
                {workspaces.map((workspace) => (
                  <DropdownMenuItem
                    key={workspace.id}
                    onClick={() => handSelectWorkspace(workspace)}>
                    <workspace.icon />
                    <span>{t(workspace.title)}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className={cn(!open && 'justify-center')}>
        <SidebarGroup>
          <SidebarGroupLabel>{t('sidebar.management.title')}</SidebarGroupLabel>
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
                      <span>{t(modules.title)}</span>
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
          <DropdownMenu>
            <DropdownMenuTrigger
              className='flex justify-center items-center'
              asChild>
              <SidebarMenuButton>
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
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side='top'
              className='w-[--radix-popper-anchor-width]'>
              <DropdownMenuItem>
                <ContactRound />
                <Link to='#'>{t('sidebar.management.account')}</Link>
              </DropdownMenuItem>

              <ChangeLanguageSubMenu sideOffset={5} />

              <AppThemeModeButton />

              <DropdownMenuSeparator />
              <DropdownMenuItem variant='destructive'>
                <LogOut />
                {isPending ? (
                  <span>{t('sidebar.loggingout')}</span>
                ) : (
                  <span onClick={handleLogout}>{t('sidebar.logout')}</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
                    <Link to='#'>{t('sidebar.management.account')}</Link>
                  </DropdownMenuItem>

                  <ChangeLanguageSubMenu sideOffset={5} />

                  <AppThemeModeButton />

                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant='destructive'>
                    <LogOut />
                    {isPending ? (
                      <span>{t('sidebar.loggingout')}</span>
                    ) : (
                      <span onClick={handleLogout}>{t('sidebar.logout')}</span>
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
