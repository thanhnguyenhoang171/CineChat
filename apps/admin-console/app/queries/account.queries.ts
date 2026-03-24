import { queryOptions } from '@tanstack/react-query';
import { authService } from '~/services/auth.service';

export const accountKeys = {
  all: ['account'] as const,
  detail: () => [...accountKeys.all, 'detail'] as const,
};

// Định nghĩa Query Options
export const accountQueries = {
  detail: () =>
    queryOptions({
      queryKey: accountKeys.detail(),
      queryFn: async () => {
        const res = await authService.getAccount();
        return res.data;
      },
      staleTime: 1000 * 60 * 5, // 5 phút
    }),
};
