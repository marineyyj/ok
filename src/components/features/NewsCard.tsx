"use client"

import Image from 'next/image'
import { Clock, Bookmark, Share2, ExternalLink } from 'lucide-react'

export interface NewsItem {
  id: number
  title: string
  company: string
  companyCode?: string
  time: string
  image: string
  summary?: string
  tags?: string[]
  url?: string
  isImportant?: boolean
  isBookmarked?: boolean
}

interface NewsCardProps {
  news: NewsItem
  variant?: 'compact' | 'normal' | 'featured'
  onClick?: () => void
  onBookmark?: () => void
  onShare?: () => void
}

const NewsCard = ({
  news,
  variant = 'normal',
  onClick,
  onBookmark,
  onShare
}: NewsCardProps) => {
  // Prevent event bubbling for action buttons
  const handleActionClick = (e: React.MouseEvent, callback?: () => void) => {
    e.stopPropagation()
    if (callback) callback()
  }
  
  // Compact view (used in sidebars, lists)
  if (variant === 'compact') {
    return (
      <div 
        className="bg-[#152A4A] rounded-lg p-4 flex gap-4 hover:bg-[#1a3056] transition-colors cursor-pointer"
        onClick={onClick}
      >
        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
          <Image 
            src={news.image} 
            alt={news.title} 
            width={100} 
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm line-clamp-2">{news.title}</h3>
          <div className="flex items-center mt-2 text-xs text-gray-300">
            <span className="bg-[#0A192F] px-2 py-0.5 rounded text-xs mr-2">
              {news.company}
            </span>
            <Clock size={12} className="mr-1" />
            <span>{news.time}</span>
          </div>
        </div>
        <div className="flex-shrink-0 self-center">
          <ExternalLink size={16} className="text-gray-400" />
        </div>
      </div>
    )
  }
  
  // Featured view (larger, with summary)
  if (variant === 'featured') {
    return (
      <div 
        className="relative rounded-lg overflow-hidden cursor-pointer group"
        onClick={onClick}
      >
        <div className="relative h-[300px]">
          <Image 
            src={news.image} 
            alt={news.title} 
            width={800} 
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {news.isImportant && (
            <span className="bg-[#1E88E5] text-white px-2 py-1 rounded text-xs">
              重要公告
            </span>
          )}
          {news.tags && news.tags.length > 0 && (
            <div className="flex gap-2 mb-2">
              {news.tags.map((tag) => (
                <span key={tag} className="bg-[#0A192F]/60 text-white px-2 py-0.5 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className="text-xl font-bold mt-2 group-hover:text-[#1E88E5] transition-colors">{news.title}</h3>
          {news.summary && <p className="text-gray-300 mt-2 line-clamp-2">{news.summary}</p>}
          <div className="flex items-center justify-between mt-3">
            <div className="text-sm text-gray-300">
              <span>{news.company}</span>
              {news.companyCode && <span className="ml-2 text-gray-400">{news.companyCode}</span>}
            </div>
            <div className="flex items-center text-gray-300 text-sm">
              <Clock size={14} className="mr-1" />
              <span>{news.time}</span>
            </div>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 flex space-x-2">
          <button 
            className="p-2 rounded-full bg-[#0A192F]/60 hover:bg-[#1E88E5] transition-colors"
            onClick={(e) => handleActionClick(e, onBookmark)}
          >
            <Bookmark size={16} className={news.isBookmarked ? "fill-current text-[#1E88E5]" : ""} />
          </button>
          <button 
            className="p-2 rounded-full bg-[#0A192F]/60 hover:bg-[#1E88E5] transition-colors"
            onClick={(e) => handleActionClick(e, onShare)}
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>
    )
  }
  
  // Normal view (default card)
  return (
    <div 
      className="bg-[#152A4A] rounded-lg overflow-hidden hover:shadow-lg transition-all cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative h-[180px]">
        <Image 
          src={news.image} 
          alt={news.title} 
          width={400} 
          height={180}
          className="w-full h-full object-cover"
        />
        {news.isImportant && (
          <span className="absolute top-3 left-3 bg-[#1E88E5] text-white px-2 py-1 rounded text-xs">
            重要公告
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium line-clamp-2 hover:text-[#1E88E5] transition-colors">{news.title}</h3>
        {news.summary && <p className="text-sm text-gray-300 mt-2 line-clamp-2">{news.summary}</p>}
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="bg-[#0A192F] px-2 py-0.5 rounded text-xs">
            {news.company}
          </span>
          <div className="flex items-center text-gray-300 text-xs">
            <Clock size={12} className="mr-1" />
            <span>{news.time}</span>
          </div>
        </div>
      </div>
      
      <div className="flex border-t border-[#0A192F]">
        <button 
          className="flex-1 py-2 flex justify-center items-center hover:bg-[#0A192F]/50 transition-colors text-sm text-gray-300"
          onClick={(e) => handleActionClick(e, onBookmark)}
        >
          <Bookmark size={14} className={`mr-1 ${news.isBookmarked ? "fill-current text-[#1E88E5]" : ""}`} />
          收藏
        </button>
        <button 
          className="flex-1 py-2 flex justify-center items-center hover:bg-[#0A192F]/50 transition-colors text-sm text-gray-300 border-l border-[#0A192F]"
          onClick={(e) => handleActionClick(e, onShare)}
        >
          <Share2 size={14} className="mr-1" />
          分享
        </button>
      </div>
    </div>
  )
}

export default NewsCard 