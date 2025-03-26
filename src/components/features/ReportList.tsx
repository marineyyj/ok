"use client"

import { useState } from 'react'
import { GridIcon, List, ChevronLeft, ChevronRight } from 'lucide-react'
import ReportCard, { Report } from '@/components/features/ReportCard'

interface ReportListProps {
  reports: Report[]
  isLoading?: boolean
  viewMode?: 'grid' | 'list'
  onViewModeChange?: (mode: 'grid' | 'list') => void
  itemsPerPage?: number
  onReportClick?: (report: Report) => void
  onBookmark?: (report: Report) => void
  onDownload?: (report: Report) => void
  onShare?: (report: Report) => void
}

const ReportList = ({
  reports,
  isLoading = false,
  viewMode = 'grid',
  onViewModeChange,
  itemsPerPage = 9,
  onReportClick,
  onBookmark,
  onDownload,
  onShare
}: ReportListProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  
  // Calculate total pages
  const totalPages = Math.ceil(reports.length / itemsPerPage)
  
  // Calculate current page items
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReports = reports.slice(startIndex, endIndex)
  
  // Page navigation
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
  
  // Generate pagination items
  const generatePaginationItems = () => {
    const items = []
    const maxVisiblePages = 5
    
    // Always show first page
    items.push(1)
    
    // Calculate range of pages to show
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3)
    
    // Adjust if we're near the end
    if (endPage - startPage < maxVisiblePages - 3 && startPage > 2) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3))
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push('...')
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(i)
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      items.push('...')
    }
    
    // Add last page if there are more than 1 page
    if (totalPages > 1) {
      items.push(totalPages)
    }
    
    return items
  }
  
  // Loading state skeleton
  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between mb-4">
          <div className="h-8 w-40 bg-[#152A4A] rounded animate-pulse"></div>
          <div className="h-8 w-20 bg-[#152A4A] rounded animate-pulse"></div>
        </div>
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div 
              key={index}
              className={`bg-[#152A4A] rounded-lg overflow-hidden animate-pulse ${
                viewMode === 'grid' ? 'h-[320px]' : 'h-[160px]'
              }`}
            ></div>
          ))}
        </div>
      </div>
    )
  }
  
  // Empty state
  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#152A4A] mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">没有找到相关报告</h3>
        <p className="text-gray-400">尝试调整筛选条件或搜索其他关键词</p>
      </div>
    )
  }
  
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">
          共找到 <span className="text-white">{reports.length}</span> 份报告
        </div>
        <div className="flex items-center space-x-2">
          <button 
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#1E88E5]' : 'bg-[#0A192F] hover:bg-[#152A4A]'}`}
            onClick={() => onViewModeChange && onViewModeChange('grid')}
          >
            <GridIcon size={16} />
          </button>
          <button 
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#1E88E5]' : 'bg-[#0A192F] hover:bg-[#152A4A]'}`}
            onClick={() => onViewModeChange && onViewModeChange('list')}
          >
            <List size={16} />
          </button>
        </div>
      </div>
      
      {/* Reports */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
        : 'space-y-4'
      }>
        {currentReports.map((report) => (
          <ReportCard 
            key={report.id}
            report={report}
            variant={viewMode}
            onClick={onReportClick}
            onBookmark={onBookmark}
            onDownload={onDownload}
            onShare={onShare}
          />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 mr-2 rounded-md ${
              currentPage === 1 
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#152A4A]'
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex items-center space-x-1">
            {generatePaginationItems().map((item, index) => (
              typeof item === 'number' 
                ? (
                  <button 
                    key={index}
                    onClick={() => handlePageChange(item)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      currentPage === item
                        ? 'bg-[#1E88E5]'
                        : 'hover:bg-[#152A4A]'
                    }`}
                  >
                    {item}
                  </button>
                )
                : (
                  <span key={index} className="px-1">
                    {item}
                  </span>
                )
            ))}
          </div>
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 ml-2 rounded-md ${
              currentPage === totalPages 
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#152A4A]'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ReportList 