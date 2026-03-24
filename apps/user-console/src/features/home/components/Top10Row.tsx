'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface Top10RowProps {
  movies: any[];
}

export const Top10Row = ({ movies }: Top10RowProps) => {
  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });

  return (
    <section className='py-16 px-6 md:px-16 overflow-hidden relative'>
      {/* Decorative Glow */}
      <div className='absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-destructive/10 rounded-full blur-[120px] pointer-events-none'></div>

      <div className='flex items-center gap-3 mb-10'>
        <div className='h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive'>
           <Flame size={24} className='animate-pulse' />
        </div>
        <h3 className='text-3xl font-black text-foreground tracking-tighter'>Top 10 Thịnh hành</h3>
      </div>

      <div className='embla -mx-2' ref={emblaRef}>
        <div className='embla__container flex pb-10'>
          {movies.slice(0, 10).map((movie, index) => (
            <motion.div 
              key={movie.id} 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className='embla__slide flex-[0_0_60%] sm:flex-[0_0_40%] md:flex-[0_0_28%] lg:flex-[0_0_22%] px-2 relative'
            >
               <Link href={`/watch/${movie.id}`} className='flex items-center h-full group cursor-pointer block'>
                   {/* Huge Number behind Poster */}
                   <span 
                    className='text-[10rem] md:text-[14rem] font-black leading-none absolute -left-6 md:-left-8 bottom-[-2rem] z-0 select-none text-muted/20 group-hover:text-primary/20 transition-colors duration-500' 
                   >
                       {index + 1}
                   </span>
                   
                   {/* Poster */}
                   <div className='relative z-10 w-full aspect-[2/3] ml-16 md:ml-20 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] border border-border/50'>
                       <img src={movie.image} className='w-full h-full object-cover group-hover:brightness-110 transition-all' alt={movie.title} />
                       
                       {/* Overlay Gradient on Hover */}
                       <div className='absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                       
                       <div className='absolute top-3 right-3 flex items-center justify-center h-6 w-10 rounded bg-black/50 backdrop-blur-md text-white font-black text-[10px] tracking-wider border border-white/20'>
                           TOP
                       </div>
                   </div>
               </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
