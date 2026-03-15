export interface Video {
  _id: string;
  movieId: string;
  name: string;
  key: string; // YouTube key or other provider key
  site: 'YouTube' | 'Vimeo' | 'Other';
  size: number; // 720, 1080, etc.
  type: 'Trailer' | 'Teaser' | 'Clip' | 'Featurette' | 'Behind the Scenes' | 'Bloopers';
  official: boolean;
  publishedAt: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface VideoWithPagination {
  data: Video[];
  meta: PaginationMeta;
}

export interface CreateVideoDto {
  movieId: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  isActive: number;
}

export interface UpdateVideoDto extends Partial<CreateVideoDto> {}
