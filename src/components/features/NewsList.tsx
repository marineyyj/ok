"use client"

import NewsCard, { NewsItem } from '@/components/features/NewsCard'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NewsListProps {
  news: NewsItem[]
  layout?: 'grid' | 'list'
  columns?: 1 | 2 | 3 | 4
  showPagination?: boolean
  itemsPerPage?: number
  isLoading?: boolean
  emptyMessage?: string
  onNewsClick?: (news: NewsItem) => void
  onBookmark?: (news: NewsItem) => void
  onShare?: (news: NewsItem) => void
  className?: string
}

const NewsList = ({
  news,
  layout = 'grid',
  columns = 3,
  showPagination = true,
  itemsPerPage = 9,
  isLoading = false,
  emptyMessage = '没有找到相关新闻',
  onNewsClick,
  onBookmark,
  onShare,
  className = ''
}: NewsListProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  
  // Calculate pagination
  const totalPages = Math.ceil(news.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentNews = news.slice(startIndex, endIndex)
  
  // Calculate pagination items
  const generatePaginationItems = (currentPage: number, totalPages: number) => {
    const items = []
    const maxItems = 7 // Max pagination items to show
    
    // Always show first page
    items.push(1)
    
    // Calculate range of pages to show
    let startPageToShow = Math.max(2, currentPage - Math.floor(maxItems / 2))
    const endPageToShow = Math.min(totalPages - 1, startPageToShow + maxItems - 3)
    
    // Adjust if we're near the end
    if (endPageToShow - startPageToShow < maxItems - 3 && startPageToShow > 2) {
      startPageToShow = Math.max(2, endPageToShow - (maxItems - 3))
    }
    
    // Add ellipsis after first page if needed
    if (startPageToShow > 2) {
      items.push('...')
    }
    
    // Add middle pages
    for (let i = startPageToShow; i <= endPageToShow; i++) {
      items.push(i)
    }
    
    // Add ellipsis before last page if needed
    if (endPageToShow < totalPages - 1) {
      items.push('...')
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(totalPages)
    }
    
    return items
  }
  
  // Calculate grid columns
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns]
  
  // Loading state
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1E88E5]"></div>
      </div>
    )
  }
  
  // Empty state
  if (news.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
        <div className="text-gray-400 text-lg">{emptyMessage}</div>
      </div>
    )
  }
  
  return (
    <div className={className}>
      {layout === 'grid' ? (
        <div className={`grid ${gridCols} gap-6`}>
          {currentNews.map((item) => (
            <NewsCard 
              key={item.id}
              news={item}
              onClick={() => onNewsClick && onNewsClick(item)}
              onBookmark={() => onBookmark && onBookmark(item)}
              onShare={() => onShare && onShare(item)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currentNews.map((item) => (
            <NewsCard 
              key={item.id}
              news={item}
              variant="compact"
              onClick={() => onNewsClick && onNewsClick(item)}
              onBookmark={() => onBookmark && onBookmark(item)}
              onShare={() => onShare && onShare(item)}
            />
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-1">
            <button 
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'hover:bg-[#152A4A] text-white'
              }`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            
            {generatePaginationItems(currentPage, totalPages).map((item, index) => (
              <button 
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded-md ${
                  item === currentPage 
                    ? 'bg-[#1E88E5] text-white' 
                    : item === '...' 
                      ? 'text-gray-400 cursor-default' 
                      : 'hover:bg-[#152A4A] text-white'
                }`}
                onClick={() => item !== '...' && setCurrentPage(item as number)}
                disabled={item === '...'}
              >
                {item}
              </button>
            ))}
            
            <button 
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === totalPages 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'hover:bg-[#152A4A] text-white'
              }`}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsList 