"use client"

import { useEffect, useRef } from 'react'
import { 
  ChartType, 
  ComparisonType, 
  TimePeriod 
} from '@/components/features/IndustryFilterPanel'

// Import the Chart.js type definitions
import { Chart, ChartConfiguration, ChartData, ChartType as ChartJSType, registerables } from 'chart.js'

export interface IndustryDataPoint {
  date: string
  value: number
}

export interface IndustrySeries {
  id: string
  name: string
  color: string
  data: IndustryDataPoint[]
}

interface ChartContainerProps {
  series: IndustrySeries[]
  chartType: ChartType
  comparisonType: ComparisonType
  timePeriod: TimePeriod
  isLoading?: boolean
  error?: string
}

const IndustryChartContainer = ({
  series,
  chartType,
  comparisonType,
  timePeriod,
  isLoading = false,
  error = ''
}: ChartContainerProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  
  // Register all Chart.js components
  useEffect(() => {
    Chart.register(...registerables)
  }, [])
  
  // Create or update chart when props change
  useEffect(() => {
    if (isLoading || error || !chartRef.current) return
    
    const createOrUpdateChart = () => {
      const ctx = chartRef.current?.getContext('2d')
      if (!ctx) return
      
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
      
      // Prepare data for the chart
      const dates = getAllDates(series)
      
      const chartData: ChartData = {
        labels: dates,
        datasets: series.map(s => {
          const dataPoints = formatDataPoints(s.data, dates, comparisonType)
          
          return {
            label: s.name,
            data: dataPoints,
            borderColor: s.color,
            backgroundColor: `${s.color}20`, // 20 = 12% opacity in hex
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            tension: 0.2,
            fill: chartType === 'area'
          }
        })
      }
      
      // Configure chart options
      const config: ChartConfiguration = {
        type: mapChartType(chartType),
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#E2E8F0',
                font: {
                  family: 'PingFang SC, Microsoft YaHei, sans-serif'
                }
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: '#0A192F',
              borderColor: '#2A3F5F',
              borderWidth: 1,
              titleColor: '#E2E8F0',
              bodyColor: '#CBD5E0',
              callbacks: {
                label: function(context: any) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    if (comparisonType === 'percentage') {
                      label += context.parsed.y.toFixed(2) + '%';
                    } else {
                      label += context.parsed.y.toLocaleString();
                    }
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: '#2A3F5F',
                drawBorder: false
              },
              ticks: {
                color: '#A0AEC0',
                font: {
                  family: 'PingFang SC, Microsoft YaHei, sans-serif'
                },
                maxRotation: 0,
                // Show fewer ticks on small screens
                maxTicksLimit: window.innerWidth < 768 ? 6 : 12
              }
            },
            y: {
              grid: {
                color: '#2A3F5F',
                drawBorder: false
              },
              ticks: {
                color: '#A0AEC0',
                font: {
                  family: 'PingFang SC, Microsoft YaHei, sans-serif'
                },
                callback: function(value: any) {
                  if (comparisonType === 'percentage') {
                    return value + '%';
                  }
                  return value;
                }
              }
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          animations: {
            tension: {
              duration: 1000,
              easing: 'easeOutQuad'
            }
          }
        }
      }
      
      // Create new chart
      chartInstance.current = new Chart(ctx, config)
    }
    
    createOrUpdateChart()
    
    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [series, chartType, comparisonType, timePeriod, isLoading, error])
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="bg-[#152A4A] rounded-xl p-4 h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-[#1E88E5] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="mt-4 text-gray-400">加载中...</div>
        </div>
      </div>
    )
  }
  
  // Render error state
  if (error) {
    return (
      <div className="bg-[#152A4A] rounded-xl p-4 h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/20 text-red-500 mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-lg font-medium mb-2">数据加载失败</div>
          <div className="text-sm text-gray-400 max-w-md">{error}</div>
        </div>
      </div>
    )
  }
  
  // Render empty state when no data
  if (series.length === 0 || series.every(s => s.data.length === 0)) {
    return (
      <div className="bg-[#152A4A] rounded-xl p-4 h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0A192F] mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-lg font-medium mb-2">暂无数据</div>
          <div className="text-sm text-gray-400 max-w-md">尝试调整筛选条件或选择其他行业</div>
        </div>
      </div>
    )
  }
  
  // Render chart
  return (
    <div className="bg-[#152A4A] rounded-xl p-4">
      <div className="h-[400px]">
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}

// Helper Functions

// Get all unique dates from all series
function getAllDates(series: IndustrySeries[]): string[] {
  const dateSet = new Set<string>()
  
  series.forEach(s => {
    s.data.forEach(point => {
      dateSet.add(point.date)
    })
  })
  
  return Array.from(dateSet).sort()
}

// Format data points based on comparison type and fill missing dates
function formatDataPoints(
  data: IndustryDataPoint[], 
  allDates: string[], 
  comparisonType: ComparisonType
): (number | null)[] {
  // Create a map for quick lookup
  const dataMap = new Map<string, number>()
  data.forEach(point => {
    dataMap.set(point.date, point.value)
  })
  
  // Fill in missing dates with null
  const filledData = allDates.map(date => {
    return dataMap.has(date) ? dataMap.get(date)! : null
  })
  
  // Apply transformation based on comparison type
  if (comparisonType === 'percentage') {
    // Find the first non-null value as base
    const baseValue = filledData.find(val => val !== null) || 1
    return filledData.map(val => {
      if (val === null) return null
      return ((val - baseValue) / baseValue) * 100
    })
  } else if (comparisonType === 'indexed') {
    // Find the first non-null value as base
    const baseValue = filledData.find(val => val !== null) || 1
    return filledData.map(val => {
      if (val === null) return null
      return (val / baseValue) * 100
    })
  }
  
  // Return absolute values
  return filledData
}

// Map our chart types to Chart.js types
function mapChartType(type: ChartType): ChartJSType {
  switch (type) {
    case 'line':
      return 'line'
    case 'bar':
      return 'bar'
    case 'area':
      return 'line' // Area is a line chart with fill
    case 'candlestick':
      return 'line' // Chart.js doesn't have candlestick by default, fallback to line
    default:
      return 'line'
  }
}

export default IndustryChartContainer 