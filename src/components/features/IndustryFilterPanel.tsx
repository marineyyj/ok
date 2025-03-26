"use client"

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Calendar, Filter, Download, RefreshCw } from 'lucide-react'

export type TimePeriod = '1d' | '1w' | '1m' | '3m' | '6m' | '1y' | '5y' | 'max'
export type ComparisonType = 'absolute' | 'percentage' | 'indexed'
export type ChartType = 'line' | 'bar' | 'area' | 'candlestick'

export interface FilterPanelProps {
  sectors: string[]
  selectedSectors: string[]
  onSectorChange: (sectors: string[]) => void
  timePeriod: TimePeriod
  onTimePeriodChange: (period: TimePeriod) => void
  comparisonType: ComparisonType
  onComparisonTypeChange: (type: ComparisonType) => void
  chartType: ChartType
  onChartTypeChange: (type: ChartType) => void
  onExport: () => void
  onRefresh: () => void
}

interface ChartTypeItem {
  name: string
  icon: React.ReactNode
}

const timePeriodLabels: Record<TimePeriod, string> = {
  '1d': '1天',
  '1w': '1周',
  '1m': '1个月',
  '3m': '3个月',
  '6m': '6个月',
  '1y': '1年',
  '5y': '5年',
  'max': '最大'
}

const comparisonTypeLabels: Record<ComparisonType, string> = {
  'absolute': '绝对值',
  'percentage': '百分比变化',
  'indexed': '指数化'
}

