'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { MovieCard } from './MovieCard';

interface MovieRowProps {
  category: string;
  movies: any[];
}

// Hàm chuẩn hóa Tiếng Việt để tạo slug không lỗi
const createSlug = (str: string) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const MovieRow = ({ category, movies }: MovieRowProps) => {
  const [emblaRef] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true });
  const slug = createSlug(category);

  return (
    <section className='py-8 px-6 md:px-16 overflow-hidden'>
      <Link href={`/collections/${slug}`} className='group/title w-fit block mb-6'>
        <h3 className='text-2xl font-black text-foreground flex items-center gap-3 group-hover/title:text-primary transition-colors cursor-pointer tracking-tighter'>
          {category}
          <ChevronRight size={24} className='text-primary mt-0.5 group-hover/title:translate-x-1 transition-transform' />
        </h3>
      </Link>
      <div className='embla -mx-2' ref={emblaRef}>
        <div className='embla__container flex'>
          {movies.map((movie) => (
            <div key={movie.id} className='embla__slide flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_20%] px-2'>
               <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
