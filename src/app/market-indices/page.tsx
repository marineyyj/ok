"use client"

import StockIndexCard from '@/components/features/StockIndexCard'
import StockIndexChart from '@/components/features/StockIndexChart'
import StockIndicesTable from '@/components/features/StockIndicesTable'
import GlobalIndices from '@/components/features/GlobalIndices'
import Image from 'next/image'
import { Clock, RefreshCw } from 'lucide-react'
import { useState } from 'react'

// Mock data for market indices
const marketIndices = [
  { id: 1, name: '上证指数', code: 'SH000001', value: '3,587.12', change: '+0.68%', changeValue: '+24.16', isUp: true, volume: '3,289亿' },
  { id: 2, name: '深证成指', code: 'SZ399001', value: '14,208.78', change: '+1.02%', changeValue: '+143.54', isUp: true, volume: '4,103亿' },
  { id: 3, name: '创业板指', code: 'SZ399006', value: '3,187.45', change: '-0.34%', changeValue: '-10.92', isUp: false, volume: '1,872亿' },
  { id: 4, name: '沪深300', code: 'SH000300', value: '5,124.78', change: '+0.85%', changeValue: '+43.14', isUp: true, volume: '2,756亿' },
  { id: 5, name: '中证500', code: 'SH000905', value: '7,356.21', change: '-0.12%', changeValue: '-8.82', isUp: false, volume: '1,950亿' },
  { id: 6, name: '科创50', code: 'SH000688', value: '1,256.78', change: '+1.24%', changeValue: '+15.40', isUp: true, volume: '985亿' },
  { id: 7, name: '上证50', code: 'SH000016', value: '3,412.67', change: '+0.76%', changeValue: '+25.78', isUp: true, volume: '1,542亿' },
  { id: 8, name: '中小板指', code: 'SZ399005', value: '10,567.34', change: '-0.22%', changeValue: '-23.45', isUp: false, volume: '2,145亿' },
]

// Global stock indices
const globalIndices = [
  { id: 1, name: '道琼斯指数', value: '38,372.21', change: '+0.86%', changeValue: '+327.15', isUp: true },
  { id: 2, name: '纳斯达克指数', value: '16,742.39', change: '+1.12%', changeValue: '+185.92', isUp: true },
  { id: 3, name: '标普500指数', value: '5,187.67', change: '+0.75%', changeValue: '+38.65', isUp: true },
  { id: 4, name: '日经225指数', value: '39,523.55', change: '-0.34%', changeValue: '-135.21', isUp: false },
  { id: 5, name: '恒生指数', value: '17,921.36', change: '-0.56%', changeValue: '-101.23', isUp: false },
  { id: 6, name: '富时100指数', value: '8,210.45', change: '+0.44%', changeValue: '+36.12', isUp: true },
]

// Time range options for chart display
const timeRangeOptions = ['日内', '5日', '1月', '3月', '6月', '1年', '5年', '全部']

// Performance metrics
const performanceMetrics = [
  { period: '5日', change: '+3.42%', isUp: true },
  { period: '1月', change: '+6.18%', isUp: true },
  { period: '3月', change: '-2.45%', isUp: false },
  { period: '6月', change: '+8.72%', isUp: true },
  { period: '年初至今', change: '+12.34%', isUp: true },
]

export default function MarketIndicesPage() {
  const [activeTimeRange, setActiveTimeRange] = useState('1月')
  const [selectedIndex, setSelectedIndex] = useState(marketIndices[3]) // Default to 沪深300
  
  const handleRefresh = () => {
    // In a real app, this would fetch fresh data
    console.log('Refreshing data...')
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">股指信息</h1>
        <div className="flex items-center space-x-3 text-sm text-gray-300">
          <div className="flex items-center">
            <Clock size={14} className="mr-1.5" />
            <span>更新于 2023-04-01 15:30:00</span>
          </div>
          <button className="flex items-center text-[#1E88E5] hover:text-[#1976D2] transition-colors" onClick={handleRefresh}>
            <RefreshCw size={14} className="mr-1.5" />
            刷新数据
          </button>
        </div>
      </div>
      
      {/* Market Overview Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {marketIndices.slice(0, 4).map((index) => (
          <StockIndexCard 
            key={index.id}
            name={index.name}
            code={index.code}
            value={index.value}
            change={index.change}
            changeValue={index.changeValue}
            isUp={index.isUp}
            onClick={() => setSelectedIndex(index)}
            highlight={selectedIndex.id === index.id}
          />
        ))}
      </div>
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Selected Index Chart Panel */}
          <StockIndexChart 
            indexName={selectedIndex.name}
            indexCode={selectedIndex.code}
            currentValue={selectedIndex.value}
            changePercent={selectedIndex.change}
            isUp={selectedIndex.isUp}
            openValue="5,081.64"
            highValue="5,136.92"
            lowValue="5,072.45"
            prevCloseValue="5,081.64"
            volume={selectedIndex.volume}
            chartImageUrl="https://picsum.photos/1000/360?random=10"
            timeRanges={timeRangeOptions}
            activeTimeRange={activeTimeRange}
            onTimeRangeChange={setActiveTimeRange}
            performanceMetrics={performanceMetrics}
          />
          
          {/* All Indices Table Panel */}
          <StockIndicesTable 
            indices={marketIndices}
            onRefresh={handleRefresh}
            onSelectIndex={setSelectedIndex}
          />
        </div>
        
        <div className="space-y-6">
          {/* Global Indices Panel */}
          <GlobalIndices 
            indices={globalIndices}
            onRefresh={handleRefresh}
          />
          
          {/* Index Correlation Panel */}
          <div className="bg-[#152A4A] p-5 rounded-xl">
            <h2 className="text-xl font-bold mb-4">指数相关性</h2>
            <div className="h-[200px] relative mb-3">
              <Image 
                src="https://picsum.photos/400/200?random=11" 
                alt="Index correlation heatmap" 
                width={400} 
                height={200}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <p className="text-sm text-gray-300">显示主要指数之间的相关性，红色表示正相关，蓝色表示负相关，颜色越深表示相关性越强。</p>
          </div>
          
          {/* Index Performance Comparison */}
          <div className="bg-[#152A4A] p-5 rounded-xl">
            <h2 className="text-xl font-bold mb-4">指数表现对比</h2>
            <div className="h-[200px] relative">
              <Image 
                src="https://picsum.photos/400/200?random=12" 
                alt="Index performance comparison" 
                width={400} 
                height={200}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#1E88E5] mr-1.5"></div>
                <span>沪深300</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#00BCD4] mr-1.5"></div>
                <span>上证指数</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#4CAF50] mr-1.5"></div>
                <span>深证成指</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 