// features/auth/components/login-carousel.tsx
'use client';
import Fade from 'embla-carousel-fade';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '~/components/ui/carousel';

const slideImages = [
  {
    src: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop',
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
  // ✅ Config Autoplay
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  );

  // ✅ Config Fade
  const fadePlugin = React.useRef(
    Fade(), // Mặc định hiệu ứng fade sẽ làm ảnh xếp chồng và mờ dần
  );

  return (
    <Carousel
      plugins={[autoplayPlugin.current, fadePlugin.current]}
      className='h-full w-full' // QUAN TRỌNG: Full chiều cao và rộng
    >
      <CarouselContent className='h-full ml-0'>
        {slideImages.map((image, index) => (
          // pl-0: Bỏ padding mặc định giữa các item của shadcn
          <CarouselItem key={index} className='h-full pl-0'>
            <div className='relative h-full w-full'>
              <img
                src={image.src}
                alt={image.alt}
                // object-cover: Cắt ảnh vừa khít màn hình mà không méo
                className='h-full w-full object-cover'
                loading='lazy'
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
