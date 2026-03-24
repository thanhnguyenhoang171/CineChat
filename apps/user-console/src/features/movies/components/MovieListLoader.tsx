import React from 'react';
import { movieService } from '@/lib/services/movieService';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from '@/components/shared/Skeleton';
import { cn } from '@/lib/utils';

interface MovieListLoaderProps {
  genre?: string;
  access?: string;
  viewMode: 'grid' | 'list';
}

export async function MovieListLoader({ genre, access, viewMode }: MovieListLoaderProps) {
  // Giả lập fetch phim theo bộ lọc
  const movies = await movieService.getMoviesByCategory('trending');

  return (
    <div className={cn(
      'grid gap-6',
      viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
    )}>
       {movies.map((movie) => (
         <MovieCard key={movie.id} movie={movie} variant={viewMode === 'grid' ? 'portrait' : 'landscape'} />
       ))}
    </div>
  );
}

export function MovieGridSkeleton({ viewMode }: { viewMode: 'grid' | 'list' }) {
  return (
    <div className={cn(
      'grid gap-6',
      viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
    )}>
       {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
         <MovieCardSkeleton key={i} variant={viewMode === 'grid' ? 'portrait' : 'landscape'} />
       ))}
    </div>
  );
}
