"use client"

import { ArrowDown, ArrowUp, TrendingDown, TrendingUp, Minus } from 'lucide-react'

export interface IndustryMetric {
  id: string
  name: string
  value: number
  unit: string
  change: number // percentage change
  changeDirection: 'up' | 'down' | 'neutral'
  description?: string
}

interface IndustryMetricsProps {
  metrics: IndustryMetric[]
  isLoading?: boolean
}

const IndustryMetrics = ({
  metrics,
  isLoading = false
}: IndustryMetricsProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-[#152A4A] rounded-xl p-4 animate-pulse">
            <div className="h-4 w-24 bg-[#0A192F] rounded mb-4"></div>
            <div className="h-7 w-16 bg-[#0A192F] rounded mb-2"></div>
            <div className="h-4 w-20 bg-[#0A192F] rounded"></div>
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  )
}

interface MetricCardProps {
  metric: IndustryMetric
}

const MetricCard = ({ metric }: MetricCardProps) => {
  const { name, value, unit, change, changeDirection, description } = metric
  
  // Format the value based on its magnitude
  const formatValue = (val: number): string => {
    if (Math.abs(val) >= 1_000_000_000) {
      return (val / 1_000_000_000).toFixed(2) + '十亿'
    } else if (Math.abs(val) >= 1_000_000) {
      return (val / 1_000_000).toFixed(2) + '百万'
    } else if (Math.abs(val) >= 1_000) {
      return (val / 1_000).toFixed(2) + 'k'
    }
    return val.toLocaleString()
  }
  
  // Format change as percentage
  const formatChange = (val: number): string => {
    return Math.abs(val).toFixed(2) + '%'
  }
  
  // Get color based on change direction
  const getChangeColor = (direction: 'up' | 'down' | 'neutral'): string => {
    if (direction === 'up') return 'text-green-500'
    if (direction === 'down') return 'text-red-500'
    return 'text-gray-400'
  }
  
  // Get icon based on change direction
  const getChangeIcon = (direction: 'up' | 'down' | 'neutral') => {
    if (direction === 'up') return <TrendingUp size={16} />
    if (direction === 'down') return <TrendingDown size={16} />
    return <Minus size={16} />
  }
  
  return (
    <div className="bg-[#152A4A] rounded-xl p-4 hover:bg-[#1a3056] transition-colors">
      <div className="text-sm text-gray-400 mb-1">{name}</div>
      <div className="text-2xl font-semibold mb-2">
        {formatValue(value)}{unit && <span className="text-sm ml-1">{unit}</span>}
      </div>
      <div className="flex items-center">
        <div className={`flex items-center ${getChangeColor(changeDirection)}`}>
          {changeDirection === 'up' ? (
            <ArrowUp size={14} className="mr-1" />
          ) : changeDirection === 'down' ? (
            <ArrowDown size={14} className="mr-1" />
          ) : (
            <Minus size={14} className="mr-1" />
          )}
          <span>{formatChange(change)}</span>
        </div>
        <div className="ml-2 flex items-center text-xs text-gray-400">
          {getChangeIcon(changeDirection)}
          <span className="ml-1">{description || '较上期'}</span>
        </div>
      </div>
    </div>
  )
}

export default IndustryMetrics 