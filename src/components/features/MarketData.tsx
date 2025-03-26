"use client"

import { ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react'
import Image from 'next/image'

// Mock data
const marketIndices = [
  { id: 1, name: '上证指数', value: '3,587.12', change: '+0.68%', isUp: true },
  { id: 2, name: '深证成指', value: '14,208.78', change: '+1.02%', isUp: true },
  { id: 3, name: '创业板指', value: '3,187.45', change: '-0.34%', isUp: false },
  { id: 4, name: '沪深300', value: '5,124.78', change: '+0.85%', isUp: true },
  { id: 5, name: '中证500', value: '7,356.21', change: '-0.12%', isUp: false },
]

const MarketData = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">市场数据</h2>
        <button className="flex items-center text-sm text-gray-300 hover:text-white">
          <RefreshCw size={14} className="mr-1" />
          刷新
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketIndices.map((index) => (
          <div 
            key={index.id} 
            className="bg-[#152A4A] rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{index.name}</h3>
                <p className="text-2xl font-bold mt-1">{index.value}</p>
              </div>
              <div className={`flex items-center ${index.isUp ? 'text-[#4CAF50]' : 'text-[#F44336]'}`}>
                <span className="text-lg font-medium">{index.change}</span>
                {index.isUp ? (
                  <ArrowUpRight size={20} className="ml-1" />
                ) : (
                  <ArrowDownRight size={20} className="ml-1" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-[#152A4A] rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">市场趋势</h3>
          <div className="flex space-x-2">
            <button className="bg-[#0A192F] text-white px-3 py-1 rounded-full text-xs">日内</button>
            <button className="bg-[#1E88E5] text-white px-3 py-1 rounded-full text-xs">周度</button>
            <button className="bg-[#0A192F] text-white px-3 py-1 rounded-full text-xs">月度</button>
          </div>
        </div>
        <div className="h-[250px] relative">
          <Image 
            src="https://picsum.photos/800/250" 
            alt="Market trend chart" 
            width={800} 
            height={250}
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
    </div>
  )
}

export default MarketData 