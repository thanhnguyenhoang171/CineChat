import type React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../ui/pagination';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { generatePaginationEllipsis } from '~/utils/common-utils';
import { useTranslation } from 'react-i18next';

interface AppPaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSize: number;
}

export function AppPagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  pageSize,
}: AppPaginationProps) {
  const { t } = useTranslation('app');
  const pageSizeOptions = [10, 20, 50, 100];

  const handlePageChange = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pages = generatePaginationEllipsis(totalPages, currentPage);

  return (
    <div className={`flex items-center justify-between px-2 ${className}`}>
      {/* Select limit row data */}
      <div className='flex items-center space-x-2'>
        <p className='text-sm font-medium'>{t('text.pageRowNum')}</p>
        <Select
          value={`${pageSize}`}
          onValueChange={(value) => {
            onPageSizeChange(Number(value));
          }}>
          <SelectTrigger className='h-8 w-18 border border-border bg-card'>
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>

          <SelectContent side='top' className='w-18 min-w-18'>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={`${size}`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Pagination bar */}
      <div className='flex items-center space-x-2'>
        {/* First button */}
        <Pagination className={className}>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                href='#'
                onClick={(e) => handlePageChange(1, e)}
                className={
                  currentPage === 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
                aria-label='Go to first page'>
                <ChevronsLeft className='h-4 w-4' />
              </PaginationLink>
            </PaginationItem>

            {/* Previous button*/}
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={(e) => handlePageChange(currentPage - 1, e)}
                className={
                  currentPage === 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>

            {/*Numbers of page*/}
            {pages.map((page, index) => {
              if (page === 'ellipsis') {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href='#'
                    isActive={currentPage === page}
                    onClick={(e) => handlePageChange(page as number, e)}
                    className='cursor-pointer'>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/*  Next  button*/}
            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={(e) => handlePageChange(currentPage + 1, e)}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>

            {/* Last button */}
            <PaginationItem>
              <PaginationLink
                href='#'
                onClick={(e) => handlePageChange(totalPages, e)}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
                aria-label='Go to last page'>
                <ChevronsRight className='h-4 w-4' />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
        {t('text.page', { var: `${currentPage}/${totalPages}` })}
      </div>
    </div>
  );
}
