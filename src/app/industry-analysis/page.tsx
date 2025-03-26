"use client"

import { useState } from 'react'
import IndustryFilterPanel, { 
  TimePeriod, 
  ComparisonType,
  ChartType
} from '@/components/features/IndustryFilterPanel'
import IndustryChartContainer, {
  IndustryDataPoint,
  IndustrySeries
} from '@/components/features/IndustryChartContainer'
import IndustryMetrics, { 
  IndustryMetric 
} from '@/components/features/IndustryMetrics'
import IndustryDataGrid, {
  DataColumn,
  DataRow
} from '@/components/features/IndustryDataGrid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Share, ArrowDownToLine } from 'lucide-react'

// Mock data for sectors
const mockSectors = [
  '科技行业', '金融行业', '消费行业', '医疗健康', '能源行业', 
  '工业制造', '房地产', '通信服务', '公用事业', '原材料'
]

// Mock data for industry metrics
const mockMetrics: IndustryMetric[] = [
  {
    id: 'revenue',
    name: '行业总收入',
    value: 1456789000,
    unit: '元',
    change: 7.2,
    changeDirection: 'up',
    description: '同比增长'
  },
  {
    id: 'profit',
    name: '行业利润率',
    value: 15.8,
    unit: '%',
    change: 1.4,
    changeDirection: 'up',
    description: '较上期'
  },
  {
    id: 'companies',
    name: '上市公司数量',
    value: 342,
    unit: '',
    change: 2.7,
    changeDirection: 'up',
    description: '较上年'
  },
  {
    id: 'valuations',
    name: '行业平均市盈率',
    value: 23.5,
    unit: '',
    change: 5.2,
    changeDirection: 'down',
    description: '较上月'
  }
]

// Mock data for chart series
const generateMockTimeSeriesData = (
  name: string, 
  color: string, 
  baseValue: number, 
  volatility: number, 
  uptrend: boolean = true
): IndustrySeries => {
  const today = new Date()
  const data: IndustryDataPoint[] = []
  
  // Generate data for the past year, one point per month
  for (let i = 0; i < 12; i++) {
    const date = new Date(today)
    date.setMonth(today.getMonth() - (11 - i))
    
    // Generate a somewhat random but trending value
    const trendFactor = uptrend ? i * 0.5 : -i * 0.5
    const randomFactor = (Math.random() - 0.5) * volatility
    const value = baseValue + trendFactor + randomFactor
    
    data.push({
      date: date.toISOString().substring(0, 10),
      value: Math.max(0, value)
    })
  }
  
  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    color,
    data
  }
}

const mockSeries: IndustrySeries[] = [
  generateMockTimeSeriesData('科技行业', '#1E88E5', 100, 10, true),
  generateMockTimeSeriesData('金融行业', '#4CAF50', 80, 5, false),
  generateMockTimeSeriesData('消费行业', '#FFC107', 60, 8, true),
  generateMockTimeSeriesData('医疗健康', '#9C27B0', 40, 12, true)
]

// Mock data for data grid
const mockColumns: DataColumn[] = [
  { 
    id: 'rank', 
    header: '排名', 
    accessor: 'rank', 
    width: '80px',
    align: 'center' 
  },
  { 
    id: 'company', 
    header: '公司名称', 
    accessor: 'company' 
  },
  { 
    id: 'industry', 
    header: '所属行业', 
    accessor: 'industry' 
  },
  { 
    id: 'revenue', 
    header: '营收(亿元)', 
    accessor: 'revenue', 
    align: 'right',
    format: (value) => value.toFixed(2)
  },
  { 
    id: 'growth', 
    header: '同比增长', 
    accessor: 'growth', 
    align: 'right',
    format: (value) => {
      const color = value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : 'text-gray-400'
      const sign = value > 0 ? '+' : ''
      return <span className={color}>{sign}{value}%</span>
    }
  },
  { 
    id: 'profit', 
    header: '净利润(亿元)', 
    accessor: 'profit', 
    align: 'right',
    format: (value) => value.toFixed(2)
  },
  { 
    id: 'margin', 
    header: '利润率', 
    accessor: 'margin', 
    align: 'right',
    format: (value) => `${value}%`
  }
]

