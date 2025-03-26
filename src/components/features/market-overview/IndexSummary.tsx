"use client"

import React from 'react'
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export interface MarketIndex {
  id: string
  name: string
  value: number
  change: number
  changePercent: number
  high: number
  low: number
  volume: string
  turnover: string
}

interface IndexSummaryProps {
  indices: MarketIndex[]
  className?: string
}

export default function IndexSummary({ indices, className = '' }: IndexSummaryProps) {
  // Helper to format numbers with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <div className={`bg-[#152A4A] rounded-xl overflow-hidden ${className}`}>
      <div className="p-4 border-b border-[#2A3F5F]">
        <h2 className="text-lg font-semibold flex items-center">
          <TrendingUp size={18} className="mr-2 text-gray-400" />
          市场指数概览
        </h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-[#0A192F] text-gray-400 text-sm">
              <th className="py-3 px-4 text-left font-medium">指数名称</th>
              <th className="py-3 px-4 text-right font-medium">最新</th>
              <th className="py-3 px-4 text-right font-medium">涨跌</th>
              <th className="py-3 px-4 text-right font-medium">涨跌幅</th>
              <th className="py-3 px-4 text-right font-medium">最高</th>
              <th className="py-3 px-4 text-right font-medium">最低</th>
              <th className="py-3 px-4 text-right font-medium">成交量</th>
              <th className="py-3 px-4 text-right font-medium">成交额</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A3F5F]">
            {indices.map(index => (
              <tr key={index.id} className="hover:bg-[#0A192F]/60">
                <td className="py-3 px-4">
                  <Link href={`/market-indices/${index.id}`} className="font-medium hover:text-blue-400">
                    {index.name}
                  </Link>
                </td>
                <td className="py-3 px-4 text-right font-medium">
                  {formatNumber(index.value)}
                </td>
                <td className={`py-3 px-4 text-right ${index.change >= 0 ? 'text-[#E15241]' : 'text-[#03A66D]'}`}>
                  {index.change >= 0 ? '+' : ''}{formatNumber(index.change)}
                </td>
                <td className={`py-3 px-4 text-right flex items-center justify-end ${index.changePercent >= 0 ? 'text-[#E15241]' : 'text-[#03A66D]'}`}>
                  {index.changePercent >= 0 ? (
                    <ArrowUpRight size={16} className="mr-1" />
                  ) : (
                    <ArrowDownRight size={16} className="mr-1" />
                  )}
                  {index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%
                </td>
                <td className="py-3 px-4 text-right">
                  {formatNumber(index.high)}
                </td>
                <td className="py-3 px-4 text-right">
                  {formatNumber(index.low)}
                </td>
                <td className="py-3 px-4 text-right text-gray-400">
                  {index.volume}
                </td>
                <td className="py-3 px-4 text-right text-gray-400">
                  {index.turnover}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 