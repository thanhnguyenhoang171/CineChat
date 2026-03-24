import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

interface SeparatorWithTextProps {
  text: string;
  className?: string;
}

export function SeparatorWithText({ text, className }: SeparatorWithTextProps) {
  return (
    <div className={cn('flex items-center gap-4 w-full', className)}>
      <Separator className='flex-1' />
      <span className='text-xs uppercase text-muted-foreground font-medium whitespace-nowrap'>
        {text}
      </span>
      <Separator className='flex-1' />
    </div>
  );
}
