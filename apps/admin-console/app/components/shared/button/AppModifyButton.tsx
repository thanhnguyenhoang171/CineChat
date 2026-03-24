import { PencilLine } from 'lucide-react';
import { Button } from '../../ui/button';

interface AppModifyButtonProps {
  handleOnClick?: () => void;
  className?: string;
  title?: string;
}

export function AppModifyButton({
  handleOnClick,
  className,
  title = 'Sửa',
}: AppModifyButtonProps) {
  return (
    <Button
      variant='ghost'
      size='icon'
      className={`text-secondary hover:text-secondary hover:bg-secondary/10 ${className}`}
      title={title}
      onClick={handleOnClick}
      type="button"
    >
      <PencilLine />
    </Button>
  );
}
