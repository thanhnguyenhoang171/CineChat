import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data fresh for 5 minutes
      retry: (failureCount, error) => {
        // console.log(`Retry check lần ${failureCount + 1}`, error);

        // Block retry after 2 failures
        if (failureCount > 2) return false;

        if (error?.response?.data?.status) {
          const status = error.response.data.status;
          // 3. Error 4xx (except 429 - Too Many Requests) -> No retry
          if (status >= 400 && status < 500 && status !== 429) {
            // console.log('>>> Gặp lỗi 4xx, hủy Retry!');
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
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

if (typeof window !== 'undefined') {
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}
