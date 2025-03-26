"use client"

import Image from 'next/image'
import { RefreshCw, Download, Maximize2 } from 'lucide-react'

interface ChartProps {
  title: string
  height?: number
  imageUrl: string
  showControls?: boolean
  lastUpdated?: string
}

const Charts = ({
  title,
  height = 250,
  imageUrl,
  showControls = true,
  lastUpdated
}: ChartProps) => {
  return (
    <div className="bg-[#152A4A] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">{title}</h3>
        {showControls && (
          <div className="flex items-center space-x-2">
            <button className="p-1.5 rounded-full hover:bg-[#1a3056]">
              <RefreshCw size={14} />
            </button>
            <button className="p-1.5 rounded-full hover:bg-[#1a3056]">
              <Download size={14} />
            </button>
            <button className="p-1.5 rounded-full hover:bg-[#1a3056]">
              <Maximize2 size={14} />
            </button>
          </div>
        )}
      </div>
      
      <div className={`h-[${height}px] relative`} style={{ height: `${height}px` }}>
        <Image 
          src={imageUrl} 
          alt={`${title} chart`} 
          width={800} 
          height={height}
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      {lastUpdated && (
        <div className="mt-3 text-xs text-gray-300">
          更新于 {lastUpdated}
        </div>
      )}
    </div>
  )
}

export default Charts 