
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BookPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const BookPagination: React.FC<BookPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // No pagination needed if there's only one page
  if (totalPages <= 1) return null;
  
  // Function to generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    
    // Always show page 1
    pages.push(1);
    
    // Calculate the start and end of the range
    let rangeStart = Math.max(2, currentPage - 1);
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after page 1 if needed
    if (rangeStart > 2) {
      pages.push('ellipsis-start');
    }
    
    // Add the range of pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pages.push('ellipsis-end');
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
        
        {pageNumbers.map((page, index) => (
          <PaginationItem key={`${page}-${index}`}>
            {page === 'ellipsis-start' || page === 'ellipsis-end' ? (
              <span className="px-4 py-2">...</span>
            ) : (
              <PaginationLink
                onClick={() => onPageChange(page as number)}
                isActive={page === currentPage}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
