'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Play, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

const CONTINUE_WATCHING = [
  { id: 301, title: 'Stranger Things', progress: 65, image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop', episode: 'S4:E3' },
  { id: 302, title: 'Breaking Bad', progress: 30, image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?q=80&w=800&auto=format&fit=crop', episode: 'S2:E5' },
  { id: 303, title: 'Loki', progress: 85, image: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?q=80&w=800&auto=format&fit=crop', episode: 'S1:E6' },
  { id: 304, title: 'The Witcher', progress: 10, image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop', episode: 'S3:E1' },
];

export const ContinueWatchingRow = () => {
  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });

  return (
    <section className='py-8 px-6 md:px-16 overflow-hidden'>
      <div className='flex items-center gap-3 mb-6'>
        <h3 className='text-2xl font-black text-foreground flex items-center gap-3 tracking-tighter'>
          Tiếp tục xem
          <TrendingUp size={20} className='text-primary mt-0.5' />
        </h3>
      </div>
      <div className='embla -mx-2' ref={emblaRef}>
        <div className='embla__container flex'>
          {CONTINUE_WATCHING.map((movie, i) => (
            <motion.div 
              key={movie.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className='embla__slide flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_25%] px-2'
            >
              <div className='group relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-muted cursor-pointer transition-all duration-300 hover:scale-105 border border-border/50'>
                  {/* Background Image with Overlay */}
                  <img src={movie.image} alt={movie.title} className='h-full w-full object-cover brightness-75 group-hover:brightness-50 transition-all' />
                  
                  {/* Play Button Overlay */}
                  <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                      <div className='h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-2xl scale-75 group-hover:scale-100 transition-transform'>
                          <Play className='fill-current ml-1' size={24} />
                      </div>
                  </div>

                  {/* Info and Progress */}
                  <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end'>
                      <h4 className='text-sm font-bold text-white mb-0.5'>{movie.title}</h4>
                      <p className='text-[11px] text-white/70 mb-3 font-medium tracking-wide'>{movie.episode}</p>
                      <div className='w-full h-1.5 bg-white/20 rounded-full overflow-hidden'>
                          <div className='h-full bg-primary rounded-full relative' style={{ width: `${movie.progress}%` }}>
                              <div className='absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px] rounded-full'></div>
                          </div>
                      </div>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
