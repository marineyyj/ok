"use client"

import { Filter, ChevronDown, Calendar, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

export type NewsCategory = '全部' | '公司公告' | '财务报告' | '业绩预告' | '投资者关系' | '产品动态' | '人事变动' | '行业新闻'
export type TimePeriod = '全部时间' | '今日' | '本周' | '本月' | '本季度' | '本年度'

interface NewsFiltersProps {
  categories: NewsCategory[]
  activeCategory: NewsCategory
  onCategoryChange: (category: NewsCategory) => void
  timePeriods: TimePeriod[]
  activeTimePeriod: TimePeriod
  onTimePeriodChange: (period: TimePeriod) => void
  onFilterClick?: () => void
  className?: string
}

const NewsFilters = ({
  categories = ['全部'],
  activeCategory = '全部',
  onCategoryChange,
  timePeriods = ['全部时间'],
  activeTimePeriod = '全部时间',
  onTimePeriodChange,
  onFilterClick,
  className = ''
}: NewsFiltersProps) => {
  const [showTimePeriods, setShowTimePeriods] = useState(false)
  
  // Add global styles for hiding scrollbars, but only in the browser
  useEffect(() => {
    const styleElement = document.createElement('style')
    styleElement.innerHTML = `
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `
    document.head.appendChild(styleElement)
    
    // Cleanup function to remove the style when component unmounts
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])
  
  return (
    <div className={`bg-[#152A4A] p-4 rounded-lg ${className}`}>
      <div className="flex flex-wrap justify-between items-center gap-4">
        {/* Category Filters */}
        <div className="flex-1 overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button 
                key={category}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors
                  ${category === activeCategory 
                    ? 'bg-[#1E88E5] text-white' 
                    : 'bg-[#0A192F] text-gray-300 hover:bg-[#13233e]'
                  }`}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Time Period & Filter */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className="relative">
            <button 
              className="flex items-center text-sm bg-[#0A192F] py-1.5 px-3 rounded-lg hover:bg-[#13233e]"
              onClick={() => setShowTimePeriods(!showTimePeriods)}
            >
              <Calendar size={14} className="mr-1.5" />
              {activeTimePeriod}
              <ChevronDown size={14} className={`ml-1.5 transition-transform ${showTimePeriods ? 'rotate-180' : ''}`} />
            </button>
            
            {showTimePeriods && (
              <div className="absolute right-0 top-full mt-2 bg-[#0A192F] rounded-lg shadow-lg z-10 w-[140px] py-1">
                {timePeriods.map((period) => (
                  <button 
                    key={period}
                    className={`w-full text-left px-4 py-2 text-sm ${
                      period === activeTimePeriod 
                        ? 'bg-[#1E88E5]/20 text-[#1E88E5]' 
                        : 'text-gray-300 hover:bg-[#152A4A]'
                    }`}
                    onClick={() => {
                      onTimePeriodChange(period)
                      setShowTimePeriods(false)
                    }}
                  >
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2" />
                      {period}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {onFilterClick && (
            <button 
              className="flex items-center text-sm bg-[#0A192F] py-1.5 px-3 rounded-lg hover:bg-[#13233e]"
              onClick={onFilterClick}
            >
              <Filter size={14} className="mr-1.5" />
              高级筛选
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsFilters 