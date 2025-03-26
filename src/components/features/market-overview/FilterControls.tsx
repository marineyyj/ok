"use client"

import React, { useState } from 'react'
import { Filter, ChevronDown, X, Search } from 'lucide-react'

export type MarketCategory = '沪深A股' | '港股' | '美股' | '全球指数' | '债券' | '商品' | '外汇' | '加密货币'
export type MarketFilter = 'all' | 'up' | 'down' | 'volume' | 'turnover' | 'volatility'

interface FilterControlsProps {
  onCategoryChange: (category: MarketCategory) => void
  onFilterChange: (filter: MarketFilter) => void
  onSearch: (query: string) => void
  activeCategory: MarketCategory
  activeFilter: MarketFilter
  className?: string
}

export default function FilterControls({
  onCategoryChange,
  onFilterChange,
  onSearch,
  activeCategory = '全球指数',
  activeFilter = 'all',
  className = ''
}: FilterControlsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  
  // List of market categories
  const categories: MarketCategory[] = [
    '全球指数', '沪深A股', '港股', '美股', '债券', '商品', '外汇', '加密货币'
  ]
  
  // List of filters with display names
  const filters: { id: MarketFilter; label: string }[] = [
    { id: 'all', label: '全部' },
    { id: 'up', label: '上涨' },
    { id: 'down', label: '下跌' },
    { id: 'volume', label: '成交量' },
    { id: 'turnover', label: '成交额' },
    { id: 'volatility', label: '波动率' },
  ]
  
  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }
  
  return (
    <div className={`bg-[#152A4A] rounded-xl overflow-hidden ${className}`}>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="w-full md:w-1/3">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索市场指数..."
                className="w-full py-2 px-4 pl-10 rounded-lg bg-[#0A192F] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                  <X size={16} />
                </button>
              )}
            </form>
          </div>
          
          {/* Filter toggles - desktop */}
          <div className="hidden md:flex flex-1 flex-wrap gap-2">
            {/* Categories */}
            <div className="flex-1 overflow-x-auto pb-2 hide-scrollbar">
              <div className="flex space-x-2 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      category === activeCategory
                        ? 'bg-[#1E88E5] text-white'
                        : 'bg-[#0A192F] text-gray-300 hover:bg-[#13233e]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex-none flex items-center gap-2">
              <div className="text-gray-400 px-1">
                <Filter size={18} />
              </div>
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    filter.id === activeFilter
                      ? 'bg-[#1E88E5] text-white'
                      : 'bg-[#0A192F] text-gray-300 hover:bg-[#13233e]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Mobile filters toggle */}
          <button
            className="md:hidden flex items-center justify-center py-2 px-4 bg-[#0A192F] rounded-lg text-gray-300"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Filter size={18} className="mr-2" />
            筛选
            <ChevronDown size={16} className={`ml-2 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {/* Mobile filters (collapsible) */}
        {showMobileFilters && (
          <div className="md:hidden mt-4 space-y-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategoryChange(category)
                    setShowMobileFilters(false)
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                    category === activeCategory
                      ? 'bg-[#1E88E5] text-white'
                      : 'bg-[#0A192F] text-gray-300 hover:bg-[#13233e]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => {
                    onFilterChange(filter.id)
                    setShowMobileFilters(false)
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    filter.id === activeFilter
                      ? 'bg-[#1E88E5] text-white'
                      : 'bg-[#0A192F] text-gray-300 hover:bg-[#13233e]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 