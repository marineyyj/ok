"use client"

import { RefreshCw, BarChart2, ArrowUp, ArrowDown } from 'lucide-react'
import { useState } from 'react'

// Define the type for a stock index item
interface StockIndex {
  id: number
  name: string
  code: string
  value: string
  change: string
  changeValue: string
  isUp: boolean
  volume: string
}

interface StockIndicesTableProps {
  indices: StockIndex[]
  onRefresh?: () => void
  onSelectIndex?: (index: StockIndex) => void
}

type SortField = 'name' | 'value' | 'change' | 'volume'
type SortDirection = 'asc' | 'desc'

const StockIndicesTable = ({
  indices,
  onRefresh,
  onSelectIndex
}: StockIndicesTableProps) => {
  // State for sorting
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  
  // Handle sort change
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new field and default to ascending
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  // Sort indices based on current sort field and direction
  const sortedIndices = [...indices].sort((a, b) => {
    let comparison = 0
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name)
    } else if (sortField === 'value') {
      // Remove commas and convert to number for numeric sorting
      const aValue = parseFloat(a.value.replace(/,/g, ''))
      const bValue = parseFloat(b.value.replace(/,/g, ''))
      comparison = aValue - bValue
    } else if (sortField === 'change') {
      // Extract percentage values for sorting
      const aChange = parseFloat(a.change.replace(/%/g, '').replace(/[+]/g, ''))
      const bChange = parseFloat(b.change.replace(/%/g, '').replace(/[+]/g, ''))
      comparison = aChange - bChange
    } else if (sortField === 'volume') {
      // Simple string comparison for now (could be enhanced for proper volume comparison)
      comparison = a.volume.localeCompare(b.volume)
    }
    
    // Reverse for descending order
    return sortDirection === 'asc' ? comparison : -comparison
  })
  
  // Color styling for up/down values
  const upColor = "text-[#0FAF54]"  // Green for upward trend
  const downColor = "text-[#E34D44]" // Red for downward trend
  
  return (
    <div className="bg-[#152A4A] p-5 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">全部指数</h2>
        <div className="flex items-center space-x-2">
          <button 
            className="flex items-center text-sm bg-[#0A192F] py-1.5 px-3 rounded-lg hover:bg-[#1a3056]"
            onClick={() => handleSort('value')}
          >
            <BarChart2 size={14} className="mr-1.5" />
            排序
            {sortField === 'value' && (
              sortDirection === 'asc' 
                ? <ArrowUp size={14} className="ml-1.5" />
                : <ArrowDown size={14} className="ml-1.5" />
            )}
          </button>
          <button 
            className="flex items-center text-sm text-gray-300 hover:text-white"
            onClick={onRefresh}
          >
            <RefreshCw size={14} className="mr-1.5" />
            刷新
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 divide-y divide-[#0A192F]/30">
        {/* Table Header */}
        <div className="grid grid-cols-12 py-3 text-sm text-gray-300">
          <div 
            className="col-span-3 cursor-pointer hover:text-white flex items-center"
            onClick={() => handleSort('name')}
          >
            指数名称
            {sortField === 'name' && (
              sortDirection === 'asc' 
                ? <ArrowUp size={14} className="ml-1.5" />
                : <ArrowDown size={14} className="ml-1.5" />
            )}
          </div>
          <div 
            className="col-span-2 text-right cursor-pointer hover:text-white flex items-center justify-end"
            onClick={() => handleSort('value')}
          >
            最新价
            {sortField === 'value' && (
              sortDirection === 'asc' 
                ? <ArrowUp size={14} className="ml-1.5" />
                : <ArrowDown size={14} className="ml-1.5" />
            )}
          </div>
          <div 
            className="col-span-2 text-right cursor-pointer hover:text-white flex items-center justify-end"
            onClick={() => handleSort('change')}
          >
            涨跌幅
            {sortField === 'change' && (
              sortDirection === 'asc' 
                ? <ArrowUp size={14} className="ml-1.5" />
                : <ArrowDown size={14} className="ml-1.5" />
            )}
          </div>
          <div className="col-span-2 text-right">涨跌额</div>
          <div 
            className="col-span-3 text-right cursor-pointer hover:text-white flex items-center justify-end"
            onClick={() => handleSort('volume')}
          >
            成交量
            {sortField === 'volume' && (
              sortDirection === 'asc' 
                ? <ArrowUp size={14} className="ml-1.5" />
                : <ArrowDown size={14} className="ml-1.5" />
            )}
          </div>
        </div>
        
        {/* Table Body */}
        {sortedIndices.map((index) => (
          <div 
            key={index.id} 
            className="grid grid-cols-12 py-3 hover:bg-[#0A192F]/20 cursor-pointer"
            onClick={() => onSelectIndex && onSelectIndex(index)}
          >
            <div className="col-span-3">
              <div>{index.name}</div>
              <div className="text-xs text-gray-400">{index.code}</div>
            </div>
            <div className="col-span-2 text-right font-medium">
              {index.value}
            </div>
            <div className={`col-span-2 text-right ${index.isUp ? upColor : downColor}`}>
              {index.change}
            </div>
            <div className={`col-span-2 text-right ${index.isUp ? upColor : downColor}`}>
              {index.changeValue}
            </div>
            <div className="col-span-3 text-right text-gray-300">
              {index.volume}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StockIndicesTable 