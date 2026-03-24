import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';
import type { ApiError } from '~/types/api-types/api-error';
import {
  permissionService,
  type CreatePermissionDto,
} from '~/services/permission.service';
import { permissionKeys } from '~/queries/permisson.queries';

export function useCreatePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePermissionDto) =>
      permissionService.createPermission(payload),

    onSuccess: () => {
      toast.success('Tạo permission thành công');
      queryClient.invalidateQueries({ queryKey: permissionKeys.lists() });
    },

    onError: (error: AxiosError<ApiError>) => {
      const msg =
        (error.response?.data?.errors as unknown as string) ||
        'Internal Server Error!';
      toast.error(msg);
    },
  });
}
