import React from 'react';
import { movieService } from '@/lib/services/movieService';
import { MovieRow } from './MovieRow';
import { MovieCardSkeleton } from '@/components/shared/Skeleton';

interface MovieRowLoaderProps {
  category: string;
  categoryKey: string; // key để gọi trong service
}

// Đây là một Server Component đảm nhận việc fetch dữ liệu riêng lẻ
export async function MovieRowLoader({ category, categoryKey }: MovieRowLoaderProps) {
  const movies = await movieService.getMoviesByCategory(categoryKey);

  return <MovieRow category={category} movies={movies} />;
}

// Component hiển thị khung xương khi đang tải
export function MovieRowSkeleton() {
  return (
    <section className='py-8 px-6 md:px-16 overflow-hidden'>
      <div className='h-8 w-48 bg-muted animate-pulse rounded-lg mb-6'></div>
      <div className='flex gap-4 overflow-hidden'>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className='flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_20%] shrink-0'>
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
