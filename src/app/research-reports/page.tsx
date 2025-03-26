"use client"

import { useState } from 'react'
import ReportSearchFilters, { SortOption, TimeRange } from '@/components/features/ReportSearchFilters'
import ReportCategoryNav, { Category } from '@/components/features/ReportCategoryNav'
import ReportList from '@/components/features/ReportList'
import { Report } from '@/components/features/ReportCard'
import { Bookmark, Clock, FileText, FileDown, ChevronDown } from 'lucide-react'

// Mock report categories
const reportCategories: Category[] = [
  {
    id: 'industry',
    name: '行业研究',
    count: 245,
    subcategories: [
      { id: 'tech', name: '科技行业', count: 87 },
      { id: 'finance', name: '金融行业', count: 62 },
      { id: 'consumer', name: '消费行业', count: 41 },
      { id: 'energy', name: '能源行业', count: 32 },
      { id: 'healthcare', name: '医疗健康', count: 23 },
    ]
  },
  {
    id: 'company',
    name: '公司研究',
    count: 183,
    subcategories: [
      { id: 'earnings', name: '业绩报告', count: 68 },
      { id: 'valuation', name: '估值分析', count: 58 },
      { id: 'outlook', name: '展望', count: 37 },
      { id: 'investment', name: '投资建议', count: 20 },
    ]
  },
  {
    id: 'macro',
    name: '宏观策略',
    count: 97,
    subcategories: [
      { id: 'economy', name: '经济分析', count: 42 },
      { id: 'policy', name: '政策解读', count: 35 },
      { id: 'market', name: '市场展望', count: 20 },
    ]
  },
  {
    id: 'special',
    name: '专题研究',
    count: 76
  },
  {
    id: 'data',
    name: '数据报告',
    count: 54
  }
]

// Mock categories for filter
const reportCategoryList = [
  '行业研究', '公司研究', '宏观策略', '专题研究', '数据报告',
  '科技行业', '金融行业', '消费行业', '能源行业', '医疗健康',
  '业绩报告', '估值分析', '展望', '投资建议',
  '经济分析', '政策解读', '市场展望'
]

