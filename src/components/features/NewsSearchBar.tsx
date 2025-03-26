"use client"

import { Search, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface NewsSearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  initialValue?: string
  className?: string
}

const NewsSearchBar = ({
  onSearch,
  placeholder = '搜索公司新闻、公告、报告...',
  initialValue = '',
  className = ''
}: NewsSearchBarProps) => {
  const [value, setValue] = useState(initialValue)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Handle search on Enter key or when the value is empty (clear)
  const handleSearch = () => {
    onSearch(value)
  }
  
  // Clear the search input
  const handleClear = () => {
    setValue('')
    onSearch('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }
  
  // Submit search on Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  
  // Handle initial value changes from props
  useEffect(() => {
    if (initialValue !== value) {
      setValue(initialValue)
    }
  }, [initialValue])
  
  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full py-3 px-4 pl-12 rounded-lg bg-[#0A192F] text-white placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-[#1E88E5] transition-shadow ${isFocused ? 'shadow-lg' : 'shadow-md'}`}
      />
      <Search 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
        size={18} 
      />
      
      {value && (
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}

export default NewsSearchBar 