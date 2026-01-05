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
import { combineVariants } from '~/components/animations/combine';
import { LOGIN_CAROUSEL_IMAGES } from '~/utils/carousel-images';

export function LoginCarousel() {
  // Configure autoplay and fade plugins
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false }),
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
            {LOGIN_CAROUSEL_IMAGES.map((image, index) => (
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
        {/* Icon login page */}
        <motion.div
          variants={combineVariants(shakeXVariant, fadeVariant)}
          {...fadeMotionProps}
          whileHover={{ scale: 1.1 }}
          className='flex h-8 w-8 items-center justify-center rounded'>
          <Clapperboard className='h-5 w-5' />
        </motion.div>
        {/* Header text */}
        Cinema with AI project - Admin Console
      </motion.div>

      <motion.div
        variants={fadeVariant}
        {...fadeMotionProps}
        className='relative z-20 mt-auto flex-col items-center'>
        <blockquote className='space-y-2 text-center'>
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
