"use client"

import { useState, useEffect } from 'react'
import NewsSearchBar from '@/components/features/NewsSearchBar'
import NewsFilters, { NewsCategory, TimePeriod } from '@/components/features/NewsFilters'
import NewsList from '@/components/features/NewsList'
import NewsCard, { NewsItem } from '@/components/features/NewsCard'
import { Bell, BookmarkCheck } from 'lucide-react'

// Mock news data
const mockNewsData: NewsItem[] = [
  {
    id: 1,
    title: '腾讯控股发布2024财年第一季度财报，营收同比增长17%',
    company: '腾讯控股',
    companyCode: '0700.HK',
    time: '2小时前',
    image: 'https://picsum.photos/800/400?random=1',
    summary: '腾讯控股今日发布2024财年第一季度财报，总营收2,086亿元，同比增长17%，净利润达到496亿元，超出市场预期。',
    tags: ['财报', '业绩'],
    isImportant: true
  },
  {
    id: 2,
    title: '阿里巴巴宣布新一轮组织架构调整，成立六大业务集团',
    company: '阿里巴巴',
    companyCode: '9988.HK',
    time: '4小时前',
    image: 'https://picsum.photos/800/400?random=2',
    summary: '阿里巴巴集团今日宣布进行新一轮组织架构调整，将成立六大业务集团，包括云智能、电商、本地生活等，并赋予各业务集团更高的自主权。',
    tags: ['公司公告', '组织架构']
  },
  {
    id: 3,
    title: '美团第四季度营收同比增长22.4%，外卖业务持续增长',
    company: '美团',
    companyCode: '3690.HK',
    time: '昨天',
    image: 'https://picsum.photos/800/400?random=3',
    summary: '美团公布2023年第四季度及全年业绩，第四季度总营收642亿元，同比增长22.4%，其中外卖业务营收增长24.8%，展现出良好的增长势头。',
    tags: ['财报', '业绩']
  },
  {
    id: 4,
    title: '比亚迪发布全新电动汽车平台，计划进军高端市场',
    company: '比亚迪',
    companyCode: '002594.SZ',
    time: '2天前',
    image: 'https://picsum.photos/800/400?random=4',
    summary: '比亚迪今日发布全新电动汽车平台，该平台采用最新的电池技术和自动驾驶系统，未来将用于打造高端电动车型，进军豪华车市场。',
    tags: ['产品动态', '技术创新']
  },
  {
    id: 5,
    title: '小米集团宣布进军智能汽车领域，首款车型定于明年发布',
    company: '小米集团',
    companyCode: '1810.HK',
    time: '3天前',
    image: 'https://picsum.photos/800/400?random=5',
    summary: '小米集团今日正式宣布进军智能汽车领域，计划投资100亿美元，首款车型将于明年发布。小米表示将把手机领域的技术优势延伸到汽车制造。',
    tags: ['产品动态', '战略规划']
  },
  {
    id: 6,
    title: '京东集团完成物流板块重组，京东物流独立运营',
    company: '京东集团',
    companyCode: '9618.HK',
    time: '4天前',
    image: 'https://picsum.photos/800/400?random=6',
    summary: '京东集团今日宣布完成物流板块重组，京东物流将作为独立实体运营，这将有助于提高物流效率，并为未来可能的分拆上市做准备。',
    tags: ['公司公告', '组织架构']
  },
  {
    id: 7,
    title: '网易公布2023年全年财报，游戏业务营收创新高',
    company: '网易',
    companyCode: 'NTES.US',
    time: '5天前',
    image: 'https://picsum.photos/800/400?random=7',
    summary: '网易发布2023年全年财报，年营收1,032亿元，同比增长10.2%，其中游戏业务营收创历史新高，达到648亿元，占总营收的62.8%。',
    tags: ['财报', '业绩']
  },
  {
    id: 8,
    title: '百度发布新一代大型语言模型文心一言3.5',
    company: '百度',
    companyCode: '9888.HK',
    time: '1周前',
    image: 'https://picsum.photos/800/400?random=8',
    summary: '百度今日发布新一代大型语言模型文心一言3.5，性能大幅提升，在多个基准测试中超越GPT-4，将进一步强化百度在AI领域的竞争力。',
    tags: ['产品动态', '技术创新']
  },
  {
    id: 9,
    title: '工商银行发布2023年度业绩报告，净利润同比增长3.5%',
    company: '工商银行',
    companyCode: '601398.SH',
    time: '1周前',
    image: 'https://picsum.photos/800/400?random=9',
    summary: '工商银行发布2023年度业绩报告，实现净利润3,684亿元，同比增长3.5%，不良贷款率保持在1.39%，展现出稳健的经营状况。',
    tags: ['财报', '业绩']
  }
]