const mockRows: DataRow[] = [
  { 
    id: '1', 
    rank: 1, 
    company: '阿里巴巴集团', 
    industry: '科技行业', 
    revenue: 853.43, 
    growth: 12.4,
    profit: 143.68,
    margin: 16.8
  },
  { 
    id: '2', 
    rank: 2, 
    company: '腾讯控股', 
    industry: '科技行业', 
    revenue: 764.28, 
    growth: 8.2,
    profit: 184.09,
    margin: 24.1
  },
  { 
    id: '3', 
    rank: 3, 
    company: '中国工商银行', 
    industry: '金融行业', 
    revenue: 690.42, 
    growth: 3.5,
    profit: 312.36,
    margin: 45.2
  },
  { 
    id: '4', 
    rank: 4, 
    company: '中国建设银行', 
    industry: '金融行业', 
    revenue: 643.17, 
    growth: 2.8,
    profit: 284.51,
    margin: 44.2
  },
  { 
    id: '5', 
    rank: 5, 
    company: '美团', 
    industry: '消费行业', 
    revenue: 385.2, 
    growth: 15.7,
    profit: 42.35,
    margin: 11.0
  },
  { 
    id: '6', 
    rank: 6, 
    company: '京东集团', 
    industry: '消费行业', 
    revenue: 576.42, 
    growth: 9.8,
    profit: 48.31,
    margin: 8.4
  },
  { 
    id: '7', 
    rank: 7, 
    company: '中国平安', 
    industry: '金融行业', 
    revenue: 423.85, 
    growth: -2.1,
    profit: 127.52,
    margin: 30.1
  },
  { 
    id: '8', 
    rank: 8, 
    company: '中国石油', 
    industry: '能源行业', 
    revenue: 612.58, 
    growth: 4.2,
    profit: 86.72,
    margin: 14.2
  },
  { 
    id: '9', 
    rank: 9, 
    company: '小米集团', 
    industry: '科技行业', 
    revenue: 318.76, 
    growth: 11.3,
    profit: 35.82,
    margin: 11.2
  },
  { 
    id: '10', 
    rank: 10, 
    company: '中国中免', 
    industry: '消费行业', 
    revenue: 245.63, 
    growth: -5.4,
    profit: 42.18,
    margin: 17.2
  }
]

export default function IndustryAnalysisPage() {
  // State for filters
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('1y')
  const [comparisonType, setComparisonType] = useState<ComparisonType>('absolute')
  const [chartType, setChartType] = useState<ChartType>('line')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  // Function to handle data refresh
  const handleRefresh = () => {
    setIsLoading(true)
    
    // Simulate API request delay
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  
  // Function to handle data export
  const handleExport = () => {
    alert('数据导出功能将在此实现')
  }
  
  // Filter series based on selected sectors
  const filteredSeries = selectedSectors.length === 0
    ? mockSeries // Show all series if none selected
    : mockSeries.filter(series => 
        selectedSectors.includes(series.name)
      )
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">行业分析</h1>
        <div className="flex space-x-3">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[#152A4A]">
            <Info size={16} />
            <span>使用说明</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[#152A4A]">
            <Share size={16} />
            <span>分享</span>
          </button>
          <button 
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[#152A4A]"
            onClick={handleExport}
          >
            <ArrowDownToLine size={16} />
            <span>导出数据</span>
          </button>
        </div>
      </div>
      
      {/* Metrics overview */}
      <IndustryMetrics 
        metrics={mockMetrics} 
        isLoading={isLoading}
      />
      
      {/* Filters */}
      <IndustryFilterPanel
        sectors={mockSectors}
        selectedSectors={selectedSectors}
        onSectorChange={setSelectedSectors}
        timePeriod={timePeriod}
        onTimePeriodChange={setTimePeriod}
        comparisonType={comparisonType}
        onComparisonTypeChange={setComparisonType}
        chartType={chartType}
        onChartTypeChange={setChartType}
        onExport={handleExport}
        onRefresh={handleRefresh}
      />
      
      {/* Chart */}
      <IndustryChartContainer
        series={filteredSeries}
        chartType={chartType}
        comparisonType={comparisonType}
        timePeriod={timePeriod}
        isLoading={isLoading}
      />
      
      {/* Tabs for additional data views */}
      <Tabs defaultValue="companies" className="mt-8">
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="companies">龙头企业</TabsTrigger>
          <TabsTrigger value="segments">细分领域</TabsTrigger>
          <TabsTrigger value="regions">区域分布</TabsTrigger>
        </TabsList>
        
        <TabsContent value="companies" className="mt-4">
          <IndustryDataGrid
            columns={mockColumns}
            data={mockRows}
            isLoading={isLoading}
            onExport={handleExport}
          />
        </TabsContent>
        
        <TabsContent value="segments" className="mt-4">
          <div className="bg-[#152A4A] rounded-xl p-6 flex items-center justify-center h-[400px]">
            <div className="text-center">
              <div className="mb-4 text-gray-400">细分领域分析将在后续版本中推出</div>
              <button className="px-4 py-2 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition-colors">
                申请提前体验
              </button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="regions" className="mt-4">
          <div className="bg-[#152A4A] rounded-xl p-6 flex items-center justify-center h-[400px]">
            <div className="text-center">
              <div className="mb-4 text-gray-400">区域分布分析将在后续版本中推出</div>
              <button className="px-4 py-2 bg-[#1E88E5] text-white rounded-lg hover:bg-[#1976D2] transition-colors">
                申请提前体验
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 