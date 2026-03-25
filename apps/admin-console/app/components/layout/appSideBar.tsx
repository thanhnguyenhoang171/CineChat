import {
  ChevronDown,
  ChevronUp,
  LogOut,
  ContactRound,
  MoreHorizontal,
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
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  type Category,
  type Item,
  type Workspace,
} from '@cinechat/types';
import { mainNav, workspaces } from '~/constants/common-constant';
import { useTranslation } from 'react-i18next';
import { AppThemeModeButton } from '../shared/button/AppThemeModeButton';
import { ChangeLanguageSubMenu } from '../shared/menu/changeLanguageSubMenu';
import { UserAvatar } from '../shared/image/userAvatar';
import { Badge } from '../ui/badge';

export function AppSidebar({ id }: { id?: string }) {
  const { t, i18n } = useTranslation('app');
  const currentLang = i18n.language;
  const { isDesktop, isTablet } = useBreakpoint();
  const location = useLocation();
  const navigation = useNavigate();
  const user = useBoundStore((state) => state.account);
  const { mutate: logout, isPending } = useLogout();
  const { open, setOpen } = useSidebar();

  const [selectedModule, setSelectedModule] = useState<Item | null>(null);

  const allModules = useMemo(() => {
    const items: Item[] = [];
    mainNav.forEach((navItem) => {
      if ('items' in navItem && navItem.items) {
        items.push(...(navItem.items as Item[]));
      } else {
        items.push(navItem as Item);
      }
    });
    return items;
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handSelectWorkspace = (workspace: any) => {
    window.open(workspace.url, '_blank', 'noopener,noreferrer');
  };

  const handSelectModule = (module: Item) => {
    setSelectedModule(module);
    setOpen(false);
    navigation(module.url);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    let activeItem: Item | null = null;

    for (const navItem of mainNav) {
      const item = navItem as any;
      if (item.url && item.url !== '#') {
        // It's a standalone Item
        if (currentPath.startsWith(`/${item.url}`)) {
          activeItem = item;
          break;
        }
      } else if (item.items) {
        // It's a Category
        const foundItem = item.items.find((subItem: any) =>
          currentPath.startsWith(`/${subItem.url}`),
        );
        if (foundItem) {
          activeItem = foundItem;
          break;
        }
      }
    }
    setSelectedModule(activeItem);
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
        <SidebarMenu className={cn(!open && 'items-center')}>
          {open ? (
            mainNav.map((navItem) => {
              // Type guard to check if it's a Category
              if ('items' in navItem) {
                const category = navItem as Category;
                return (
                  <SidebarGroup key={category.id}>
                    <SidebarGroupLabel>{t(category.title)}</SidebarGroupLabel>
                    <SidebarGroupContent>
                      {category.items?.map((item) => (
                        <SidebarMenuItem
                          key={item.id}
                          onClick={() => handSelectModule(item)}>
                          <SidebarMenuButton
                            asChild
                            isActive={!!(item.id === selectedModule?.id)}>
                            <div>
                              <item.icon />
                              <span>{t(item.title)}</span>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarGroupContent>
                  </SidebarGroup>
                );
              }
              // It's a standalone Item
              const item = navItem as Item;
              return (
                <SidebarMenuItem
                  key={item.id}
                  onClick={() => handSelectModule(item)}>
                  <SidebarMenuButton
                    asChild
                    isActive={!!(item.id === selectedModule?.id)}>
                    <div>
                      <item.icon />
                      <span>{t(item.title)}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })
          ) : (
            <>
              {allModules.slice(0, 5).map((item) => (
                <SidebarMenuItem
                  key={item.id}
                  onClick={() => handSelectModule(item)}>
                  <SidebarMenuButton
                    tooltip={t(item.title)}
                    isActive={!!(item.id === selectedModule?.id)}>
                    <item.icon />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {allModules.length > 5 && (
                <SidebarMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton tooltip={t('app:button.more')}>
                        <MoreHorizontal />
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side='right' align='center'>
                      {allModules.slice(5).map((item) => (
                        <DropdownMenuItem
                          key={item.id}
                          onClick={() => handSelectModule(item)}
                          className={cn(
                            item.id === selectedModule?.id && 'bg-accent',
                          )}>
                          <item.icon className='mr-2 h-4 w-4' />
                          <span>{t(item.title)}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              )}
            </>
          )}
        </SidebarMenu>
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
                <span>{t('sidebar.account')}</span>
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
                    <span>{t('sidebar.account')}</span>
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

