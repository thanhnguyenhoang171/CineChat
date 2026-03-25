import { PaginationMeta } from './common.js';
import { Genre } from './genre.js';
import { Cast } from './cast.js';

export interface Movie {
  _id: string;
  title: string;
  originalTitle?: string;
  overview?: string;
  tagline?: string;
  releaseDate?: string;
  runtime?: number;
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
