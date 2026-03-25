import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Users,
  ShieldCheck,
  KeyRound,
  Clapperboard,
  Film,
  UsersRound,
  PlayCircle,
} from 'lucide-react';
import type { MainNav, Workspaces } from '@cinechat/types';

export const workspaces: Workspaces = [
  {
    id: 'cinechat-admin',
    name: 'CineChat Admin',
    logo: GalleryVerticalEnd,
    plan: 'Enterprise',
    url: '/dashboard',
    title: 'sidebar.selectWorkspace.admin',
  },
  {
    id: 'cinechat-user',
    name: 'CineChat User',
    logo: AudioWaveform,
    plan: 'Startup',
    url: 'http://localhost:3000',
    title: 'sidebar.selectWorkspace.user',
  },
];

export const mainNav: MainNav = [
  {
    id: 'dashboard',
    title: 'sidebar.dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    id: 'user-management',
    title: 'sidebar.userManagement.title',
    url: '#',
    icon: Users,
    items: [
      {
        id: 'users',
        title: 'sidebar.userManagement.users',
        url: '/dashboard/users',
        icon: UsersRound,
      },
      {
        id: 'roles',
        title: 'sidebar.userManagement.roles',
        url: '/dashboard/roles',
        icon: ShieldCheck,
      },
      {
        id: 'permissions',
        title: 'sidebar.userManagement.permissions',
        url: '/dashboard/permissions',
        icon: KeyRound,
      },
    ],
  },
  {
    id: 'content-management',
    title: 'sidebar.contentManagement.title',
    url: '#',
    icon: Clapperboard,
    items: [
      {
        id: 'movies',
        title: 'sidebar.contentManagement.movies',
        url: '/dashboard/movies',
        icon: Film,
      },
      {
        id: 'genres',
        title: 'sidebar.contentManagement.genres',
        url: '/dashboard/genres',
        icon: GalleryVerticalEnd,
      },
      {
        id: 'casts',
        title: 'sidebar.contentManagement.casts',
        url: '/dashboard/casts',
        icon: UsersRound,
      },
      {
        id: 'videos',
        title: 'sidebar.contentManagement.videos',
        url: '/dashboard/videos',
        icon: PlayCircle,
      },
    ],
  },
];
