"use client"

import { useState, useEffect } from 'react'
import CompanySearchInput from '@/components/features/CompanySearchInput'
import CompanyFilterPanel, { FilterGroup } from '@/components/features/CompanyFilterPanel'
import CompanyList, { SortField, SortOrder } from '@/components/features/CompanyList'
import { Company } from '@/components/features/CompanyCard'
import { BookmarkX, Clock, History, InfoIcon, Settings, Star } from 'lucide-react'

// Mock data for filter groups
const mockFilterGroups: FilterGroup[] = [
  {
    id: 'industry',
    name: '所属行业',
    options: [
      { id: 'tech', label: '科技', count: 120 },
      { id: 'finance', label: '金融', count: 85 },
      { id: 'healthcare', label: '医疗健康', count: 64 },
      { id: 'consumer', label: '消费品', count: 53 },
      { id: 'energy', label: '能源', count: 42 },
      { id: 'manufacturing', label: '制造业', count: 38 },
      { id: 'real-estate', label: '房地产', count: 31 },
      { id: 'telecommunications', label: '通信', count: 24 },
    ],
  },
  {
    id: 'location',
    name: '所在地区',
    options: [
      { id: 'beijing', label: '北京', count: 78 },
      { id: 'shanghai', label: '上海', count: 92 },
      { id: 'shenzhen', label: '深圳', count: 65 },
      { id: 'guangzhou', label: '广州', count: 43 },
      { id: 'hangzhou', label: '杭州', count: 37 },
      { id: 'nanjing', label: '南京', count: 29 },
      { id: 'chengdu', label: '成都', count: 24 },
      { id: 'wuhan', label: '武汉', count: 18 },
    ],
  },
  {
    id: 'exchange',
    name: '上市交易所',
    options: [
      { id: 'sse', label: '上交所', count: 112 },
      { id: 'szse', label: '深交所', count: 105 },
      { id: 'hkex', label: '港交所', count: 87 },
      { id: 'nyse', label: '纽交所', count: 45 },
      { id: 'nasdaq', label: '纳斯达克', count: 38 },
      { id: 'lse', label: '伦交所', count: 12 },
    ],
  },
  {
    id: 'size',
    name: '公司规模',
    options: [
      { id: 'large', label: '大型企业 (10000+)', count: 43 },
      { id: 'medium', label: '中型企业 (1000-9999)', count: 85 },
      { id: 'small', label: '小型企业 (100-999)', count: 63 },
      { id: 'startup', label: '初创企业 (<100)', count: 37 },
    ],
  },
]

// Mock data for companies
const generateMockCompanies = (): Company[] => {
  const industries = ['科技', '金融', '医疗健康', '消费品', '能源', '制造业', '房地产', '通信']
  const locations = ['北京', '上海', '深圳', '广州', '杭州', '南京', '成都', '武汉']
  const exchanges = ['上交所', '深交所', '港交所', '纳斯达克', '纽交所']
  const tickers = ['BABA', 'TCEHY', '600519', '000651', '0700', '601398', '601318', '601988']
  const sizes = ['大型企业', '中型企业', '小型企业', '初创企业']
  
  const companies: Company[] = []
  
  // Generate 30 mock companies
  for (let i = 1; i <= 30; i++) {
    const isPositive = Math.random() > 0.4
    const priceChange = isPositive 
      ? (Math.random() * 10).toFixed(2)
      : -(Math.random() * 10).toFixed(2)
    const priceChangePercent = isPositive
      ? (Math.random() * 5).toFixed(2)
      : -(Math.random() * 5).toFixed(2)
    
    companies.push({
      id: `company-${i}`,
      name: `${['中国', '京东', '阿里', '腾讯', '百度', '美团', '网易', '新浪'][i % 8]}${['科技', '金融', '健康', '能源', '通信'][i % 5]}公司 ${i}`,
      ticker: tickers[i % tickers.length],
      exchange: exchanges[i % exchanges.length],
      industry: industries[i % industries.length],
      location: locations[i % locations.length],
      size: sizes[i % sizes.length],
      description: `这是一家领先的${industries[i % industries.length]}公司，总部位于${locations[i % locations.length]}，专注于创新和可持续发展。公司拥有强大的研发团队和市场份额，是行业的佼佼者。`,
      stockPrice: 100 + Math.random() * 900,
      priceChange: parseFloat(priceChange as string),
      priceChangePercent: parseFloat(priceChangePercent as string),
      employees: Math.floor(100 + Math.random() * 50000),
      foundedYear: 1990 + Math.floor(Math.random() * 30),
      tags: [
        industries[i % industries.length],
        `${locations[i % locations.length]}总部`,
        ['创新', '高成长', '价值', '蓝筹', '科技', '消费'][i % 6],
        ['A股', 'H股', '美股', '科创板'][i % 4],
      ]
    })
  }
  
  return companies
}

