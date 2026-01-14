import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';

import type { Route } from './+types/root';
import './styles/app-style.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query-client';
import NotFoundPage from './routes/notFound';
import { GeneralError } from './components/shared/error/generalError';
import { SonnerToasterComponent } from './components/ui/sonnerToaster';
import i18n from './lib/locales/i18n';
import { getLocaleFromRequest } from './utils/i18n-server';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

// Disable indexing by search engines (SEO)
export const meta: Route.MetaFunction = ({ location }) => {
  const title = 'CineChat Admin - Quản trị hệ thống';
  const description = 'Hệ thống quản lý phim và người dùng tích hợp AI.';

  const domain = import.meta.env.VITE_APP_URL || 'http://localhost:5173';
  const image = `${domain}/social-preview.jpg`;

  return [
    { title },
    { name: 'description', content: description },

    // --- Open Graph (Facebook, Zalo, Discord) ---
    { property: 'og:site_name', content: 'CineChat Admin Console' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${domain}${location.pathname}` },

    // Disable SEO bot
    { name: 'robots', content: 'noindex, nofollow, noarchive' },
  ];
};
export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromRequest(request);
  return { locale }; // Return lang for client
}

export function Layout({ children }: { children: React.ReactNode }) {
  // Get locale from Server sent
  const { locale } = useLoaderData<typeof loader>();

  // Sync lang -> if current lang != server lang

  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  return (
    <html lang={locale ?? 'vi'}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <SonnerToasterComponent />
          <ScrollRestoration />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  // Case 1: Hande error 404 from Loader/Action (error url: response)
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage />;
    }

    // Difference error status (401, 403, 500, ...)
    message = error.statusText || 'Error';
    details = error.data || details;
  }
  // Case 2: Error crashing app when developing
  else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return <GeneralError message={message} details={details} stack={stack} />;
}
