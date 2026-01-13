import type { LucideIcon } from 'lucide-react';
import { Button } from '../../ui/button';
import { useBreakpoint } from '~/hooks/useBreakpoint';
import { cn } from '~/lib/utils';
import { useSidebar } from '../../ui/sidebar';

interface AppAddButtonProps {
  className?: string;
  text?: string;
  icon?: LucideIcon;
  handleOnClick: () => void;
}

export function AppAddButton({
  className,
  text,
  icon: Icon,
  handleOnClick,
}: AppAddButtonProps) {
  const { isMobile, isTablet } = useBreakpoint();
  const { open } = useSidebar();
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
      {text}
    </Button>
  );
}