// Mock reports data
const mockReports: Report[] = [
  {
    id: '1',
    title: '2023年中国半导体行业深度报告：国产替代加速，设计制造齐头并进',
    summary: '本报告深入分析中国半导体行业现状与发展趋势，聚焦国产替代进程，详细阐述芯片设计和制造领域的技术突破与市场变化。',
    date: '2023-04-15',
    category: '行业研究',
    tags: ['科技行业', '半导体', '国产替代'],
    author: '张明',
    company: '海通证券',
    thumbnailUrl: 'https://picsum.photos/800/400?random=1',
    downloadUrl: '#',
    viewCount: 3562,
    pageCount: 48,
    isFeatured: true
  },
  {
    id: '2',
    title: '新能源汽车产业链季度跟踪：供应链复苏，海外市场加速扩张',
    summary: '本报告对新能源汽车产业链进行季度跟踪分析，关注全球市场销量走势、电池技术迭代、核心零部件供应状况，并对未来一个季度行业发展进行预判。',
    date: '2023-04-12',
    category: '行业研究',
    tags: ['新能源', '汽车行业', '产业链'],
    author: '李强',
    company: '中金公司',
    thumbnailUrl: 'https://picsum.photos/800/400?random=2',
    downloadUrl: '#',
    viewCount: 2841,
    pageCount: 56
  },
  {
    id: '3',
    title: '腾讯控股(00700.HK)2022年报点评：游戏业务企稳，金融科技成新增长极',
    summary: '本报告对腾讯2022年财报进行深入解读，关注公司业绩变化，特别是游戏业务回暖迹象及金融科技业务的高速增长，并对估值和投资价值进行分析。',
    date: '2023-04-10',
    category: '公司研究',
    tags: ['业绩报告', '互联网', '科技行业'],
    author: '王晓',
    company: '国泰君安',
    thumbnailUrl: 'https://picsum.photos/800/400?random=3',
    downloadUrl: '#',
    viewCount: 4127,
    pageCount: 32
  },
  {
    id: '4',
    title: '2023年中国消费行业投资策略：复苏路径与结构性机会',
    summary: '本报告分析后疫情时代中国消费行业复苏节奏与特点，探讨高端消费、新消费品牌崛起等结构性投资机会，为投资者提供消费板块配置建议。',
    date: '2023-04-08',
    category: '宏观策略',
    tags: ['消费行业', '投资策略', '复苏'],
    author: '陈明',
    company: '广发证券',
    thumbnailUrl: 'https://picsum.photos/800/400?random=4',
    downloadUrl: '#',
    viewCount: 3257,
    pageCount: 42
  },
  {
    id: '5',
    title: '人工智能大模型专题报告：技术突破与产业化路径探析',
    summary: '本报告深入解读ChatGPT等大型语言模型带来的技术革新，分析中国AI大模型发展现状，探讨落地应用场景与产业链投资机会。',
    date: '2023-04-05',
    category: '专题研究',
    tags: ['人工智能', '大模型', '科技行业'],
    author: '赵云',
    company: '华泰证券',
    thumbnailUrl: 'https://picsum.photos/800/400?random=5',
    downloadUrl: '#',
    viewCount: 6842,
    pageCount: 64,
    isFeatured: true
  },
  {
    id: '6',
    title: '中国医疗器械行业深度报告：创新驱动发展，进口替代加速',
    summary: '本报告分析中国医疗器械行业技术创新与市场格局，重点关注高端医疗设备国产化进程，并对细分领域龙头企业进行价值评估。',
    date: '2023-04-02',
    category: '行业研究',
    tags: ['医疗健康', '医疗器械', '进口替代'],
    author: '林华',
    company: '中信建投',
    thumbnailUrl: 'https://picsum.photos/800/400?random=6',
    downloadUrl: '#',
    viewCount: 2541,
    pageCount: 52
  },
  {
    id: '7',
    title: '2023年货币政策展望：稳增长与防风险平衡',
    summary: '本报告分析2023年中国宏观经济形势与货币政策走向，讨论央行如何在稳增长和防范金融风险之间寻求平衡，并对利率、汇率走势进行预测。',
    date: '2023-03-28',
    category: '宏观策略',
    tags: ['宏观经济', '货币政策', '利率'],
    author: '黄海',
    company: '招商证券',
    thumbnailUrl: 'https://picsum.photos/800/400?random=7',
    downloadUrl: '#',
    viewCount: 3845,
    pageCount: 38
  },
  {
    id: '8',
    title: '中国储能产业投资机会：政策利好推动，产能快速扩张',
    summary: '本报告聚焦中国储能产业发展动态，分析新型储能技术路线与商业模式，评估产业链上中下游投资价值，并提出细分板块配置建议。',
    date: '2023-03-25',
    category: '行业研究',
    tags: ['新能源', '储能', '政策'],
    author: '刘明',
    company: '安信证券',
    thumbnailUrl: 'https://picsum.photos/800/400?random=8',
    downloadUrl: '#',
    viewCount: 2967,
    pageCount: 46
  },
  {
    id: '9',
    title: '2023中国银行业展望：资产质量企稳，转型加速',
    summary: '本报告对中国银行业运营状况与发展趋势进行分析，关注不良贷款率变化、净息差走势，探讨数字化转型进程对银行估值的影响。',
    date: '2023-03-20',
    category: '行业研究',
    tags: ['金融行业', '银行', '数字化'],
    author: '张伟',
    company: '平安证券',
    thumbnailUrl: 'https://picsum.photos/800/400?random=9',
    downloadUrl: '#',
    viewCount: 2458,
    pageCount: 50
  },
  {
    id: '10',
    title: '碳中和背景下中国能源结构转型路径研究',
    summary: '本报告研究碳中和目标下中国能源结构转型路径，分析可再生能源占比提升、传统能源清洁化发展的进程与挑战，并对相关产业投资机会进行梳理。',
    date: '2023-03-15',
    category: '专题研究',
    tags: ['碳中和', '能源转型', '可再生能源'],
    author: '周志',
    company: '光大证券',
    thumbnailUrl: 'https://picsum.photos/800/400?random=10',
    downloadUrl: '#',
    viewCount: 3124,
    pageCount: 58
  },
  {
    id: '11',
    title: '阿里巴巴(9988.HK/BABA.US)投资价值分析：业务重组后的增长新动能',
    summary: '本报告分析阿里巴巴集团业务重组后的战略布局与竞争优势，评估电商、云计算、本地生活等核心业务的发展前景，并进行估值测算。',
    date: '2023-03-12',
    category: '公司研究',
    tags: ['估值分析', '互联网', '电商'],
    author: '李红',
    company: '中信证券',
    thumbnailUrl: 'https://picsum.photos/800/400?random=11',
    downloadUrl: '#',
    viewCount: 3756,
    pageCount: 36
  },
  {
    id: '12',
    title: '集成电路设计行业2023年投资展望',
    summary: '本报告分析中国集成电路设计行业发展现状与竞争格局，聚焦特色工艺、第三代半导体等细分领域的投资机会，并对行业龙头公司进行比较分析。',
    date: '2023-03-08',
    category: '行业研究',
    tags: ['科技行业', '半导体', 'IC设计'],
    author: '陈光',
    company: '东方证券',
    thumbnailUrl: 'https://picsum.photos/800/400?random=12',
    downloadUrl: '#',
    viewCount: 2876,
    pageCount: 44
  }
]