const categories: NewsCategory[] = ['全部', '公司公告', '财务报告', '业绩预告', '投资者关系', '产品动态', '人事变动', '行业新闻']
const timePeriods: TimePeriod[] = ['全部时间', '今日', '本周', '本月', '本季度', '本年度']

interface CompanyNewsSectionProps {
  variant?: 'full' | 'sidebar'
  maxItems?: number
  showFeatured?: boolean
  className?: string
}

const CompanyNewsSection = ({
  variant = 'full',
  maxItems,
  showFeatured = true,
  className = ''
}: CompanyNewsSectionProps) => {
  // State for news data and filters
  const [news, setNews] = useState<NewsItem[]>(mockNewsData)
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>(mockNewsData)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('全部')
  const [activeTimePeriod, setActiveTimePeriod] = useState<TimePeriod>('全部时间')
  
  // Filter news based on search, category, and time period
  useEffect(() => {
    setIsLoading(true)
    
    // Simulate API request delay
    const timeoutId = setTimeout(() => {
      let filtered = [...news]
      
      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(
          item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                 item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 (item.summary && item.summary.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      }
      
      // Apply category filter
      if (activeCategory !== '全部') {
        filtered = filtered.filter(item => 
          item.tags && item.tags.some(tag => {
            if (activeCategory === '公司公告') return tag === '公司公告' || tag === '组织架构'
            if (activeCategory === '财务报告' || activeCategory === '业绩预告') return tag === '财报' || tag === '业绩'
            if (activeCategory === '产品动态') return tag === '产品动态'
            return tag.includes(activeCategory)
          })
        )
      }
      
      // Apply time filter (simulation - in a real app, would use actual dates)
      if (activeTimePeriod !== '全部时间') {
        filtered = filtered.filter(item => {
          if (activeTimePeriod === '今日') return item.time.includes('小时前')
          if (activeTimePeriod === '本周') return !item.time.includes('周前')
          if (activeTimePeriod === '本月') return !item.time.includes('月前')
          return true
        })
      }
      
      // Limit items if maxItems is provided
      if (maxItems && filtered.length > maxItems) {
        filtered = filtered.slice(0, maxItems)
      }
      
      setFilteredNews(filtered)
      setIsLoading(false)
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [news, searchQuery, activeCategory, activeTimePeriod, maxItems])
  
  // Handle news item click
  const handleNewsClick = (item: NewsItem) => {
    console.log('News clicked:', item)
    // In a real app, navigate to news detail page
  }
  
  // Handle bookmark
  const handleBookmark = (item: NewsItem) => {
    setNews(prevNews => 
      prevNews.map(news => 
        news.id === item.id 
          ? { ...news, isBookmarked: !news.isBookmarked } 
          : news
      )
    )
  }
  
  // Handle share
  const handleShare = (item: NewsItem) => {
    console.log('Share news:', item)
    // In a real app, open share dialog
  }
  
  // Sidebar variant - compact view
  if (variant === 'sidebar') {
    return (
      <div className={`${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">最新公司动态</h3>
          <div className="flex space-x-2">
            <button className="p-1.5 rounded-full hover:bg-[#152A4A]">
              <Bell size={16} className="text-gray-400" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-[#152A4A]">
              <BookmarkCheck size={16} className="text-gray-400" />
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredNews.map(item => (
            <NewsCard 
              key={item.id}
              news={item}
              variant="compact"
              onClick={() => handleNewsClick(item)}
            />
          ))}
        </div>
        
        <button className="w-full mt-4 text-center text-sm text-[#1E88E5] hover:underline">
          查看全部
        </button>
      </div>
    )
  }
  
  // Full variant - complete news section
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search bar */}
      <NewsSearchBar 
        onSearch={setSearchQuery}
        initialValue={searchQuery}
      />
      
      {/* Filters */}
      <NewsFilters 
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        timePeriods={timePeriods}
        activeTimePeriod={activeTimePeriod}
        onTimePeriodChange={setActiveTimePeriod}
        onFilterClick={() => console.log('Advanced filter clicked')}
      />
      
      {/* Featured news */}
      {showFeatured && filteredNews.length > 0 && (
        <div className="mb-8">
          <NewsCard 
            news={filteredNews[0]}
            variant="featured"
            onClick={() => handleNewsClick(filteredNews[0])}
            onBookmark={() => handleBookmark(filteredNews[0])}
            onShare={() => handleShare(filteredNews[0])}
          />
        </div>
      )}
      
      {/* News grid */}
      <NewsList 
        news={showFeatured ? filteredNews.slice(1) : filteredNews}
        layout="grid"
        columns={3}
        showPagination={true}
        itemsPerPage={6}
        isLoading={isLoading}
        onNewsClick={handleNewsClick}
        onBookmark={handleBookmark}
        onShare={handleShare}
      />
    </div>
  )
}

export default CompanyNewsSection 