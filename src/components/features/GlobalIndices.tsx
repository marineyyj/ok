"use client"

import { RefreshCw } from 'lucide-react'

interface GlobalIndex {
  id: number
  name: string
  value: string
  change: string
  changeValue: string
  isUp: boolean
}

interface GlobalIndicesProps {
  indices: GlobalIndex[]
  onRefresh?: () => void
  onSelectIndex?: (index: GlobalIndex) => void
  className?: string
}

const GlobalIndices = ({
  indices,
  onRefresh,
  onSelectIndex,
  className = ''
}: GlobalIndicesProps) => {
  // Color styling for up/down indicators
  const upColor = "text-[#0FAF54]"  // Green for upward trend
  const downColor = "text-[#E34D44]" // Red for downward trend
  
  return (
    <div className={`bg-[#152A4A] p-5 rounded-xl ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">全球指数</h2>
        <button 
          className="flex items-center text-sm text-gray-300 hover:text-white"
          onClick={onRefresh}
        >
          <RefreshCw size={14} className="mr-1.5" />
          刷新
        </button>
      </div>
      
      <div className="space-y-4">
        {indices.map((index) => (
          <div 
            key={index.id} 
            className="bg-[#0A192F] p-3 rounded-lg flex justify-between items-center hover:bg-[#13233e] transition-colors cursor-pointer"
            onClick={() => onSelectIndex && onSelectIndex(index)}
          >
            <div>
              <div className="font-medium">{index.name}</div>
              <div className="text-sm text-gray-400 mt-1">{index.value}</div>
            </div>
            <div className={`text-right ${index.isUp ? upColor : downColor}`}>
              <div>{index.change}</div>
              <div className="text-sm mt-1">{index.changeValue}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GlobalIndices 