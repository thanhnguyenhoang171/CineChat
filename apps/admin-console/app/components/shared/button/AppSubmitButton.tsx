import { Loader2 } from 'lucide-react';
import React from 'react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean;
  loadingText: string;
  children: React.ReactNode;
}
const AppSubmitButton = ({
  isPending,
  loadingText,
  children,
  className,
  ...props
}: LoadingButtonProps) => {
  return (
    <div className='flex justify-center w-full'>
      <Button
        {...props}
        disabled={isPending}
        className={cn('w-[70%] rounded-[5px]', className)}>
        {isPending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            {loadingText}
          </>
        ) : (
          children
        )}
      </Button>
    </div>
  );
};

export default AppSubmitButton;
