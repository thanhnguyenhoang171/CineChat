'use client';

import React from 'react';
import { Clapperboard, Star, Sparkles } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const SLIDES = [
  {
    id: 1,
    title: 'Inception',
    description: 'Giấc mơ trong giấc mơ - Một kiệt tác về tâm lý và không gian.',
    url: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1000&auto=format&fit=crop',
    rating: 8.8,
  },
  {
    id: 2,
    title: 'Interstellar',
    description: 'Hành trình vượt qua không gian và thời gian để cứu lấy nhân loại.',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1000&auto=format&fit=crop',
    rating: 8.7,
  },
  {
    id: 3,
    title: 'The Dark Knight',
    description: 'Biểu tượng của dòng phim siêu anh hùng với chiều sâu tâm lý tội phạm.',
    url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1000&auto=format&fit=crop',
    rating: 9.0,
  },
];

export function AuthBanner() {
  const [emblaRef] = useEmblaCarousel({ loop: true, axis: 'y' }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  return (
    <div className='relative hidden w-1/2 bg-foreground p-12 text-primary-foreground md:flex md:flex-col justify-between overflow-hidden group'>
      {/* Background Decorative Elements */}
      <div className='absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--color-primary)_1px,transparent_1px)] [background-size:32px_32px]'></div>
      <div className='absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-[100px] animate-pulse'></div>
      <div className='absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary/10 blur-[100px] animate-pulse' style={{ animationDelay: '2s' }}></div>

      {/* Header / Logo */}
      <div className='relative z-10'>
        <div className='flex items-center gap-3 text-3xl font-black tracking-tighter'>
          <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/40 rotate-3 group-hover:rotate-0 transition-transform duration-500'>
            <Clapperboard className='h-7 w-7 text-primary-foreground' />
          </div>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-primary-foreground/70'>
            CineChat
          </span>
        </div>
      </div>

      {/* Cinematic Showcase */}
      <div className='relative z-10 my-auto py-10'>
        <div className='relative'>
           {/* Decorative Border Glow */}
          <div className='absolute -inset-1 bg-gradient-to-b from-primary/50 to-secondary/50 rounded-[2rem] blur opacity-25'></div>
          
          <div
            className='embla overflow-hidden rounded-[1.75rem] border border-white/10 shadow-2xl h-[300px] relative bg-black/20 backdrop-blur-sm'
            ref={emblaRef}>
            <div className='embla__container flex flex-col h-full'>
              {SLIDES.map((slide) => (
                <div
                  className='embla__slide relative flex-[0_0_100%] min-w-0'
                  key={slide.id}>
                  <img
                    src={slide.url}
                    alt={slide.title}
                    className='h-full w-full object-cover opacity-80 transition-transform duration-700 hover:scale-110'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent flex flex-col justify-end p-8'>
                    <div className='flex items-center gap-2 mb-3'>
                        <div className='flex gap-0.5 text-yellow-400'>
                            {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className='fill-current' />
                            ))}
                        </div>
                        <span className='text-xs font-bold text-white/90 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-md border border-white/10'>
                            IMDb {slide.rating}
                        </span>
                    </div>
                    <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-primary/80 mb-1'>
                      Now Premiering
                    </p>
                    <h3 className='text-2xl font-black tracking-tight mb-2'>{slide.title}</h3>
                    <p className='text-sm text-white/60 line-clamp-2 font-medium'>
                        {slide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Element */}
          <div className='absolute -right-4 -bottom-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl animate-bounce-slow'>
             <Sparkles className='text-primary h-6 w-6' />
          </div>
        </div>
      </div>

      {/* Bottom Content / Value Proposition */}
      <div className='relative z-10 space-y-8'>
        <div className='space-y-4'>
          <h2 className='text-3xl font-bold leading-[1.1] tracking-tight'>
            Nâng tầm trải nghiệm <br />
            <span className='relative inline-block mt-2'>
                <span className='relative z-10 text-primary-foreground'>với AI thông minh.</span>
                <div className='absolute bottom-1 left-0 w-full h-3 bg-primary/30 -z-0 -rotate-1'></div>
            </span>
          </h2>
          <p className='text-base leading-relaxed text-white/60 font-medium max-w-[90%]'>
            CineChat không chỉ tìm phim, chúng tôi hiểu cảm xúc và gu thẩm mỹ của bạn để đề xuất những tác phẩm thực sự xứng đáng với thời gian của bạn.
          </p>
        </div>

        <div className='flex items-center gap-6 border-t border-white/10 pt-8'>
           <div className='flex -space-x-3'>
              {[1, 2, 3, 4].map((i) => (
                  <div key={i} className='h-8 w-8 rounded-full border-2 border-foreground bg-zinc-800 flex items-center justify-center overflow-hidden'>
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt='User' />
                  </div>
              ))}
           </div>
           <p className='text-xs font-semibold text-white/40 uppercase tracking-widest'>
              +10k Moviethusiasts Joined
           </p>
        </div>
      </div>
    </div>
  );
}
