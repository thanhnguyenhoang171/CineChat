import { QueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data fresh for 5 minutes
      retry: (failureCount, error: any) => {
        const axiosError = error as AxiosError<any>;
        // Block retry after 2 failures
        if (failureCount > 2) return false;

        if (axiosError?.response?.data?.status) {
          const status = axiosError.response.data.status;
          // 3. Error 4xx (except 429 - Too Many Requests) -> No retry
          if (status >= 400 && status < 500 && status !== 429) {
            return false;
          }
        }
        // Otherwise, retry (lose connection, 5xx errors, etc)
        return true;
      },
      refetchOnWindowFocus: false,
    },
  },
});

// Configure tanstack query client on the window object for debugging
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: QueryClient;
  }
}

if (typeof window !== 'undefined') {
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}
