"use client"

import React from 'react'
import { BarChart2, TrendingUp, TrendingDown, Activity } from 'lucide-react'

export interface VolumeData {
  label: string
  value: string
  change: number
  changePercent: number
  icon?: React.ReactNode
}

interface VolumeIndicatorsProps {
  data: VolumeData[]
  className?: string
}

export default function VolumeIndicators({ data, className = '' }: VolumeIndicatorsProps) {
  return (
    <div className={`bg-[#152A4A] rounded-xl overflow-hidden ${className}`}>
      <div className="p-4 border-b border-[#2A3F5F]">
        <h2 className="text-lg font-semibold flex items-center">
          <BarChart2 size={18} className="mr-2 text-gray-400" />
          成交量指标
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {data.map((item, index) => (
          <div 
            key={index} 
            className="bg-[#0A192F] rounded-lg p-4 flex flex-col"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{item.label}</span>
              <div className="text-gray-400">
                {item.icon || <Activity size={16} />}
              </div>
            </div>
            
            <div className="text-xl font-semibold mb-1">
              {item.value}
            </div>
            
            <div className={`text-sm flex items-center ${item.change >= 0 ? 'text-[#E15241]' : 'text-[#03A66D]'}`}>
              {item.change >= 0 ? (
                <TrendingUp size={14} className="mr-1" />
              ) : (
                <TrendingDown size={14} className="mr-1" />
              )}
              <span>
                {item.change >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}% 较上月
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 