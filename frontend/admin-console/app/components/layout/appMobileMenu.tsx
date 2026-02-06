'use client';

import {
  ArchiveIcon,
  ArrowLeftIcon,
  BookUser,
  BriefcaseBusiness,
  CalendarPlusIcon,
  ChartBarStacked,
  ClockIcon,
  EarthLock,
  FilePlay,
  Film,
  LayoutDashboard,
  ListFilterIcon,
  LogOut,
  MailCheckIcon,
  MoreHorizontalIcon,
  ShieldUser,
  SquareChartGantt,
  SquareUserRound,
  TagIcon,
  Trash2Icon,
} from 'lucide-react';
import { ButtonGroup } from '../ui/button-group';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useBoundStore } from '~/store';
import { useLogout } from '~/hooks/auth/useLogout';
import { formatFullName } from '~/utils/common-utils';
import { useNavigate } from 'react-router';
import { modules, workspaces, type Item } from '~/types/app-types/sidebar';
import { useEffect, useState } from 'react';
import { AppThemeModeButton } from '../shared/button/appThemeModeButton';
import { useTranslation } from 'react-i18next';
import { ChangeLanguageSubMenu } from '../shared/menu/changeLanguageSubMenu';
import { Badge } from '../ui/badge';
import { cn } from '~/lib/utils';
import { UserAvatar } from '../shared/image/userAvatar';

interface AppMobileMenuProps {
  className?: string;
}
export function AppMobileMenu({ className }: AppMobileMenuProps) {
  const { t, i18n } = useTranslation('app');
  const currentLang = i18n.language;
  const user = useBoundStore((state) => state.account);
  const navigation = useNavigate();
  const { mutate: logout, isPending } = useLogout();
  const [activeModuleId, setActiveModuleId] = useState<string>('dashboard');

  const handleLogout = () => {
    logout();
  };

  const handSelectWorkspace = (workspace: Item) => {
    window.open(workspace.url, '_blank', 'noopener,noreferrer');
  };

  const handleModuleChange = (moduleId: string) => {
    const targetModule = modules.find((m) => m.id === moduleId);
    if (targetModule) {
      setActiveModuleId(moduleId);
      navigation(targetModule.url);
    }
  };

  const handleBackBtn = () => {
    if (window.history.length > 1) {
      navigation(-1);
    } else {
      navigation('/dashboard', { replace: true });
    }
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const foundModule = modules.find((m) =>
      currentPath.startsWith(`/${m.url}`),
    );

    if (foundModule) {
      setActiveModuleId(foundModule.id);
    }
  }, [location.pathname]);

  return (
    <ButtonGroup className={className}>
      <ButtonGroup>
        <Button
          variant='outline'
          size='icon'
          aria-label='Go Back'
          onClick={handleBackBtn}>
          <ArrowLeftIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              <BriefcaseBusiness />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-55' align='start'>
            <DropdownMenuLabel className='justify-center flex '>
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
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={activeModuleId}
              onValueChange={handleModuleChange}>
              {modules.map((mod) => (
                <DropdownMenuRadioItem value={mod.id}>
                  <mod.icon />
                  <span>{t(mod.title)}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              <SquareChartGantt />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='center' className='w-53'>
            <DropdownMenuLabel className='justify-center flex'>
              {t('sidebar.selectWorkspace.title')}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {workspaces.map((wp) => (
                <DropdownMenuItem
                  key={wp.id}
                  onClick={() => handSelectWorkspace(wp)}>
                  <wp.icon />
                  <span>{t(wp.title)}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant='outline'>
          <span className='w-[62px]'>{t('sidebar.management.setting')}</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon' aria-label='More Options'>
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-56'>
            <DropdownMenuGroup>
              <AppThemeModeButton />

              <ChangeLanguageSubMenu sideOffset={-124} />

              <DropdownMenuItem
                onClick={() => navigation(`/account/${user?._id}`)}>
                <UserAvatar
                  user={user}
                  className='border border-solid border-slate-200 !rounded-full max-w-6 max-h-6 min-w-4 min-h-4'
                />
                {formatFullName(user?.firstName, user?.lastName) || 'UNKNOWN'}
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant='destructive'
                onClick={handleLogout}
                disabled={isPending}
                className='flex justify-center'>
                <LogOut />
                {t('sidebar.logout')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  );
}
