import { cn } from '~/lib/utils';

export function CustomLabel({
  text,
  icon,
  className,
}: {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={cn(
        'text-xs font-medium tracking-wide text-slate-500 flex items-center gap-2',
        className,
      )}>
      {icon} {text}
    </label>
  );
}
