// filepath: d:\Projects\5unSystem\FE\5unSystem.Web\src\components\table\pagination.tsx
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

export type PaginationProps = {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  siblingsCount?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  isLoading?: boolean;
};

export const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  siblingsCount = 1,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 50, 100],
  isLoading = false,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  
  const canPreviousPage = currentPage > 1;
  const canNextPage = currentPage < totalPages;
  
  // For mobile, we'll show a simpler pagination with fewer siblings
  const effectiveSiblingsCount = useMemo(() => {
    // Detect if we're on a small screen (simplified way, you might want to use a hook instead)
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 640;
    return isSmallScreen ? 0 : siblingsCount;
  }, [siblingsCount]);
  
  const generatePaginationArray = useMemo(() => {
    // Create an array of page numbers to display
    const totalPageNumbers = effectiveSiblingsCount * 2 + 3; // siblings + current + first + last
    // +2 for the "..." dots if needed
    
    if (totalPages > totalPageNumbers) {
      const startPage = Math.max(
        2,
        Math.min(
          currentPage - effectiveSiblingsCount,
          totalPages - totalPageNumbers + 2
        )
      );
      
      const endPage = Math.min(
        totalPages - 1,
        Math.max(
          currentPage + effectiveSiblingsCount,
          totalPageNumbers - 1
        )
      );
      
      let pages: (number | string)[] = [];
      
      // Always include first page
      pages.push(1);
      
      // Add dots if needed
      if (startPage > 2) {
        pages.push("...");
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add dots if needed
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      
      // Always include last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
      
      return pages;
    }
    
    // If total pages are less than the boundaries, return a simple array 1...n
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [currentPage, totalPages, effectiveSiblingsCount]);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPageSize = Number(e.target.value);
    onPageSizeChange && onPageSizeChange(newPageSize);
  };

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-3 border-t border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 gap-2">
      {/* Info Text - Hidden on very small screens */}
      <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
        <span>
          Showing 
          <span className="font-medium mx-1">
            {Math.min((currentPage - 1) * pageSize + 1, totalItems)}
          </span> 
          to 
          <span className="font-medium mx-1">
            {Math.min(currentPage * pageSize, totalItems)}
          </span> 
          of 
          <span className="font-medium mx-1">{totalItems}</span> 
          entries
        </span>
      </div>

      {/* Simple info for mobile */}
      <div className="sm:hidden text-sm text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </div>
      
      {/* Page size selector */}
      {onPageSizeChange && (
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">Show</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="block w-16 px-1 py-1 text-sm bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {/* Pagination Controls */}
      <div className="flex items-center space-x-1">
        <Button
          variant="outline_pro"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={!canPreviousPage || isLoading}
          className="px-2"
        >
          <ChevronsLeft size={16} />
        </Button>
        <Button
          variant="outline_pro"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canPreviousPage || isLoading}
          className="px-2"
        >
          <ChevronLeft size={16} />
        </Button>
        
        {/* Page buttons - Shown on larger screens */}
        <div className="hidden sm:flex items-center space-x-1">
          {generatePaginationArray.map((page, index) => (
            page === "..." ? (
              <span key={index} className="px-2">...</span>
            ) : (
              <Button
                key={index}
                variant={currentPage === page ? "info" : "outline_pro"}
                size="sm"
                onClick={() => onPageChange(Number(page))}
                disabled={isLoading}
                className="px-3"
              >
                {page}
              </Button>
            )
          ))}
        </div>
        
        <Button
          variant="outline_pro"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canNextPage || isLoading}
          className="px-2"
        >
          <ChevronRight size={16} />
        </Button>
        <Button
          variant="outline_pro"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={!canNextPage || isLoading}
          className="px-2"
        >
          <ChevronsRight size={16} />
        </Button>
      </div>
    </div>
  );
};