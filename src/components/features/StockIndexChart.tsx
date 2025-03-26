"use client"

import { TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { FilterButton } from '@/components/shared/Controls'

interface StockIndexChartProps {
  indexName: string
  indexCode: string
  currentValue: string
  changePercent: string
  isUp: boolean
  openValue: string
  highValue: string
  lowValue: string
  prevCloseValue: string
  volume: string
  chartImageUrl: string
  timeRanges: string[]
  activeTimeRange: string
  onTimeRangeChange?: (range: string) => void
  performanceMetrics?: {
    period: string
    change: string
    isUp: boolean
  }[]
}

const StockIndexChart = ({
  indexName,
  indexCode,
  currentValue,
  changePercent,
  isUp,
  openValue,
  highValue,
  lowValue,
  prevCloseValue,
  volume,
  chartImageUrl,
  timeRanges,
  activeTimeRange,
  onTimeRangeChange,
  performanceMetrics = []
}: StockIndexChartProps) => {
  // Color styling for up/down indicators
  const upColor = "text-[#0FAF54]"  // Green for upward trend
  const downColor = "text-[#E34D44]" // Red for downward trend
  
  return (
    <div className="bg-[#152A4A] p-5 rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold">{indexName}</h2>
          <span className="text-sm text-gray-300">{indexCode}</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-xl font-bold">{currentValue}</div>
          <div className={`flex items-center ${isUp ? upColor : downColor}`}>
            <span>{changePercent}</span>
            <TrendingUp size={16} className={`ml-1 ${!isUp ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-3 text-sm">
          <div>
            <span className="text-gray-300">今开：</span>
            <span>{openValue}</span>
          </div>
          <div>
            <span className="text-gray-300">最高：</span>
            <span className={upColor}>{highValue}</span>
          </div>
          <div>
            <span className="text-gray-300">最低：</span>
            <span className={downColor}>{lowValue}</span>
          </div>
          <div>
            <span className="text-gray-300">昨收：</span>
            <span>{prevCloseValue}</span>
          </div>
        </div>
        <div className="text-sm">
          <span className="text-gray-300">成交量：</span>
          <span>{volume}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex space-x-2 mb-4">
          {timeRanges.map((timeRange) => (
            <FilterButton 
              key={timeRange}
              label={timeRange}
              active={timeRange === activeTimeRange}
              onClick={() => onTimeRangeChange && onTimeRangeChange(timeRange)}
            />
          ))}
        </div>
        
        <div className="h-[360px] relative">
          <Image 
            src={chartImageUrl} 
            alt={`${indexName} chart for ${activeTimeRange} period`} 
            width={1000} 
            height={360}
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
      
      {performanceMetrics.length > 0 && (
        <div className="grid grid-cols-5 gap-4 text-sm">
          {performanceMetrics.map((metric, index) => (
            <div key={index}>
              <div className="text-gray-300">{metric.period}涨跌</div>
              <div className={`${metric.isUp ? upColor : downColor} flex items-center`}>
                <span>{metric.change}</span>
                <TrendingUp size={14} className={`ml-1 ${!metric.isUp ? 'rotate-180' : ''}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StockIndexChart 