const mockCompanies = generateMockCompanies()

// Mock search history
const mockSearchHistory = [
  '阿里巴巴',
  '腾讯控股',
  '新能源汽车',
  '人工智能',
  '医疗器械',
  '芯片半导体',
]

export default function CompanySearchPage() {
  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [searchHistory, setSearchHistory] = useState<string[]>(mockSearchHistory)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>(mockCompanies)
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsLoading(true)
    
    // Add to search history if not already there
    if (query && !searchHistory.includes(query)) {
      setSearchHistory([query, ...searchHistory.slice(0, 9)])
    }
    
    // Simulate API request delay
    setTimeout(() => {
      // Filter companies based on search query
      const filtered = mockCompanies.filter(company => 
        company.name.toLowerCase().includes(query.toLowerCase()) ||
        (company.ticker && company.ticker.toLowerCase().includes(query.toLowerCase())) ||
        company.industry.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredCompanies(filtered)
      setIsLoading(false)
    }, 500)
  }
  
  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('')
    setFilteredCompanies(mockCompanies)
  }
  
  // Handle filter change
  const handleFilterChange = (groupId: string, filterId: string, isSelected: boolean) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev }
      
      if (isSelected) {
        // Add filter
        newFilters[groupId] = [...(newFilters[groupId] || []), filterId]
      } else {
        // Remove filter
        newFilters[groupId] = (newFilters[groupId] || []).filter(id => id !== filterId)
        
        // Remove empty arrays
        if (newFilters[groupId].length === 0) {
          delete newFilters[groupId]
        }
      }
      
      return newFilters
    })
  }
  
  // Handle clear all filters
  const handleClearFilters = () => {
    setSelectedFilters({})
  }
  
  // Handle clear search history
  const handleClearHistory = () => {
    setSearchHistory([])
  }
  
  // Apply filters when they change
  useEffect(() => {
    setIsLoading(true)
    
    // Simulate API request delay
    setTimeout(() => {
      let results = mockCompanies
      
      // Apply search query filter
      if (searchQuery) {
        results = results.filter(company => 
          company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (company.ticker && company.ticker.toLowerCase().includes(searchQuery.toLowerCase())) ||
          company.industry.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }
      
      // Apply selected filters
      Object.entries(selectedFilters).forEach(([groupId, filterIds]) => {
        if (filterIds.length === 0) return
        
        switch (groupId) {
          case 'industry':
            results = results.filter(company => {
              const industryMap: Record<string, string> = {
                'tech': '科技',
                'finance': '金融',
                'healthcare': '医疗健康',
                'consumer': '消费品',
                'energy': '能源',
                'manufacturing': '制造业',
                'real-estate': '房地产',
                'telecommunications': '通信',
              }
              return filterIds.some(id => company.industry === industryMap[id])
            })
            break
          
          case 'location':
            results = results.filter(company => {
              const locationMap: Record<string, string> = {
                'beijing': '北京',
                'shanghai': '上海',
                'shenzhen': '深圳',
                'guangzhou': '广州',
                'hangzhou': '杭州',
                'nanjing': '南京',
                'chengdu': '成都',
                'wuhan': '武汉',
              }
              return filterIds.some(id => company.location === locationMap[id])
            })
            break
          
          case 'exchange':
            results = results.filter(company => {
              const exchangeMap: Record<string, string> = {
                'sse': '上交所',
                'szse': '深交所',
                'hkex': '港交所',
                'nyse': '纽交所',
                'nasdaq': '纳斯达克',
                'lse': '伦交所',
              }
              return filterIds.some(id => company.exchange === exchangeMap[id])
            })
            break
          
          case 'size':
            results = results.filter(company => {
              const sizeMap: Record<string, string> = {
                'large': '大型企业',
                'medium': '中型企业',
                'small': '小型企业',
                'startup': '初创企业',
              }
              return filterIds.some(id => company.size === sizeMap[id])
            })
            break
        }
      })
      
      setFilteredCompanies(results)
      setIsLoading(false)
    }, 300)
  }, [searchQuery, selectedFilters])
  
  // Handle sort change
  const handleSortChange = (field: SortField, order: SortOrder) => {
    setIsLoading(true)
    
    // Simulate API request delay
    setTimeout(() => {
      const sorted = [...filteredCompanies].sort((a, b) => {
        let comparison = 0
        
        switch (field) {
          case 'name':
            comparison = a.name.localeCompare(b.name)
            break
          
          case 'price':
            comparison = (a.stockPrice || 0) - (b.stockPrice || 0)
            break
          
          case 'employees':
            comparison = (a.employees || 0) - (b.employees || 0)
            break
          
          // Default to relevance (no specific sorting)
          case 'relevance':
          default:
            return 0
        }
        
        return order === 'asc' ? comparison : -comparison
      })
      
      setFilteredCompanies(sorted)
      setIsLoading(false)
    }, 300)
  }
  
  // Handle company click
  const handleCompanyClick = (company: Company) => {
    alert(`将跳转到 ${company.name} 详情页面`)
  }
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">搜索公司</h1>
        <div className="flex space-x-2">
          <button className="p-2 rounded-md hover:bg-[#152A4A] text-gray-400">
            <History size={20} />
          </button>
          <button className="p-2 rounded-md hover:bg-[#152A4A] text-gray-400">
            <Star size={20} />
          </button>
          <button className="p-2 rounded-md hover:bg-[#152A4A] text-gray-400">
            <Settings size={20} />
          </button>
          <button className="p-2 rounded-md hover:bg-[#152A4A] text-gray-400">
            <InfoIcon size={20} />
          </button>
        </div>
      </div>
      
      {/* Search input */}
      <CompanySearchInput
        onSearch={handleSearch}
        onClear={handleClearSearch}
        initialValue={searchQuery}
        searchHistory={searchHistory}
        onHistoryItemClick={handleSearch}
        onClearHistory={handleClearHistory}
      />
      
      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <CompanyFilterPanel
            filterGroups={mockFilterGroups}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
          
          {/* Recently viewed */}
          <div className="mt-4 bg-[#152A4A] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#2A3F5F]">
              <h3 className="font-medium flex items-center">
                <Clock size={16} className="mr-2 text-gray-400" />
                最近浏览
              </h3>
            </div>
            
            {mockCompanies.slice(0, 3).map(company => (
              <div 
                key={company.id}
                className="px-4 py-2 hover:bg-[#0A192F] cursor-pointer border-b border-[#2A3F5F] last:border-b-0"
                onClick={() => handleCompanyClick(company)}
              >
                <div className="font-medium text-sm">{company.name}</div>
                <div className="text-xs text-gray-400 flex justify-between mt-1">
                  <span>{company.industry}</span>
                  <span className={company.priceChange && company.priceChange > 0 ? 'text-green-500' : 'text-red-500'}>
                    {company.priceChange && company.priceChange > 0 ? '+' : ''}{company.priceChangePercent}%
                  </span>
                </div>
              </div>
            ))}
            
            {/* Empty state */}
            {mockCompanies.length === 0 && (
              <div className="px-4 py-8 text-center">
                <BookmarkX size={24} className="mx-auto mb-2 text-gray-500" />
                <div className="text-sm text-gray-400">暂无浏览记录</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Results list */}
        <div className="flex-1 min-w-0">
          <CompanyList
            companies={filteredCompanies}
            isLoading={isLoading}
            onCompanyClick={handleCompanyClick}
            emptyMessage={searchQuery ? `没有找到与"${searchQuery}"相关的公司` : '没有找到匹配的公司'}
            perPage={12}
            onSortChange={handleSortChange}
          />
        </div>
      </div>
    </div>
  )
} 