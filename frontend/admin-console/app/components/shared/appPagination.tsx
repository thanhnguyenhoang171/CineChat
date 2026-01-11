import type React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

interface AppPaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function AppPagination({
  className,
  currentPage,
  totalPages,
  onPageChange,
}: AppPaginationProps) {
  const handlePageChange = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) return null; // Ẩn nếu chỉ có 1 trang

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Nút Previous */}
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

        {/* Các số trang */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href='#'
              isActive={currentPage === page}
              onClick={(e) => handlePageChange(page, e)}
              className='cursor-pointer'>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Nút Next */}
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
      </PaginationContent>
    </Pagination>
  );
}
