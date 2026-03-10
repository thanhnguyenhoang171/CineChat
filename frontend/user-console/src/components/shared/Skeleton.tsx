'use client';

import { cn } from '@/lib/utils';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/50", className)}
      {...props}
    />
  );
}

export function MovieCardSkeleton({ variant = 'landscape' }: { variant?: 'portrait' | 'landscape' }) {
  return (
    <div className="space-y-3">
      <Skeleton className={cn(
        "w-full",
        variant === 'portrait' ? "aspect-[2/3] rounded-2xl" : "aspect-video rounded-xl"
      )} />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex justify-between">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
}
