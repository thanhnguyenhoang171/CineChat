import type { LucideIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import { useBreakpoint } from '~/hooks/layout/useBreakpoint';
import { cn } from '~/lib/utils';
import { useSidebar } from '../../ui/sidebar';

interface AppAddButtonProps {
  className?: string;
  text?: string;
  title?: string;
  icon?: LucideIcon;
  handleOnClick: () => void;
}

export function AppAddButton({
  className,
  text,
  title,
  icon: Icon,
  handleOnClick,
}: AppAddButtonProps) {
  const { isMobile, isTablet } = useBreakpoint();
  const { open } = useSidebar();
  const buttonText = title || text;
  return (
    <Button
      variant='secondary'
      size='lg'
      className={className}
      onClick={handleOnClick}>
      {Icon && (
        <Icon
          className={cn('h-4 w-4', !isMobile && !isTablet && open && 'mr-2')}
        />
      )}
      {buttonText}
    </Button>
  );
}
