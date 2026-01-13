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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useBoundStore } from '~/store';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { useLogout } from '~/hooks/useLogout';
import { formatFullName } from '~/utils/common-utils';
import { useNavigate } from 'react-router';
import { modules, workspaces, type Item } from '~/types/app-types/sidebar';
import { useEffect, useState } from 'react';
import { AppThemeModeButton } from '../shared/button/appThemeModeButton';
import { useTranslation } from 'react-i18next';
import { ChangeLanguageSubMenu } from '../shared/menu/changeLanguageSubMenu';

interface AppMobileMenuProps {
  className?: string;
}
export function AppMobileMenu({ className }: AppMobileMenuProps) {
  const { t } = useTranslation('app');
  const user = useBoundStore((state) => state.user);
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
              <span>{t('sidebar.management.title')}</span>
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
          <span className='w-[62px]'>{t('sidebar.management.account')}</span>
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

              <DropdownMenuItem>
                <Avatar className='border border-solid border-slate-200 !rounded-full max-w-6 max-h-6 min-w-4 min-h-4'>
                  <AvatarImage src='https://lh3.googleusercontent.com/a/ACg8ocJ-7KsPVQsHPL3_pfOwrLP1rHD-p3zDLzJPbYthya_9ZkfORA=s96-c' />
                  <AvatarFallback>{'U'.toUpperCase()}</AvatarFallback>
                </Avatar>
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
