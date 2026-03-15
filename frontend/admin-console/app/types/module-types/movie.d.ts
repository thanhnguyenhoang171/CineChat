import type { Genre } from './genre';
import type { Cast } from './cast';

export interface Movie {
  _id: string;
  title: string;
  originalTitle?: string;
  overview?: string;
  tagline?: string;
  releaseDate?: string;
  runtime?: number; // minutes
  status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
  posterPath?: string;
  backdropPath?: string;
  genres: Genre[];
  casts: {
    cast: Cast;
    character: string;
    order: number;
  }[];
  popularity: number;
  voteAverage: number;
  voteCount: number;
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

export interface MovieWithPagination {
  data: Movie[];
  meta: PaginationMeta;
}

export interface CreateMovieDto {
  title: string;
  originalTitle?: string;
  overview?: string;
  tagline?: string;
  releaseDate?: string;
  runtime?: number;
  status: string;
  posterPath?: string;
  backdropPath?: string;
  genreIds: string[];
  isActive: number;
}

export interface UpdateMovieDto extends Partial<CreateMovieDto> {}
