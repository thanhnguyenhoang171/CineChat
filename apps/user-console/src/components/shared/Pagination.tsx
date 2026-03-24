'use client';

import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className 
}: PaginationProps) => {
  
  // Logic to generate page numbers (simplified for now)
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(totalPages, 3); i++) {
      pages.push(i);
    }
    if (totalPages > 3) {
      pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-2 md:gap-3', className)}>
      {/* First Page */}
      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className='h-10 w-10 md:h-12 md:w-12 rounded-xl border-2 hover:bg-muted disabled:opacity-30'
        title="Trang đầu"
      >
        <ChevronsLeft size={18} />
      </Button>

      {/* Previous Page */}
      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='h-10 w-10 md:h-12 md:w-12 rounded-xl border-2 hover:bg-muted disabled:opacity-30'
        title="Trang trước"
      >
        <ChevronLeft size={18} />
      </Button>

      {/* Page Numbers */}
      <div className='flex items-center gap-1 md:gap-2'>
         {renderPageNumbers().map((p, i) => (
           <React.Fragment key={i}>
             {typeof p === 'number' ? (
               <Button
                 variant={currentPage === p ? 'default' : 'outline'}
                 onClick={() => onPageChange(p)}
                 className={cn(
                   'h-10 w-10 md:h-12 md:w-12 rounded-xl font-black text-sm md:text-base border-2 transition-all',
                   currentPage === p ? 'shadow-lg shadow-primary/30' : 'hover:bg-muted'
                 )}
               >
                 {p}
               </Button>
             ) : (
               <div className='w-8 flex justify-center text-muted-foreground'>
                  <MoreHorizontal size={18} />
               </div>
             )}
           </React.Fragment>
         ))}
      </div>

      {/* Next Page */}
      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='h-10 w-10 md:h-12 md:w-12 rounded-xl border-2 hover:bg-muted disabled:opacity-30'
        title="Trang tiếp"
      >
        <ChevronRight size={18} />
      </Button>

      {/* Last Page */}
      <Button
        variant='outline'
        size='icon'
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className='h-10 w-10 md:h-12 md:w-12 rounded-xl border-2 hover:bg-muted disabled:opacity-30'
        title="Trang cuối"
      >
        <ChevronsRight size={18} />
      </Button>
    </div>
  );
};
