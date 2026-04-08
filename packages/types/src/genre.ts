import type { PaginationMeta } from './common.js';

export interface Genre {
  _id: string;
  name: string;
  description?: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
}

export interface GenreWithPagination {
  data: Genre[];
  meta: PaginationMeta;
}

export interface CreateGenreDto {
  name: string;
  description?: string;
  isActive: number;
}

export interface UpdateGenreDto {
  name?: string;
  description?: string;
  isActive?: number;
}
