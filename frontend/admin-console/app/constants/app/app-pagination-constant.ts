import type { PaginationMeta } from '~/types/module-types/permission';

export const defaultMeta: PaginationMeta = {
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 1,
};

export const pageSizeOptions = [10, 20, 50, 100];
