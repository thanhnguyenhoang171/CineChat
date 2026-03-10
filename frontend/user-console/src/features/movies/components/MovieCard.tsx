'use client';

import React from 'react';
import Link from 'next/link';
import { Star, Play, Crown, Ticket, Gift, Plus, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
  variant?: 'portrait' | 'landscape';
}

export const MovieCard = ({ movie, variant = 'landscape' }: MovieCardProps) => {
  const getBadgeConfig = (type: Movie['type']) => {
    switch (type) {
      case 'free': return { color: 'bg-emerald-500', icon: Gift };
      case 'premium': return { color: 'bg-amber-500', icon: Crown };
      case 'rental': return { color: 'bg-blue-500', icon: Ticket };
      default: return { color: 'bg-primary', icon: Play };
    }
  };
  const config = getBadgeConfig(movie.type);

  return (
    <div className='group relative flex flex-col w-full'>
      {/* Media Container */}
      <div className={cn(
        'relative overflow-hidden rounded-2xl bg-muted border border-border/50 transition-all duration-500 shadow-lg group-hover:shadow-primary/20',
        variant === 'portrait' ? 'aspect-[2/3]' : 'aspect-video'
      )}>
        {/* Link wraps only the image and center play button area */}
        <Link href={`/watch/${movie.id}`} className='block h-full w-full'>
          <img 
            src={movie.image} 
            className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-50' 
            alt={movie.title} 
          />
          
          {/* Centered Play Button */}
          <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
             <div className='h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-2xl scale-75 group-hover:scale-100 transition-transform'>
                <Play size={28} className='fill-current ml-1' />
             </div>
          </div>
        </Link>

        {/* Top Badges (Always on top of Image) */}
        <div className='absolute top-3 left-3 flex flex-col gap-2 pointer-events-none z-10'>
           <div className={cn('flex items-center justify-center h-8 w-8 rounded-xl text-white shadow-xl backdrop-blur-md border border-white/20', config.color)}>
              <config.icon size={14} />
           </div>
        </div>

        {/* AI Match Score (Top Right) */}
        {movie.matchScore && (
          <div className='absolute top-3 right-3 z-10 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-emerald-400/50 shadow-lg pointer-events-none'>
             {movie.matchScore}% Match
          </div>
        )}

        {/* Bottom Actions Overlay (Separate from Link to prevent accidental navigation) */}
        <div className='absolute bottom-3 right-3 flex gap-2 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
           <button 
             onClick={(e) => { e.preventDefault(); /* Logic Add to list */ }}
             className='h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all active:scale-90 shadow-xl'
             title="Thêm vào danh sách"
           >
              <Plus size={18} />
           </button>
           <button 
             onClick={(e) => { e.preventDefault(); /* Logic Like */ }}
             className='h-9 w-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all active:scale-90 shadow-xl'
             title="Thích"
           >
              <ThumbsUp size={18} />
           </button>
        </div>

        {/* Title Overlay for Landscape variant */}
        {variant === 'landscape' && (
          <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <h4 className='text-sm font-bold text-white line-clamp-1'>{movie.title}</h4>
              <div className='flex items-center gap-2 mt-1'>
                  <div className='flex items-center gap-1 text-[10px] text-yellow-400 font-black'>
                      <Star size={10} className='fill-current' />
                      {movie.rating}
                  </div>
                  <span className='text-[10px] text-white/60 font-bold uppercase'>{movie.year}</span>
              </div>
          </div>
        )}
      </div>

      {/* Title & Rating for Portrait variant (Under the media) */}
      {variant === 'portrait' && (
        <div className='mt-3 space-y-1 px-1'>
          <Link href={`/watch/${movie.id}`} className='font-black text-sm group-hover:text-primary transition-colors line-clamp-1 text-foreground block'>
            {movie.title}
          </Link>
          <div className='flex items-center justify-between'>
             <span className='text-[10px] font-bold text-muted-foreground'>{movie.year}</span>
             <div className='flex items-center gap-1 text-yellow-500'>
                <Star size={10} className='fill-current' />
                <span className='text-[10px] font-black'>{movie.rating}</span>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
