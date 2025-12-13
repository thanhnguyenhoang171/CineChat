import { useBoundStore } from '~/store';

/**
 * Chỉ chạy loaderFn khi User đã đăng nhập (Có Token & User Info).
 * Giúp tránh lỗi 401 khi F5 trang (lúc đó Store chưa kịp hồi phục).
 */
export const protectedLoader = async <T>(loaderFn: () => Promise<T>) => {
  const store = useBoundStore.getState();

  // Logic: Nếu thiếu Token hoặc User (do F5), ta SKIP luôn việc prefetch.
  // Component sẽ tự lo việc fetch sau khi AuthGuard hồi phục xong.
  if (!store.accessToken || !store.user) {
    return null;
  }

  // Nếu an toàn, chạy hàm loader được truyền vào
  return await loaderFn();
};
