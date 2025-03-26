"use client"

import { useState, useRef, useEffect } from 'react'
import { Search, ChevronDown, X, Filter, SortDesc } from 'lucide-react'

export type SortOption = 'latest' | 'popular' | 'relevance'
export type TimeRange = 'all' | 'week' | 'month' | 'quarter' | 'year'

export interface SearchFiltersProps {
  query: string
  onQueryChange: (query: string) => void
  categories: string[]
  selectedCategories: string[]
  onCategoryChange: (categories: string[]) => void
  sortOption: SortOption
  onSortChange: (option: SortOption) => void
  timeRange: TimeRange
  onTimeRangeChange: (range: TimeRange) => void
  onReset: () => void
  onSearch: () => void
}

const sortOptionLabels: Record<SortOption, string> = {
  latest: '最新发布',
  popular: '热门阅读',
  relevance: '相关程度'
}

const timeRangeLabels: Record<TimeRange, string> = {
  all: '全部时间',
  week: '最近一周',
  month: '最近一月',
  quarter: '最近三月',
  year: '最近一年'
}

const ReportSearchFilters = ({
  query,
  onQueryChange,
  categories,
  selectedCategories,
  onCategoryChange,
  sortOption,
  onSortChange,
  timeRange,
  onTimeRangeChange,
  onReset,
  onSearch
}: SearchFiltersProps) => {
  // Dropdown states
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)
  
  // Refs for dropdown closing on outside click
  const categoryDropdownRef = useRef<HTMLDivElement>(null)
  const sortDropdownRef = useRef<HTMLDivElement>(null)
  const timeDropdownRef = useRef<HTMLDivElement>(null)
  
  // Handle category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category))
    } else {
      onCategoryChange([...selectedCategories, category])
    }
  }
  
  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false)
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false)
      }
      if (timeDropdownRef.current && !timeDropdownRef.current.contains(event.target as Node)) {
        setShowTimeDropdown(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Handle Enter key in search input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }
  
  return (
    <div className="bg-[#152A4A] p-4 rounded-xl">
      {/* Search input */}
      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索研究报告、行业分析、策略报告..."
            className="w-full py-2.5 px-4 pl-10 rounded-lg bg-[#0A192F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] border border-[#2A3F5F]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          {query && (
            <button 
              onClick={() => onQueryChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-[#152A4A]"
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
        <button 
          className="ml-3 px-4 py-2.5 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition-colors"
          onClick={onSearch}
        >
          搜索
        </button>
      </div>
      
      {/* Filter controls */}
      <div className="flex flex-wrap gap-3">
        {/* Category dropdown */}
        <div className="relative" ref={categoryDropdownRef}>
          <button 
            className="px-3 py-2 flex items-center bg-[#0A192F] rounded-lg hover:bg-[#152A4A] transition-colors border border-[#2A3F5F] min-w-[120px]"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          >
            <Filter size={14} className="mr-2 text-gray-400" />
            <span className="flex-1 text-left">
              {selectedCategories.length === 0 
                ? '全部分类' 
                : selectedCategories.length === 1 
                  ? selectedCategories[0] 
                  : `已选 ${selectedCategories.length} 项`
              }
            </span>
            <ChevronDown size={14} className="ml-2 text-gray-400" />
          </button>
          
          {showCategoryDropdown && (
            <div className="absolute z-10 mt-2 w-64 rounded-lg border border-[#2A3F5F] bg-[#0A192F] shadow-lg">
              <div className="p-2 max-h-[300px] overflow-y-auto">
                {categories.map((category) => (
                  <div 
                    key={category}
                    className="flex items-center px-3 py-2 hover:bg-[#152A4A] rounded-md cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    <div className={`w-4 h-4 border rounded mr-2 ${
                      selectedCategories.includes(category) 
                        ? 'bg-[#1E88E5] border-[#1E88E5] flex items-center justify-center' 
                        : 'border-[#2A3F5F]'
                    }`}>
                      {selectedCategories.includes(category) && (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      )}
                    </div>
                    <span>{category}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between p-2 border-t border-[#2A3F5F]">
                <button 
                  className="text-sm text-gray-400 hover:text-white px-3 py-1"
                  onClick={() => onCategoryChange([])}
                >
                  清除选择
                </button>
                <button 
                  className="text-sm text-[#1E88E5] hover:text-[#1976D2] px-3 py-1"
                  onClick={() => setShowCategoryDropdown(false)}
                >
                  确定
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Sort dropdown */}
        <div className="relative" ref={sortDropdownRef}>
          <button 
            className="px-3 py-2 flex items-center bg-[#0A192F] rounded-lg hover:bg-[#152A4A] transition-colors border border-[#2A3F5F] min-w-[120px]"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <SortDesc size={14} className="mr-2 text-gray-400" />
            <span className="flex-1 text-left">{sortOptionLabels[sortOption]}</span>
            <ChevronDown size={14} className="ml-2 text-gray-400" />
          </button>
          
          {showSortDropdown && (
            <div className="absolute z-10 mt-2 w-40 rounded-lg border border-[#2A3F5F] bg-[#0A192F] shadow-lg">
              {(Object.keys(sortOptionLabels) as SortOption[]).map((option) => (
                <div 
                  key={option}
                  className={`px-4 py-2 hover:bg-[#152A4A] cursor-pointer ${option === sortOption ? 'text-[#1E88E5]' : ''}`}
                  onClick={() => {
                    onSortChange(option)
                    setShowSortDropdown(false)
                  }}
                >
                  {sortOptionLabels[option]}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Time range dropdown */}
        <div className="relative" ref={timeDropdownRef}>
          <button 
            className="px-3 py-2 flex items-center bg-[#0A192F] rounded-lg hover:bg-[#152A4A] transition-colors border border-[#2A3F5F] min-w-[120px]"
            onClick={() => setShowTimeDropdown(!showTimeDropdown)}
          >
            <span className="flex-1 text-left">{timeRangeLabels[timeRange]}</span>
            <ChevronDown size={14} className="ml-2 text-gray-400" />
          </button>
          
          {showTimeDropdown && (
            <div className="absolute z-10 mt-2 w-40 rounded-lg border border-[#2A3F5F] bg-[#0A192F] shadow-lg">
              {(Object.keys(timeRangeLabels) as TimeRange[]).map((range) => (
                <div 
                  key={range}
                  className={`px-4 py-2 hover:bg-[#152A4A] cursor-pointer ${range === timeRange ? 'text-[#1E88E5]' : ''}`}
                  onClick={() => {
                    onTimeRangeChange(range)
                    setShowTimeDropdown(false)
                  }}
                >
                  {timeRangeLabels[range]}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Reset button */}
        <button 
          className="px-3 py-2 text-sm text-gray-300 hover:text-white"
          onClick={onReset}
        >
          重置筛选
        </button>
      </div>
      
      {/* Active filters display */}
      {selectedCategories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedCategories.map(category => (
            <div 
              key={category}
              className="flex items-center bg-[#1E88E5]/20 text-[#1E88E5] px-2 py-1 rounded-full text-xs"
            >
              <span>{category}</span>
              <button 
                className="ml-1.5 p-0.5 rounded-full hover:bg-[#1E88E5]/30"
                onClick={() => toggleCategory(category)}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReportSearchFilters 