"use client"

import React from 'react'
import { Newspaper, Clock, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export interface NewsItem {
  id: string
  title: string
  source: string
  timestamp: string
  url: string
  category: string
  isImportant?: boolean
}

interface NewsPanelProps {
  news: NewsItem[]
  className?: string
}

export default function NewsPanel({ news, className = '' }: NewsPanelProps) {
  // Format relative time (e.g., "3小时前")
  const getRelativeTime = (timestamp: string) => {
    const now = new Date()
    const newsTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - newsTime.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - newsTime.getTime()) / (1000 * 60))
      return `${diffInMinutes}分钟前`
    } else if (diffInHours < 24) {
      return `${diffInHours}小时前`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}天前`
    }
  }
  
  return (
    <div className={`bg-[#152A4A] rounded-xl overflow-hidden ${className}`}>
      <div className="p-4 border-b border-[#2A3F5F]">
        <h2 className="text-lg font-semibold flex items-center">
          <Newspaper size={18} className="mr-2 text-gray-400" />
          市场快讯
        </h2>
      </div>
      
      <div className="divide-y divide-[#2A3F5F]">
        {news.map(item => (
          <div key={item.id} className="p-4 hover:bg-[#0A192F]/60">
            <Link href={item.url} target="_blank" className="group">
              <div className="flex items-start justify-between">
                <h3 className="font-medium group-hover:text-blue-400 transition-colors">
                  {item.isImportant && (
                    <span className="inline-block px-1.5 py-0.5 text-xs bg-[#E15241] text-white rounded mr-2 align-middle">
                      重要
                    </span>
                  )}
                  {item.title}
                </h3>
                <ExternalLink size={16} className="text-gray-400 flex-shrink-0 mt-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="flex items-center text-sm text-gray-400 mt-2">
                <span className="bg-[#0A192F] px-2 py-0.5 rounded text-xs mr-2">
                  {item.category}
                </span>
                <span className="mr-2">{item.source}</span>
                <Clock size={14} className="mr-1" />
                <span>{getRelativeTime(item.timestamp)}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-[#2A3F5F] text-center">
        <Link href="/market-news" className="text-sm text-blue-400 hover:underline">
          查看更多市场新闻
        </Link>
      </div>
    </div>
  )
} 