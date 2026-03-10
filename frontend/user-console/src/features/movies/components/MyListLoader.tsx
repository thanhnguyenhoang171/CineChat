import React from 'react';
import { movieService } from '@/lib/services/movieService';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from '@/components/shared/Skeleton';
import { Play, Plus } from 'lucide-react';
import Link from 'next/link';

export async function MyListLoader({ onRemove }: { onRemove?: (id: number) => void }) {
  // Giả lập fetch danh sách của tôi
  const movies = await movieService.getMoviesByCategory('most-viewed');

  if (movies.length === 0) return <EmptyState />;

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8'>
       {movies.map((movie) => (
         <MovieCard key={movie.id} movie={movie} variant='portrait' />
       ))}
       
       <Link href="/browse" className='aspect-[2/3] rounded-2xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-primary group'>
          <div className='h-12 w-12 rounded-full bg-muted flex items-center justify-center group-hover:scale-110 transition-transform'>
             <Plus size={24} />
          </div>
          <span className='font-black text-xs uppercase tracking-widest'>Thêm phim mới</span>
       </Link>
    </div>
  );
}

function EmptyState() {
  return (
    <div className='py-20 text-center space-y-8'>
       <div className='h-32 w-32 bg-muted rounded-full flex items-center justify-center mx-auto opacity-20'>
          <Play size={48} className='text-muted-foreground' />
       </div>
       <div className='space-y-2'>
          <h3 className='text-2xl font-black'>Danh sách đang trống</h3>
          <p className='text-muted-foreground font-medium'>Hãy thêm những bộ phim bạn yêu thích vào đây.</p>
       </div>
    </div>
  );
}

export function MyListSkeleton() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8'>
       {[1, 2, 3, 4, 5].map((i) => (
         <MovieCardSkeleton key={i} variant='portrait' />
       ))}
    </div>
  );
}
