import { cn } from '~/lib/utils';
import { Separator } from './separator';

interface SeparatorWithTextProps {
  text: string;
  className?: string;
}

export function SeparatorWithText({ text, className }: SeparatorWithTextProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Separator className='flex-1' />
      <span className='text-sm text-muted-foreground font-medium'>{text}</span>
      <Separator className='flex-1' />
    </div>
  );
}
