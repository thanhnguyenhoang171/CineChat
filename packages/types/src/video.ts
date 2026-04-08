import type { PaginationMeta } from './common.js';

export interface Video {
  _id: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  publishedAt: string;
  movieId: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
}

export interface VideoWithPagination {
  data: Video[];
  meta: PaginationMeta;
}

export interface CreateVideoDto {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  publishedAt: string;
  movieId: string;
  isActive: number;
}

export interface UpdateVideoDto extends Partial<CreateVideoDto> {}
