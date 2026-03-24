import { useEffect, useState } from 'react';

type BreakPoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<BreakPoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useBreakpoint() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth); // size of screen

    handleResize(); // set initial width
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (width === null) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
    };
  }

  return {
    isMobile: width < breakpoints.md,
    isTablet: width >= breakpoints.md && width < breakpoints.lg,
    isDesktop: width >= breakpoints.lg,
  };
}
