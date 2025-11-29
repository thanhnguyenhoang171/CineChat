import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data fresh trong 5 phút,
      retry: 1, // Thử lại 1 lần khi thất bại
      refetchOnWindowFocus: false, // Không tự động làm mới khi cửa sổ được focus
    },
  },
});

// Phần khai báo Type này giữ nguyên (TypeScript chỉ dùng lúc build, không chạy lúc runtime)
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

// 👇 SỬA Ở ĐÂY: Chỉ gán khi đang chạy ở Browser
if (typeof window !== 'undefined') {
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;
}
