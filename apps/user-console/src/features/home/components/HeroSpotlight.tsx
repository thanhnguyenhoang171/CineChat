'use client';

import React, { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Play, Info, Plus, Star, Crown, VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroSpotlightProps {
  movies: any[];
}

export const HeroSpotlight = ({ movies }: HeroSpotlightProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [heroEmblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 8000 })]);

  return (
    <section className='relative h-[85vh] md:h-[95vh] w-full overflow-hidden' ref={heroEmblaRef}>
      <div className='embla__container h-full flex'>
        {movies.map((movie) => (
          <div key={movie.id} className='embla__slide relative flex-[0_0_100%] h-full min-w-0'>
            <div className='absolute inset-0 h-full w-full'>
              <img src={movie.image} alt={movie.title} className='h-full w-full object-cover' />
              <div className='absolute inset-0 bg-linear-to-r from-background via-background/60 md:via-background/40 to-transparent'></div>
              <div className='absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent'></div>
            </div>

            <div className='relative z-10 h-full flex flex-col justify-center px-6 md:px-24 max-w-4xl pt-20'>
              <div className='flex items-center gap-2 mb-6 animate-in fade-in slide-in-from-left duration-700'>
                <div className='h-8 w-8 rounded-lg bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary border border-primary/30 shadow-lg shadow-primary/20'>
                  <Crown size={16} />
                </div>
                <span className='text-xs font-black text-primary uppercase tracking-[0.3em]'>Spotlight of the Week</span>
              </div>

              <h1 className='text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-6 animate-in fade-in slide-in-from-left duration-1000'>
                {movie.title}
              </h1>

              <div className='flex items-center gap-4 mb-8 text-sm md:text-base font-bold text-foreground/80'>
                <div className='flex items-center gap-1.5 text-yellow-500'>
                  <Star size={18} className='fill-current' />
                  {movie.rating}
                </div>
                <span className='h-1 w-1 rounded-full bg-muted-foreground'></span>
                <span>{movie.year}</span>
                <span className='h-1 w-1 rounded-full bg-muted-foreground'></span>
                <span className='px-2 py-0.5 rounded border border-foreground/30 text-xs tracking-widest uppercase'>4K HDR</span>
              </div>

              <p className='text-base md:text-lg text-foreground/70 font-medium leading-relaxed mb-10 line-clamp-3 md:line-clamp-none animate-in fade-in slide-in-from-left duration-700 delay-300 max-w-2xl'>
                {movie.description}
              </p>

              <div className='flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-bottom duration-700 delay-500'>
                <Button size='lg' className='h-14 px-10 rounded-xl text-lg font-black shadow-2xl shadow-primary/40 active:scale-95 transition-all gap-3 hover:-translate-y-1'>
                  <Play size={20} className='fill-current' />
                  Xem ngay
                </Button>
                <Button size='lg' variant='outline' className='h-14 px-8 rounded-xl text-lg font-black border-2 backdrop-blur-md bg-white/5 hover:bg-white/10 active:scale-95 transition-all gap-3 hover:-translate-y-1 text-white'>
                  <Info size={20} />
                  Chi tiết
                </Button>
                <button className='h-14 w-14 rounded-full border-2 border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-all active:scale-90 hover:-translate-y-1'>
                   <Plus size={24} />
                </button>
              </div>
            </div>

            <div className='absolute bottom-12 right-12 hidden lg:flex items-center gap-6 z-10'>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className='h-12 w-12 rounded-full border border-foreground/20 bg-background/20 backdrop-blur-xl flex items-center justify-center hover:bg-background/40 transition-all text-white'
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <div className='px-6 py-3 rounded-2xl border border-foreground/20 bg-background/20 backdrop-blur-xl flex items-center gap-3 font-black text-sm uppercase tracking-widest'>
                    Trending #1 in Vietnam
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
