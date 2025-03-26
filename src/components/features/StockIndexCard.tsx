"use client"

import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface StockIndexCardProps {
  name: string
  code: string
  value: string
  change: string
  changeValue: string
  isUp: boolean
  onClick?: () => void
  highlight?: boolean
}

const StockIndexCard = ({
  name,
  code,
  value,
  change,
  changeValue,
  isUp,
  onClick,
  highlight = false
}: StockIndexCardProps) => {
  // Use different color coding for up/down values
  const upColor = "text-[#0FAF54]"  // Green for upward trend
  const downColor = "text-[#E34D44]" // Red for downward trend
  
  return (
    <div 
      className={`bg-[#152A4A] rounded-lg p-4 hover:shadow-lg transition-shadow border-l-4 
        ${highlight ? (isUp ? 'border-[#0FAF54]' : 'border-[#E34D44]') : 'border-transparent hover:border-[#1E88E5]'}
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-300">{name}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`flex items-center ${isUp ? upColor : downColor}`}>
          <span className="text-lg font-medium">{change}</span>
          {isUp ? (
            <ArrowUpRight size={20} className="ml-1" />
          ) : (
            <ArrowDownRight size={20} className="ml-1" />
          )}
        </div>
      </div>
      <div className="mt-3 flex justify-between text-sm">
        <span className="text-gray-300">{code}</span>
        <span className={isUp ? upColor : downColor}>{changeValue}</span>
      </div>
    </div>
  )
}

export default StockIndexCard 