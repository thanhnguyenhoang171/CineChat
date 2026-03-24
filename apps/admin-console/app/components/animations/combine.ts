import type { Variants } from 'framer-motion';

export const combineVariants = (...variants: Variants[]): Variants => {
  return variants.reduce(
    (acc, curr) => ({
      hidden: { ...acc.hidden, ...curr.hidden },
      show: { ...acc.show, ...curr.show },
    }),
    { hidden: {}, show: {} } as Variants,
  );
};