const chartTypeLabels: Record<ChartType, ChartTypeItem> = {
  'line': { 
    name: '折线图', 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 16L8 11L13 16L21 8M21 8V14M21 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  'bar': { 
    name: '柱状图', 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  'area': { 
    name: '面积图', 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 18L7 13L11 15L20 7M20 7V12M20 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 18L7 13L11 15L20 7V18H3Z" fill="currentColor" fillOpacity="0.2"/>
      </svg>
    )
  },
  'candlestick': { 
    name: 'K线图', 
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5V19M8 6.5H12V13.5H8M16 5V19M16 10.5H12V17.5H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }
}

const IndustryFilterPanel = ({
  sectors,
  selectedSectors,
  onSectorChange,
  timePeriod,
  onTimePeriodChange,
  comparisonType,
  onComparisonTypeChange,
  chartType,
  onChartTypeChange,
  onExport,
  onRefresh
}: FilterPanelProps) => {
  // Dropdown states
  const [showSectorDropdown, setShowSectorDropdown] = useState(false)
  const [showTimePeriodDropdown, setShowTimePeriodDropdown] = useState(false)
  const [showComparisonDropdown, setShowComparisonDropdown] = useState(false)
  const [showChartTypeDropdown, setShowChartTypeDropdown] = useState(false)
  
  // Refs for dropdown closing on outside click
  const sectorDropdownRef = useRef<HTMLDivElement>(null)
  const timePeriodDropdownRef = useRef<HTMLDivElement>(null)
  const comparisonDropdownRef = useRef<HTMLDivElement>(null)
  const chartTypeDropdownRef = useRef<HTMLDivElement>(null)
  
  // Handle sector selection
  const toggleSector = (sector: string) => {
    if (selectedSectors.includes(sector)) {
      onSectorChange(selectedSectors.filter(s => s !== sector))
    } else {
      onSectorChange([...selectedSectors, sector])
    }
  }
  
  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sectorDropdownRef.current && !sectorDropdownRef.current.contains(event.target as Node)) {
        setShowSectorDropdown(false)
      }
      if (timePeriodDropdownRef.current && !timePeriodDropdownRef.current.contains(event.target as Node)) {
        setShowTimePeriodDropdown(false)
      }
      if (comparisonDropdownRef.current && !comparisonDropdownRef.current.contains(event.target as Node)) {
        setShowComparisonDropdown(false)
      }
      if (chartTypeDropdownRef.current && !chartTypeDropdownRef.current.contains(event.target as Node)) {
        setShowChartTypeDropdown(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  return (
    <div className="bg-[#152A4A] p-4 rounded-xl">
      <div className="flex flex-wrap gap-3 mb-3">
        {/* Sector dropdown */}
        <div className="relative" ref={sectorDropdownRef}>
          <button 
            className="px-3 py-2 flex items-center bg-[#0A192F] rounded-lg hover:bg-[#152A4A] transition-colors border border-[#2A3F5F] min-w-[140px]"
            onClick={() => setShowSectorDropdown(!showSectorDropdown)}
          >
            <Filter size={14} className="mr-2 text-gray-400" />
            <span className="flex-1 text-left">
              {selectedSectors.length === 0 
                ? '全部行业' 
                : selectedSectors.length === 1 
                  ? selectedSectors[0] 
                  : `已选 ${selectedSectors.length} 项`
              }
            </span>
            <ChevronDown size={14} className="ml-2 text-gray-400" />
          </button>
          
          {showSectorDropdown && (
            <div className="absolute z-10 mt-2 w-64 rounded-lg border border-[#2A3F5F] bg-[#0A192F] shadow-lg">
              <div className="p-2 max-h-[300px] overflow-y-auto">
                {sectors.map((sector) => (
                  <div 
                    key={sector}
                    className="flex items-center px-3 py-2 hover:bg-[#152A4A] rounded-md cursor-pointer"
                    onClick={() => toggleSector(sector)}
                  >
                    <div className={`w-4 h-4 border rounded mr-2 ${
                      selectedSectors.includes(sector) 
                        ? 'bg-[#1E88E5] border-[#1E88E5] flex items-center justify-center' 
                        : 'border-[#2A3F5F]'
                    }`}>
                      {selectedSectors.includes(sector) && (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      )}
                    </div>
                    <span>{sector}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between p-2 border-t border-[#2A3F5F]">
                <button 
                  className="text-sm text-gray-400 hover:text-white px-3 py-1"
                  onClick={() => onSectorChange([])}
                >
                  清除选择
                </button>
                <button 
                  className="text-sm text-[#1E88E5] hover:text-[#1976D2] px-3 py-1"
                  onClick={() => setShowSectorDropdown(false)}
                >
                  确定
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Time period dropdown */}
        <div className="relative" ref={timePeriodDropdownRef}>
          <button 
            className="px-3 py-2 flex items-center bg-[#0A192F] rounded-lg hover:bg-[#152A4A] transition-colors border border-[#2A3F5F] min-w-[100px]"
            onClick={() => setShowTimePeriodDropdown(!showTimePeriodDropdown)}
          >
            <Calendar size={14} className="mr-2 text-gray-400" />
            <span className="flex-1 text-left">{timePeriodLabels[timePeriod]}</span>
            <ChevronDown size={14} className="ml-2 text-gray-400" />
          </button>
          
          {showTimePeriodDropdown && (
            <div className="absolute z-10 mt-2 w-40 rounded-lg border border-[#2A3F5F] bg-[#0A192F] shadow-lg">
              {(Object.keys(timePeriodLabels) as TimePeriod[]).map((period) => (
                <div 
                  key={period}
                  className={`px-4 py-2 hover:bg-[#152A4A] cursor-pointer ${period === timePeriod ? 'text-[#1E88E5]' : ''}`}
                  onClick={() => {
                    onTimePeriodChange(period)
                    setShowTimePeriodDropdown(false)
                  }}
                >
                  {timePeriodLabels[period]}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Comparison type dropdown */}
        <div className="relative" ref={comparisonDropdownRef}>
          <button 
            className="px-3 py-2 flex items-center bg-[#0A192F] rounded-lg hover:bg-[#152A4A] transition-colors border border-[#2A3F5F] min-w-[120px]"
            onClick={() => setShowComparisonDropdown(!showComparisonDropdown)}
          >
            <span className="flex-1 text-left">{comparisonTypeLabels[comparisonType]}</span>
            <ChevronDown size={14} className="ml-2 text-gray-400" />
          </button>
          
          {showComparisonDropdown && (
            <div className="absolute z-10 mt-2 w-40 rounded-lg border border-[#2A3F5F] bg-[#0A192F] shadow-lg">
              {(Object.keys(comparisonTypeLabels) as ComparisonType[]).map((type) => (
                <div 
                  key={type}
                  className={`px-4 py-2 hover:bg-[#152A4A] cursor-pointer ${type === comparisonType ? 'text-[#1E88E5]' : ''}`}
                  onClick={() => {
                    onComparisonTypeChange(type)
                    setShowComparisonDropdown(false)
                  }}
                >
                  {comparisonTypeLabels[type]}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Chart type dropdown */}
        <div className="relative" ref={chartTypeDropdownRef}>
          <button 
            className="px-3 py-2 flex items-center bg-[#0A192F] rounded-lg hover:bg-[#152A4A] transition-colors border border-[#2A3F5F] min-w-[100px]"
            onClick={() => setShowChartTypeDropdown(!showChartTypeDropdown)}
          >
            <span className="flex-1 flex items-center text-left">
              {chartTypeLabels[chartType].icon}
              <span className="ml-2">{chartTypeLabels[chartType].name}</span>
            </span>
            <ChevronDown size={14} className="ml-2 text-gray-400" />
          </button>
          
          {showChartTypeDropdown && (
            <div className="absolute z-10 mt-2 w-40 rounded-lg border border-[#2A3F5F] bg-[#0A192F] shadow-lg">
              {(Object.keys(chartTypeLabels) as ChartType[]).map((type) => (
                <div 
                  key={type}
                  className={`px-4 py-2 flex items-center hover:bg-[#152A4A] cursor-pointer ${type === chartType ? 'text-[#1E88E5]' : ''}`}
                  onClick={() => {
                    onChartTypeChange(type)
                    setShowChartTypeDropdown(false)
                  }}
                >
                  {chartTypeLabels[type].icon}
                  <span className="ml-2">{chartTypeLabels[type].name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="ml-auto flex gap-2">
          <button 
            className="px-3 py-2 flex items-center bg-[#0A192F] rounded-lg hover:bg-[#152A4A] transition-colors border border-[#2A3F5F]"
            onClick={onExport}
          >
            <Download size={16} className="mr-2" />
            导出
          </button>
          <button 
            className="px-3 py-2 flex items-center bg-[#0A192F] rounded-lg hover:bg-[#152A4A] transition-colors border border-[#2A3F5F]"
            onClick={onRefresh}
          >
            <RefreshCw size={16} className="mr-2" />
            刷新
          </button>
        </div>
      </div>
      
      {/* Active filters display */}
      {selectedSectors.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedSectors.map(sector => (
            <div 
              key={sector}
              className="flex items-center bg-[#1E88E5]/20 text-[#1E88E5] px-2 py-1 rounded-full text-xs"
            >
              <span>{sector}</span>
              <button 
                className="ml-1.5 p-0.5 rounded-full hover:bg-[#1E88E5]/30"
                onClick={() => toggleSector(sector)}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default IndustryFilterPanel 