import { PencilLine, SquareX } from 'lucide-react';
import { Button } from '../../ui/button';

interface AppModifyButtonProps {
  // onModify: () => void;
  // item?: string;
  className?: string;
}

export function AppModifyButton({
  // onModify,
  // item,
  className,
}: AppModifyButtonProps) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className={`text-secondary hover:text-secondary hover:bg-secondary/10 ${className}`}
      title='Sửa'>
      <PencilLine />
    </Button>
  );
}
