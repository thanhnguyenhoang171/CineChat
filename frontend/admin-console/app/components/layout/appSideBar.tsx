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
import { useBreakpoint } from '~/hooks/layout/useBreakpoint';
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

import { useLogout } from '~/hooks/auth/useLogout';
import { formatFullName } from '~/utils/common-utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { modules, workspaces, type Item } from '~/types/app-types/sidebar';
import { useTranslation } from 'react-i18next';
import { AppThemeModeButton } from '../shared/button/appThemeModeButton';
import { ChangeLanguageSubMenu } from '../shared/menu/changeLanguageSubMenu';
import { UserAvatar } from '../shared/image/userAvatar';
import { Badge } from '../ui/badge';

export function AppSidebar() {
  const { t, i18n } = useTranslation('app');
  const currentLang = i18n.language;
  const { isDesktop, isTablet } = useBreakpoint();
  const navigation = useNavigate();
  const user = useBoundStore((state) => state.account);
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
          <SidebarGroupLabel>
            <Badge
              className={cn(
                'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300s w-full flex justify-center items-center',
                user?.role?.level === 0 &&
                  'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
              )}>
              {t('sidebar.management.title', {
                var:
                  currentLang === 'vi'
                    ? user?.role.level === 0
                      ? 'QUẢN TRỊ'
                      : 'QUẢN LÝ'
                    : user?.role.level === 0
                      ? 'ADMIN'
                      : 'MANAGER',
              })}
            </Badge>
          </SidebarGroupLabel>
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
                <UserAvatar user={user} />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side='top'
              className='w-[--radix-popper-anchor-width]'>
              <DropdownMenuItem
                onClick={() => navigation(`/account/${user?._id}`)}>
                <ContactRound />
                <span>{t('sidebar.management.account')}</span>
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
                      <UserAvatar user={user} />

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
                  <DropdownMenuItem
                    onClick={() => navigation(`/account/${user?._id}`)}>
                    <ContactRound />
                    <span>{t('sidebar.management.account')}</span>
                  </DropdownMenuItem>

                  <ChangeLanguageSubMenu sideOffset={5} />

                  <AppThemeModeButton />

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant='destructive'
                    onClick={handleLogout}>
                    <LogOut />
                    {isPending ? (
                      <span>{t('sidebar.loggingout')}</span>
                    ) : (
                      <span>{t('sidebar.logout')}</span>
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
