"use client"

import React, { useState } from 'react'
import FilterControls, { MarketCategory, MarketFilter } from './FilterControls'
import ChartContainer from './ChartContainer'
import IndexSummary, { MarketIndex } from './IndexSummary'
import VolumeIndicators, { VolumeData } from './VolumeIndicators'
import NewsPanel, { NewsItem } from './NewsPanel'

// Mock data for market indices
const mockIndices: MarketIndex[] = [
  {
    id: 'shangzhen',
    name: '上证指数',
    value: 3256.48,
    change: 32.95,
    changePercent: 1.02,
    high: 3260.23,
    low: 3223.53,
    volume: '2348亿',
    turnover: '2894亿元',
  },
  {
    id: 'shenzhen',
    name: '深证成指',
    value: 10682.53,
    change: 124.92,
    changePercent: 1.18,
    high: 10701.29,
    low: 10557.61,
    volume: '2786亿',
    turnover: '3342亿元',
  },
  {
    id: 'chuangyeban',
    name: '创业板指',
    value: 2134.86,
    change: 32.62,
    changePercent: 1.55,
    high: 2138.52,
    low: 2102.24,
    volume: '965亿',
    turnover: '1327亿元',
  },
  {
    id: 'kechuangban',
    name: '科创50',
    value: 912.47,
    change: -3.24,
    changePercent: -0.35,
    high: 918.65,
    low: 909.23,
    volume: '321亿',
    turnover: '594亿元',
  },
  {
    id: 'hsi',
    name: '恒生指数',
    value: 17823.45,
    change: -152.63,
    changePercent: -0.85,
    high: 17986.34,
    low: 17752.78,
    volume: '892亿',
    turnover: '1126亿港元',
  },
  {
    id: 'ndx',
    name: '纳斯达克',
    value: 16285.88,
    change: 98.03,
    changePercent: 0.61,
    high: 16321.42,
    low: 16198.61,
    volume: '5.23亿',
    turnover: '892亿美元',
  },
]

// Mock data for volume indicators
const mockVolumeData: VolumeData[] = [
  {
    label: '沪深两市成交额',
    value: '9,823亿元',
    change: 12.5,
    changePercent: 12.5,
  },
  {
    label: '沪深两市成交量',
    value: '7,865亿股',
    change: 8.3,
    changePercent: 8.3,
  },
  {
    label: '上涨家数',
    value: '2,841家',
    change: 15.2,
    changePercent: 15.2,
  },
  {
    label: '下跌家数',
    value: '1,562家',
    change: -10.4,
    changePercent: -10.4,
  },
  {
    label: '北向资金净流入',
    value: '58.72亿元',
    change: 25.9,
    changePercent: 25.9,
  },
  {
    label: '融资余额',
    value: '1.52万亿元',
    change: 1.3,
    changePercent: 1.3,
  },
]

// Mock data for news
const mockNews: NewsItem[] = [
  {
    id: 'news-1',
    title: '国务院常务会议：研究部署进一步扩大开放 稳外贸稳外资举措',
    source: '新华社',
    timestamp: '2025-03-26T06:30:00Z',
    url: '#',
    category: '国内政策',
    isImportant: true,
  },
  {
    id: 'news-2',
    title: '央行行长：稳步推进数字人民币研发试点 加强金融科技监管',
    source: '央行网站',
    timestamp: '2025-03-26T05:15:00Z',
    url: '#',
    category: '金融政策',
  },
  {
    id: 'news-3',
    title: '两市成交额创年内新高 北向资金全天净流入超50亿元',
    source: '财联社',
    timestamp: '2025-03-26T03:45:00Z',
    url: '#',
    category: '市场动态',
  },
  {
    id: 'news-4',
    title: '新能源汽车板块强势拉升 多家企业股价创新高',
    source: '证券时报',
    timestamp: '2025-03-25T23:10:00Z',
    url: '#',
    category: '行业动态',
  },
  {
    id: 'news-5',
    title: '美联储主席：将在年内适时放缓加息步伐',
    source: '华尔街日报',
    timestamp: '2025-03-25T18:30:00Z',
    url: '#',
    category: '国际宏观',
  },
]

interface MarketOverviewProps {
  className?: string
}

export default function MarketOverview({ className = '' }: MarketOverviewProps) {
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('全球指数')
  const [activeFilter, setActiveFilter] = useState<MarketFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  // Filter indices based on active category and filter
  const filteredIndices = mockIndices.filter((index) => {
    // Apply search filter if exists
    if (searchQuery && !index.name.includes(searchQuery)) {
      return false
    }
    
    // Apply category filter
    // In a real application, you would have category data on each index
    // Here we're using a simplified approach
    
    // Apply direction filter
    if (activeFilter === 'up' && index.changePercent <= 0) {
      return false
    }
    if (activeFilter === 'down' && index.changePercent >= 0) {
      return false
    }
    
    return true
  })
  
  // Use the first index for the chart
  const featuredIndex = filteredIndices.length > 0 ? filteredIndices[0] : mockIndices[0]
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filters */}
      <FilterControls
        onCategoryChange={setActiveCategory}
        onFilterChange={setActiveFilter}
        onSearch={setSearchQuery}
        activeCategory={activeCategory}
        activeFilter={activeFilter}
      />
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div className="space-y-6">
          {/* Featured chart */}
          <ChartContainer
            title="大盘走势"
            indexName={featuredIndex.name}
            currentValue={featuredIndex.value}
            changePercent={featuredIndex.changePercent}
            change={featuredIndex.change}
          />
          
          {/* Volume indicators */}
          <VolumeIndicators data={mockVolumeData} />
        </div>
        
        {/* Right column */}
        <div className="space-y-6">
          {/* Index summary */}
          <IndexSummary indices={filteredIndices} />
          
          {/* News panel */}
          <NewsPanel news={mockNews} />
        </div>
      </div>
    </div>
  )
} 