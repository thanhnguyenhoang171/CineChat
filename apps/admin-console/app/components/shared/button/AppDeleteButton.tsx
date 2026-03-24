import { SquareX } from 'lucide-react';
import { Button } from '../../ui/button';

interface AppDeleteButtonProps {
  handleOnClick?: () => void;
  className?: string;
  title?: string;
}

export function AppDeleteButton({
  handleOnClick,
  className,
  title = 'Xóa',
}: AppDeleteButtonProps) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className={`text-destructive hover:text-destructive hover:bg-destructive/10 ${className}`}
      title={title}
      onClick={handleOnClick}
      type="button"
    >
      <SquareX />
    </Button>
  );
}
