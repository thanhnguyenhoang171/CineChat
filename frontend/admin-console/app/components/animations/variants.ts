import { easeInOut } from 'framer-motion';
export const fadeVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const shakeXVariant = {
  show: {
    x: [0, -6, 6, -4, 4, -2, 2, 0],
    transition: { duration: 0.6, ease: easeInOut },
  },
};
