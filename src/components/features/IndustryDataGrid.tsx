"use client"

import { useState } from 'react'
import { ArrowDown, ArrowUp, Download, Search, X } from 'lucide-react'

export interface DataColumn {
  id: string
  header: string
  accessor: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  format?: (value: string | number | boolean) => string | React.ReactNode
}

export interface DataRow {
  id: string
  [key: string]: string | number | boolean | null | undefined
}

interface IndustryDataGridProps {
  columns: DataColumn[]
  data: DataRow[]
  isLoading?: boolean
  onExport?: () => void
}

const IndustryDataGrid = ({
  columns,
  data,
  isLoading = false,
  onExport
}: IndustryDataGridProps) => {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Handle column header click for sorting
  const handleSort = (columnId: string) => {
    const column = columns.find(col => col.id === columnId)
    if (!column || column.sortable === false) return
    
    if (sortBy === columnId) {
      // Toggle direction if already sorting by this column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new sort column and default to ascending
      setSortBy(columnId)
      setSortDirection('asc')
    }
  }
  
  // Sort and filter data
  const filteredAndSortedData = data
    .filter(row => {
      if (!searchQuery) return true
      
      // Search in all string fields
      return Object.values(row).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery.toLowerCase())
        }
        return false
      })
    })
    .sort((a, b) => {
      if (!sortBy) return 0
      
      const valueA = a[sortBy]
      const valueB = b[sortBy]
      
      if (valueA === valueB) return 0
      
      if (valueA === null || valueA === undefined) return 1
      if (valueB === null || valueB === undefined) return -1
      
      let result: number
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        result = valueA.localeCompare(valueB)
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        result = valueA - valueB
      } else {
        // Convert to string for comparison if different types
        result = String(valueA).localeCompare(String(valueB))
      }
        
      return sortDirection === 'asc' ? result : -result
    })
  
  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="bg-[#152A4A] rounded-xl overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b border-[#2A3F5F]">
          <div className="h-10 w-64 bg-[#0A192F] rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-[#0A192F] rounded animate-pulse"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#0A192F]">
                {columns.map(column => (
                  <th 
                    key={column.id}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-300"
                    style={{ width: column.width || 'auto' }}
                  >
                    <div className="h-4 bg-[#152A4A] rounded w-20 animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-[#2A3F5F] last:border-b-0">
                  {columns.map((column, colIndex) => (
                    <td key={`${rowIndex}-${colIndex}`} className="px-4 py-3">
                      <div className="h-4 bg-[#152A4A] rounded w-16 animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  return (
    <div className="bg-[#152A4A] rounded-xl overflow-hidden">
      {/* Header with search and export */}
      <div className="p-4 flex flex-wrap gap-3 items-center border-b border-[#2A3F5F]">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索数据..."
            className="w-full py-2 px-4 pl-10 rounded-lg bg-[#0A192F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] border border-[#2A3F5F]"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-[#152A4A]"
            >
              <X size={16} className="text-gray-400" />
            </button>
          )}
        </div>
        {onExport && (
          <button 
            className="px-4 py-2 flex items-center bg-[#0A192F] rounded-lg hover:bg-[#152A4A] transition-colors border border-[#2A3F5F]"
            onClick={onExport}
          >
            <Download size={16} className="mr-2" />
            导出数据
          </button>
        )}
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#0A192F]">
              {columns.map(column => (
                <th 
                  key={column.id}
                  className={`px-4 py-3 text-sm font-medium text-gray-300 ${
                    column.sortable !== false ? 'cursor-pointer hover:bg-[#152A4A]' : ''
                  } ${
                    column.align === 'center' ? 'text-center' : 
                    column.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                  style={{ width: column.width || 'auto' }}
                  onClick={() => handleSort(column.id)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.header}</span>
                    {column.sortable !== false && sortBy === column.id && (
                      sortDirection === 'asc' ? 
                        <ArrowUp size={14} /> : 
                        <ArrowDown size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400">
                  {searchQuery ? '没有找到匹配的数据' : '暂无数据'}
                </td>
              </tr>
            ) : (
              filteredAndSortedData.map((row, rowIndex) => (
                <tr 
                  key={row.id || rowIndex} 
                  className="border-b border-[#2A3F5F] last:border-b-0 hover:bg-[#0A192F] transition-colors"
                >
                  {columns.map(column => (
                    <td 
                      key={`${row.id}-${column.id}`} 
                      className={`px-4 py-3 ${
                        column.align === 'center' ? 'text-center' : 
                        column.align === 'right' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {column.format 
                        ? column.format(row[column.accessor]) 
                        : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default IndustryDataGrid 