import { useBreakpoint } from '~/hooks/useBreakpoint';
import { cn } from '~/lib/utils';

interface TypographyH2Props {
  text: string;
  className?: string;
}

export function TypographyH2({ text, className }: TypographyH2Props) {
  const { isMobile, isTablet } = useBreakpoint();
  return (
    <h2
      className={cn(
        `scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`,
        (isMobile || isTablet) && 'mb-3',
      )}>
      {text}
    </h2>
  );
}
