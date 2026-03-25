import { PaginationMeta } from './common.js';

export interface Cast {
  _id: string;
  name: string;
  biography?: string;
  birthday?: string;
  deathday?: string | null;
  gender: number; // 1: Female, 2: Male, 3: Non-binary, 0: Not set
  placeOfBirth?: string;
  popularity?: number;
  profilePath?: string;
  role: 'ACTOR' | 'DIRECTOR' | 'PRODUCER' | 'OTHER';
  isActive: number;
  createdAt: string;
  updatedAt: string;
}

export interface CastWithPagination {
  data: Cast[];
  meta: PaginationMeta;
}

export interface CreateCastDto {
  name: string;
  biography?: string;
  birthday?: string;
  placeOfBirth?: string;
  gender: number;
  role: string;
  isActive: number;
  profilePath?: string;
}
