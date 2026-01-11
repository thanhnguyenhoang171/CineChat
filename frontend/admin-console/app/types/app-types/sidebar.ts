import { BookUser, ChartBarStacked, ChevronsLeftRightEllipsis, DatabaseZap, EarthLock, FilePlay, Film, LayoutDashboard, ListEnd, ShieldUser, SquareUserRound, type LucideIcon } from "lucide-react";
import { env } from "~/lib/env";

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
    title: 'Dashboard',
    url: 'dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'users',
    title: 'User Management',
    url: 'users',
    icon: SquareUserRound,
  },
  {
    id: 'roles',
    title: 'Role Management',
    url: 'roles',
    icon: ShieldUser,
  },
  {
    id: 'permissions',
    title: 'Permission Management',
    url: 'permissions',
    icon: EarthLock,
  },
  {
    id: 'casts',
    title: 'Cast Management',
    url: 'casts',
    icon: BookUser,
  },
  {
    id: 'genres',
    title: 'Genre Management',
    url: 'genres',
    icon: ChartBarStacked,
  },
  {
    id: 'movies',
    title: 'Movie Management',
    url: 'movies',
    icon: Film,
  },
  {
    id: 'videos',
    title: 'Video Management',
    url: 'videos',
    icon: FilePlay,
  },
];

export const workspaces: Item[] = [
  {
    id: 'api-docs',
    title: 'API Documentations',
    url: `${env.apiUrl}/docs`,
    icon: ChevronsLeftRightEllipsis,
  },
  {
    id: 'bullmq',
    title: 'BullMQ Dashboard',
    url: '#',
    icon: ListEnd,
  },
  {
    id: 'redis',
    title: 'Redis Dashboard',
    url: '#',
    icon: DatabaseZap,
  },
];
