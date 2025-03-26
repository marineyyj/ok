"use client"

import { useState, useEffect, useRef } from 'react'
import { Search, X, Clock, Trash2 } from 'lucide-react'

interface CompanySearchInputProps {
  onSearch: (query: string) => void
  onClear: () => void
  initialValue?: string
  searchHistory?: string[]
  onHistoryItemClick?: (item: string) => void
  onClearHistory?: () => void
}

export default function CompanySearchInput({
  onSearch,
  onClear,
  initialValue = '',
  searchHistory = [],
  onHistoryItemClick,
  onClearHistory
}: CompanySearchInputProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue)
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }
  
  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
      setIsHistoryOpen(false)
    }
  }
  
  // Handle clear button click
  const handleClear = () => {
    setSearchQuery('')
    onClear()
  }
  
  // Handle history item click
  const handleHistoryClick = (item: string) => {
    setSearchQuery(item)
    onHistoryItemClick?.(item)
    setIsHistoryOpen(false)
  }
  
  // Close history dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsHistoryOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchRef])
  
  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            value={searchQuery}
            onChange={handleChange}
            onFocus={() => searchHistory.length > 0 && setIsHistoryOpen(true)}
            placeholder="输入公司名称、股票代码或行业" 
            className="w-full py-3 px-5 pl-12 rounded-lg bg-[#152A4A] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          
          {searchQuery && (
            <button 
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button 
          type="submit"
          className="bg-[#1E88E5] text-white px-6 py-3 rounded-lg hover:bg-[#1976D2] transition-colors"
        >
          搜索
        </button>
      </form>
      
      {/* Search history dropdown */}
      {isHistoryOpen && searchHistory.length > 0 && (
        <div className="absolute z-10 mt-2 w-full bg-[#152A4A] rounded-lg overflow-hidden shadow-lg">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#2A3F5F]">
            <h3 className="text-sm font-medium flex items-center">
              <Clock size={14} className="mr-2 text-gray-400" />
              搜索记录
            </h3>
            {onClearHistory && (
              <button 
                onClick={onClearHistory}
                className="text-gray-400 hover:text-gray-200 p-1"
                title="清除所有记录"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
          <ul>
            {searchHistory.map((item, index) => (
              <li 
                key={index} 
                className="px-4 py-2 hover:bg-[#0A192F] cursor-pointer flex items-center"
                onClick={() => handleHistoryClick(item)}
              >
                <Clock size={14} className="mr-2 text-gray-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 