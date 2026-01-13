import {
  BookUser,
  ChartBarStacked,
  ChevronsLeftRightEllipsis,
  DatabaseZap,
  EarthLock,
  FilePlay,
  Film,
  LayoutDashboard,
  ListEnd,
  ShieldUser,
  SquareUserRound,
  type LucideIcon,
} from 'lucide-react';
import { env } from '~/lib/env';

export interface Item {
  id: string;
  title: string;
  url: string;
  icon: LucideIcon;
}

// Menu items.
export const modules: Item[] = [
  {
    id: 'dashboard',
    title: 'sidebar.management.dashboard',
    url: 'dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'users',
    title: 'sidebar.management.user',
    url: 'users',
    icon: SquareUserRound,
  },
  {
    id: 'roles',
    title: 'sidebar.management.role',
    url: 'roles',
    icon: ShieldUser,
  },
  {
    id: 'permissions',
    title: 'sidebar.management.permission',
    url: 'permissions',
    icon: EarthLock,
  },
  {
    id: 'casts',
    title: 'sidebar.management.cast',
    url: 'casts',
    icon: BookUser,
  },
  {
    id: 'genres',
    title: 'sidebar.management.genre',
    url: 'genres',
    icon: ChartBarStacked,
  },
  {
    id: 'movies',
    title: 'sidebar.management.movie',
    url: 'movies',
    icon: Film,
  },
  {
    id: 'videos',
    title: 'sidebar.management.video',
    url: 'videos',
    icon: FilePlay,
  },
];

export const workspaces: Item[] = [
  {
    id: 'api-docs',
    title: 'sidebar.selectWorkspace.apiDocs',
    url: `${env.apiUrl}/docs`,
    icon: ChevronsLeftRightEllipsis,
  },
  {
    id: 'bullmq',
    title: 'sidebar.selectWorkspace.bullMQ',
    url: '#',
    icon: ListEnd,
  },
  {
    id: 'redis',
    title: 'sidebar.selectWorkspace.redis',
    url: '#',
    icon: DatabaseZap,
  },
];
