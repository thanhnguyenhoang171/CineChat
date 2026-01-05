import Fade from 'embla-carousel-fade';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '~/components/ui/carousel';
import { REGISTER_CAROUSEL_IMAGES } from '~/utils/carousel-images';

export function RegisterCarousel() {
  // Configure autoplay and fade plugins
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  );
  const fadePlugin = React.useRef(Fade());

  return (
    <>
      {/* Carousel container */}
      <div className='absolute inset-0 w-full h-full z-0 overflow-hidden'>
        <Carousel
          plugins={[autoplayPlugin.current, fadePlugin.current]}
          className='w-full h-full'>
          <CarouselContent className='h-full ml-0'>
            {REGISTER_CAROUSEL_IMAGES.map((image, index) => (
              <CarouselItem key={index} className='h-full w-full p-0'>
                <img
                  src={image.src}
                  alt={image.alt}
                  className='w-full h-full object-cover
                  opacity-80'
                  loading='lazy'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className='absolute inset-0 bg-black/70' />
      </div>
    </>
  );
}
