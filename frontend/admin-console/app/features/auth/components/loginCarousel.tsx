import Fade from 'embla-carousel-fade';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '~/components/ui/carousel';
import { Clapperboard } from 'lucide-react';
import { fadeVariant, shakeXVariant } from '~/components/animations/variants';
import { fadeMotionProps } from '~/components/animations/helpers';
import { combine } from 'zustand/middleware';
import { combineVariants } from '~/components/animations/combine';

// image carousel slide source
const slideImages = [
  {
    src: 'https://cdn1.vectorstock.com/i/1000x1000/72/70/neon-sign-cinema-vector-3257270.jpg',
    alt: 'Cinema Hall',
  },
  {
    src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop',
    alt: 'Movie Reel',
  },
  {
    src: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop',
    alt: 'Filmmaking',
  },
];

export function LoginCarousel() {
  // Configure autoplay and fade plugins
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  );
  const fadePlugin = React.useRef(Fade());

  return (
    <>
      {/* Carousel container */}
      <div className='absolute inset-0 w-full h-full z-0'>
        <Carousel
          plugins={[autoplayPlugin.current, fadePlugin.current]}
          className='w-full h-full'>
          <CarouselContent className='h-full ml-0'>
            {slideImages.map((image, index) => (
              <CarouselItem key={index} className='h-full w-full p-0'>
                <img
                  src={image.src}
                  alt={image.alt}
                  className='w-full h-full object-cover'
                  loading='lazy'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Overlay */}
      <div className='absolute inset-0 bg-primary/50 mix-blend-multiply z-10' />

      {/* Content in carousel */}
      <motion.div
        variants={fadeVariant}
        {...fadeMotionProps}
        className='relative z-20 flex items-center gap-2 text-lg font-medium'>
        <motion.div
          variants={combineVariants(shakeXVariant, fadeVariant)}
          {...fadeMotionProps}
          whileHover={{ scale: 1.1 }}
          className='flex h-8 w-8 items-center justify-center rounded bg-foreground text-background'>
          <Clapperboard className='h-5 w-5' />
        </motion.div>
        CineChat Admin
      </motion.div>
      <motion.div
        variants={fadeVariant}
        {...fadeMotionProps}
        className='relative z-20 mt-auto'>
        <blockquote className='space-y-2'>
          <p className='text-lg font-medium leading-relaxed'>
            &ldquo;Quản lý kho phim và tương tác AI chưa bao giờ dễ dàng đến
            thế.&rdquo;
          </p>
          <footer className='text-sm text-primary-foreground/80'>
            Admin Console v1.0
          </footer>
        </blockquote>
      </motion.div>
    </>
  );
}
