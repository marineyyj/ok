"use client"

import React, { useState } from 'react'
import { LineChart, CandlestickChart, Calendar } from 'lucide-react'
import Image from 'next/image'

export type ChartType = 'line' | 'candlestick'
export type TimeFrame = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | '5Y' | 'MAX'

interface ChartContainerProps {
  title: string
  indexName: string
  currentValue: number
  changePercent: number
  change: number
  className?: string
}

export default function ChartContainer({
  title,
  indexName,
  currentValue,
  changePercent,
  change,
  className = ''
}: ChartContainerProps) {
  const [chartType, setChartType] = useState<ChartType>('line')
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1D')
  
  // Format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  
  // Available time frames
  const timeFrames: TimeFrame[] = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y', 'MAX']
  
  return (
    <div className={`bg-[#152A4A] rounded-xl overflow-hidden ${className}`}>
      <div className="p-4 border-b border-[#2A3F5F]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded ${chartType === 'line' ? 'bg-[#0A192F] text-blue-400' : 'text-gray-400 hover:bg-[#0A192F]/60'}`}
              title="线形图"
            >
              <LineChart size={18} />
            </button>
            <button
              onClick={() => setChartType('candlestick')}
              className={`p-1.5 rounded ${chartType === 'candlestick' ? 'bg-[#0A192F] text-blue-400' : 'text-gray-400 hover:bg-[#0A192F]/60'}`}
              title="K线图"
            >
              <CandlestickChart size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <div className="flex items-baseline gap-3">
            <h3 className="text-2xl font-bold">{indexName}</h3>
            <div className="text-lg font-medium">{formatNumber(currentValue)}</div>
            <div className={`flex items-center ${changePercent >= 0 ? 'text-[#E15241]' : 'text-[#03A66D]'}`}>
              <span>{changePercent >= 0 ? '+' : ''}{formatNumber(change)}</span>
              <span className="mx-1">|</span>
              <span>{changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%</span>
            </div>
          </div>
          <div className="text-sm text-gray-400 mt-1">
            <Calendar size={14} className="inline mr-1" />
            <span>截至 {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        
        {/* Chart placeholder */}
        <div className="relative h-[300px] bg-[#0A192F] rounded-lg overflow-hidden mb-4">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            {chartType === 'line' ? (
              <Image 
                src="https://picsum.photos/800/300?random=1" 
                alt="线形图示例" 
                width={800} 
                height={300}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image 
                src="https://picsum.photos/800/300?random=2" 
                alt="K线图示例" 
                width={800} 
                height={300}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        
        {/* Time frame selector */}
        <div className="flex flex-wrap gap-2">
          {timeFrames.map(tf => (
            <button
              key={tf}
              onClick={() => setTimeFrame(tf)}
              className={`px-3 py-1 text-sm rounded-md ${
                timeFrame === tf 
                  ? 'bg-[#1E88E5] text-white' 
                  : 'bg-[#0A192F] text-gray-300 hover:bg-[#13233e]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 