export default function ResearchReportsPage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<SortOption>('latest')
  const [timeRange, setTimeRange] = useState<TimeRange>('all')
  const [activeCategoryId, setActiveCategoryId] = useState<string>('industry')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(false)
  
  // Filtered reports based on search and filters
  const filteredReports = mockReports.filter(report => {
    // Search query filter
    if (searchQuery && !report.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !report.summary.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Category filter
    if (selectedCategories.length > 0 && 
        !selectedCategories.some(cat => 
          report.category === cat || report.tags.includes(cat)
        )) {
      return false
    }
    
    // Time range filter (simplified for demo)
    if (timeRange !== 'all') {
      const reportDate = new Date(report.date)
      const now = new Date()
      
      if (timeRange === 'week' && (now.getTime() - reportDate.getTime() > 7 * 24 * 60 * 60 * 1000)) {
        return false
      } else if (timeRange === 'month' && (now.getTime() - reportDate.getTime() > 30 * 24 * 60 * 60 * 1000)) {
        return false
      } else if (timeRange === 'quarter' && (now.getTime() - reportDate.getTime() > 90 * 24 * 60 * 60 * 1000)) {
        return false
      } else if (timeRange === 'year' && (now.getTime() - reportDate.getTime() > 365 * 24 * 60 * 60 * 1000)) {
        return false
      }
    }
    
    return true
  })
  
  // Sort reports
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortOption === 'latest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortOption === 'popular') {
      return b.viewCount - a.viewCount
    } else {
      // Relevance - if there's a search query, prioritize title matches
      if (searchQuery) {
        const aTitleMatch = a.title.toLowerCase().includes(searchQuery.toLowerCase())
        const bTitleMatch = b.title.toLowerCase().includes(searchQuery.toLowerCase())
        
        if (aTitleMatch && !bTitleMatch) return -1
        if (!aTitleMatch && bTitleMatch) return 1
      }
      return 0
    }
  })
  
  // Handle search
  const handleSearch = () => {
    setIsLoading(true)
    // Simulate API request
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }
  
  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setSortOption('latest')
    setTimeRange('all')
  }
  
  // Handle report actions
  const handleReportClick = (report: Report) => {
    console.log('View report:', report.title)
    // In a real app, this would navigate to report detail page
  }
  
  const handleBookmark = (report: Report) => {
    console.log('Bookmark report:', report.title)
    // In a real app, this would toggle bookmark status
  }
  
  const handleDownload = (report: Report) => {
    console.log('Download report:', report.title)
    // In a real app, this would trigger download
  }
  
  const handleShare = (report: Report) => {
    console.log('Share report:', report.title)
    // In a real app, this would open share dialog
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">研究报告</h1>
        <div className="flex space-x-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[#152A4A]">
            <Clock size={16} />
            <span>最近访问</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[#152A4A]">
            <Bookmark size={16} />
            <span>我的收藏</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[#152A4A]">
            <FileDown size={16} />
            <span>下载历史</span>
          </button>
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[#152A4A]">
              <FileText size={16} />
              <span>我的订阅</span>
              <ChevronDown size={14} />
            </button>
            <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-[#0A192F] border border-[#2A3F5F] hidden group-hover:block z-10">
              <div className="py-1">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[#152A4A]">证券研究报告</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[#152A4A]">行业深度分析</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[#152A4A]">宏观经济报告</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[#152A4A]">管理订阅</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <ReportSearchFilters 
        query={searchQuery}
        onQueryChange={setSearchQuery}
        categories={reportCategoryList}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        sortOption={sortOption}
        onSortChange={setSortOption}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onReset={handleResetFilters}
        onSearch={handleSearch}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="space-y-6">
            <ReportCategoryNav 
              categories={reportCategories}
              activeCategory={activeCategoryId}
              onCategorySelect={setActiveCategoryId}
            />
            
            {/* Recent reports */}
            <div className="bg-[#152A4A] rounded-xl p-4">
              <h2 className="text-lg font-medium mb-4">热门报告</h2>
              <div className="space-y-4">
                {mockReports.slice(0, 3).map(report => (
                  <div 
                    key={report.id}
                    className="flex gap-3 cursor-pointer hover:bg-[#0A192F] p-2 rounded-md"
                    onClick={() => handleReportClick(report)}
                  >
                    <div className="relative w-16 h-20 flex-shrink-0 rounded overflow-hidden">
                      <img 
                        src={report.thumbnailUrl} 
                        alt={report.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium line-clamp-2">{report.title}</h3>
                      <div className="text-xs text-gray-400 mt-1">{report.author} · {report.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3">
          <ReportList 
            reports={sortedReports}
            isLoading={isLoading}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            itemsPerPage={6}
            onReportClick={handleReportClick}
            onBookmark={handleBookmark}
            onDownload={handleDownload}
            onShare={handleShare}
          />
        </div>
      </div>
    </div>
  )
} 