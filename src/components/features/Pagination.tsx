"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) => {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null

  // Generate an array of page numbers to display
  const generatePaginationItems = () => {
    const items = []
    const maxPagesToShow = 7 // Total pages to show including ellipses
    
    // Always show first page
    items.push(1)
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than max
      for (let i = 2; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      // Complex pagination with ellipses
      
      // If current page is close to start
      if (currentPage <= 3) {
        items.push(2, 3, 4, 'ellipsis', totalPages)
      }
      // If current page is close to end
      else if (currentPage >= totalPages - 2) {
        items.push('ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      }
      // If current page is in the middle
      else {
        items.push('ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages)
      }
    }
    
    return items
  }

  const paginationItems = generatePaginationItems()

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {/* Previous button */}
      <button
        className={`p-2 rounded-md flex items-center justify-center ${
          currentPage === 1
            ? 'text-gray-500 cursor-not-allowed'
            : 'hover:bg-[#152A4A] text-gray-300'
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
      </button>
      
      {/* Page numbers */}
      {paginationItems.map((item, index) => {
        if (item === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-10 h-10 flex items-center justify-center text-gray-400"
            >
              <MoreHorizontal size={18} />
            </span>
          )
        }
        
        const page = item as number
        return (
          <button
            key={page}
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
              currentPage === page
                ? 'bg-[#1E88E5] text-white'
                : 'hover:bg-[#152A4A] text-gray-300'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      })}
      
      {/* Next button */}
      <button
        className={`p-2 rounded-md flex items-center justify-center ${
          currentPage === totalPages
            ? 'text-gray-500 cursor-not-allowed'
            : 'hover:bg-[#152A4A] text-gray-300'
        }`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  )
}

export default Pagination 