"use client"

import { useState } from 'react'
import CompanyCard, { Company } from '@/components/features/CompanyCard'
import Pagination from '@/components/features/Pagination'
import { Grid, List, Loader, SortAsc, SortDesc } from 'lucide-react'

export type SortField = 'name' | 'price' | 'employees' | 'relevance'
export type SortOrder = 'asc' | 'desc'

export interface CompanyListProps {
  companies: Company[]
  isLoading?: boolean
  onCompanyClick?: (company: Company) => void
  emptyMessage?: string
  perPage?: number
  className?: string
  initialLayout?: 'grid' | 'list'
  initialSortField?: SortField
  initialSortOrder?: SortOrder
  onSortChange?: (field: SortField, order: SortOrder) => void
}

const CompanyList = ({
  companies,
  isLoading = false,
  onCompanyClick,
  emptyMessage = '没有找到匹配的公司',
  perPage = 10,
  className = '',
  initialLayout = 'grid',
  initialSortField = 'relevance',
  initialSortOrder = 'desc',
  onSortChange,
}: CompanyListProps) => {
  // State
  const [layout, setLayout] = useState<'grid' | 'list'>(initialLayout)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<SortField>(initialSortField)
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder)
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(companies.length / perPage))
  
  // Get current page data
  const startIndex = (currentPage - 1) * perPage
  const endIndex = Math.min(startIndex + perPage, companies.length)
  const currentCompanies = companies.slice(startIndex, endIndex)
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of the list
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  // Handle sort change
  const handleSortChange = (field: SortField) => {
    // If clicking the same field, toggle order
    const newOrder = field === sortField && sortOrder === 'desc' ? 'asc' : 'desc'
    
    setSortField(field)
    setSortOrder(newOrder)
    
    // Call parent handler if provided
    if (onSortChange) {
      onSortChange(field, newOrder)
    }
  }
  
  // Render sort button
  const renderSortButton = (field: SortField, label: string) => {
    const isActive = sortField === field
    
    return (
      <button
        className={`flex items-center text-sm px-3 py-1.5 rounded-md transition-colors ${
          isActive ? 'bg-[#1E88E5]/20 text-[#1E88E5]' : 'text-gray-400 hover:bg-[#152A4A]'
        }`}
        onClick={() => handleSortChange(field)}
      >
        <span>{label}</span>
        {isActive && (
          sortOrder === 'asc' ? 
            <SortAsc size={14} className="ml-1" /> : 
            <SortDesc size={14} className="ml-1" />
        )}
      </button>
    )
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className={`min-h-[400px] flex flex-col items-center justify-center ${className}`}>
        <Loader size={32} className="text-[#1E88E5] animate-spin mb-4" />
        <div className="text-gray-400">加载中...</div>
      </div>
    )
  }
  
  // Empty state
  if (companies.length === 0) {
    return (
      <div className={`min-h-[400px] flex flex-col items-center justify-center ${className}`}>
        <div className="w-16 h-16 bg-[#152A4A] rounded-full flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" fill="none" width="24" height="24" stroke="currentColor" strokeWidth={2} className="text-gray-400">
            <path d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-center">
          <div className="text-lg font-medium mb-2">{emptyMessage}</div>
          <div className="text-sm text-gray-400">尝试使用其他关键词或调整筛选条件</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className={className}>
      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
        <div className="flex items-center space-x-2">
          {renderSortButton('relevance', '相关度')}
          {renderSortButton('name', '公司名称')}
          {renderSortButton('price', '股票价格')}
          {renderSortButton('employees', '公司规模')}
        </div>
        
        <div className="flex items-center bg-[#0A192F] rounded-md">
          <button
            className={`p-2 rounded-md ${layout === 'grid' ? 'text-[#1E88E5]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setLayout('grid')}
            title="网格视图"
          >
            <Grid size={18} />
          </button>
          <button
            className={`p-2 rounded-md ${layout === 'list' ? 'text-[#1E88E5]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setLayout('list')}
            title="列表视图"
          >
            <List size={18} />
          </button>
        </div>
      </div>
      
      {/* Results count */}
      <div className="text-sm text-gray-400 mb-4">
        共找到 <span className="text-white">{companies.length}</span> 个公司
        {totalPages > 1 && (
          <span> - 显示第 {startIndex + 1}-{endIndex} 个</span>
        )}
      </div>
      
      {/* Company grid/list */}
      {layout === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              layout="grid"
              onClick={onCompanyClick}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {currentCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              layout="list"
              onClick={onCompanyClick}
            />
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}

export default CompanyList 