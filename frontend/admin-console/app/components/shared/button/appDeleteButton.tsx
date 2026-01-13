import { PencilLine, SquareX } from 'lucide-react';
import { Button } from '../../ui/button';
import { AppModifyButton } from './appModifyButton';

interface AppDeleteButtonProps {
  // onDelete: () => void;
  // item?: string;
  className?: string;
}

export function AppDeleteButton({
  // onDelete,
  // item,
  className,
}: AppDeleteButtonProps) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className={`text-destructive hover:text-destructive hover:bg-destructive/10 ${className}`}
      title='Xóa'>
      <SquareX />
    </Button>
  );
}
