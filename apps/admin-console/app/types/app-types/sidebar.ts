import {
  BookUser,
  BrainCircuit,
  ChartBarStacked,
  ChevronsLeftRightEllipsis,
  Crown,
  DatabaseZap,
  EarthLock,
  FilePlay,
  Film,
  GalleryHorizontalEnd,
  LayoutDashboard,
  LayoutGrid,
  ListEnd,
  MessageCircle,
  ShieldUser,
  SquareUserRound,
  Star,
  TicketPercent,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { env } from '~/lib/env';

export interface Item {
  id: string;
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface Category {
  id: string;
  title: string;
  items: Item[];
}

export const mainNav: (Item | Category)[] = [
  {
    id: 'dashboard',
    title: 'sidebar.dashboard',
    url: 'dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'auth',
    title: 'sidebar.auth.title',
    items: [
      {
        id: 'users',
        title: 'sidebar.auth.user',
        url: 'users',
        icon: SquareUserRound,
      },
      {
        id: 'roles',
        title: 'sidebar.auth.role',
        url: 'roles',
        icon: ShieldUser,
      },
      {
        id: 'permissions',
        title: 'sidebar.auth.permission',
        url: 'permissions',
        icon: EarthLock,
      },
    ],
  },
  {
    id: 'system',
    title: 'sidebar.system.title',
    items: [
      {
        id: 'casts',
        title: 'sidebar.system.cast',
        url: 'casts',
        icon: BookUser,
      },
      {
        id: 'genres',
        title: 'sidebar.system.genre',
        url: 'genres',
        icon: ChartBarStacked,
      },
      {
        id: 'movies',
        title: 'sidebar.system.movie',
        url: 'movies',
        icon: Film,
      },
      {
        id: 'videos',
        title: 'sidebar.system.video',
        url: 'videos',
        icon: FilePlay,
      },
    ],
  },
  {
    id: 'planAndBilling',
    title: 'sidebar.planAndBilling.title',
    items: [
      {
        id: 'coupons',
        title: 'sidebar.planAndBilling.coupon',
        url: 'coupons',
        icon: TicketPercent,
      },
      {
        id: 'subscriptions',
        title: 'sidebar.planAndBilling.subscription',
        url: 'subscriptions',
        icon: Crown,
      },
      {
        id: 'user-subscriptions',
        title: 'sidebar.planAndBilling.userSubscription',
        url: 'user-subscriptions',
        icon: Users,
      },
    ],
  },
  {
    id: 'cms',
    title: 'sidebar.cms.title',
    items: [
      {
        id: 'banners',
        title: 'sidebar.cms.banner',
        url: 'banners',
        icon: GalleryHorizontalEnd,
      },
      {
        id: 'home-sections',
        title: 'sidebar.cms.homeSection',
        url: 'home-sections',
        icon: LayoutGrid,
      },
    ],
  },
  {
    id: 'movieReview',
    title: 'sidebar.movieReview.title',
    items: [
      {
        id: 'reviews',
        title: 'sidebar.movieReview.reviews',
        url: 'reviews',
        icon: Star,
      },
    ],
  },
  {
    id: 'ai',
    title: 'sidebar.ai.title',
    items: [
      {
        id: 'ai-usage',
        title: 'sidebar.ai.usage',
        url: 'ai-usage',
        icon: BrainCircuit,
      },
      {
        id: 'chat',
        title: 'sidebar.ai.chat',
        url: 'chat',
        icon: MessageCircle,
      },
    ],
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
