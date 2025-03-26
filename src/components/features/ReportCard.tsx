"use client"

import Image from 'next/image'
import { Download, Bookmark, Share, Eye } from 'lucide-react'
import { useState } from 'react'

export interface Report {
  id: string
  title: string
  summary: string
  date: string
  category: string
  tags: string[]
  author: string
  company: string
  thumbnailUrl: string
  downloadUrl: string
  viewCount: number
  pageCount: number
  isFeatured?: boolean
  isBookmarked?: boolean
}

interface ReportCardProps {
  report: Report
  variant?: 'grid' | 'list'
  onClick?: (report: Report) => void
  onBookmark?: (report: Report) => void
  onDownload?: (report: Report) => void
  onShare?: (report: Report) => void
}

const ReportCard = ({
  report,
  variant = 'grid',
  onClick,
  onBookmark,
  onDownload,
  onShare
}: ReportCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const handleAction = (
    e: React.MouseEvent, 
    action?: (report: Report) => void
  ) => {
    e.stopPropagation()
    if (action) {
      action(report)
    }
  }
  
  // List view
  if (variant === 'list') {
    return (
      <div 
        className="bg-[#152A4A] rounded-lg p-4 flex gap-4 hover:bg-[#1a3056] cursor-pointer transition-colors border border-transparent hover:border-[#1E88E5]/30"
        onClick={() => onClick && onClick(report)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Thumbnail */}
        <div className="relative w-[120px] h-[160px] flex-shrink-0 rounded-md overflow-hidden">
          <Image
            src={report.thumbnailUrl}
            alt={report.title}
            fill
            className="object-cover"
          />
          {report.isFeatured && (
            <div className="absolute top-2 left-2 bg-[#1E88E5] text-white text-xs px-2 py-0.5 rounded">精选</div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-1 line-clamp-2">{report.title}</h3>
                <div className="flex gap-2 mb-3">
                  <span className="text-xs bg-[#0A192F] text-[#1E88E5] px-2 py-0.5 rounded-full">{report.category}</span>
                  {report.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-[#0A192F] text-gray-300 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              {isHovered && (
                <div className="flex space-x-1">
                  <button 
                    className="p-1.5 hover:bg-[#0A192F] rounded-full"
                    onClick={(e) => handleAction(e, onBookmark)}
                  >
                    <Bookmark size={16} className={report.isBookmarked ? "text-[#1E88E5]" : "text-gray-400"} />
                  </button>
                  <button 
                    className="p-1.5 hover:bg-[#0A192F] rounded-full"
                    onClick={(e) => handleAction(e, onDownload)}
                  >
                    <Download size={16} className="text-gray-400" />
                  </button>
                  <button 
                    className="p-1.5 hover:bg-[#0A192F] rounded-full"
                    onClick={(e) => handleAction(e, onShare)}
                  >
                    <Share size={16} className="text-gray-400" />
                  </button>
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-300 line-clamp-2 mb-3">{report.summary}</p>
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-400 mt-auto">
            <div className="flex items-center gap-2">
              <span>{report.author} · {report.company}</span>
              <span>{report.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center"><Eye size={14} className="mr-1" />{report.viewCount}</span>
              <span>{report.pageCount}页</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Grid view (default)
  return (
    <div 
      className="bg-[#152A4A] rounded-lg overflow-hidden flex flex-col hover:bg-[#1a3056] cursor-pointer transition-colors border border-transparent hover:border-[#1E88E5]/30 h-full"
      onClick={() => onClick && onClick(report)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-[180px]">
        <Image
          src={report.thumbnailUrl}
          alt={report.title}
          fill
          className="object-cover"
        />
        {report.isFeatured && (
          <div className="absolute top-2 left-2 bg-[#1E88E5] text-white text-xs px-2 py-0.5 rounded">精选</div>
        )}
        
        {/* Action buttons overlay */}
        {isHovered && (
          <div className="absolute bottom-2 right-2 flex space-x-1 bg-[#0A192F]/70 p-1 rounded-lg">
            <button 
              className="p-1.5 hover:bg-[#0A192F] rounded-full"
              onClick={(e) => handleAction(e, onBookmark)}
            >
              <Bookmark size={16} className={report.isBookmarked ? "text-[#1E88E5]" : "text-gray-400"} />
            </button>
            <button 
              className="p-1.5 hover:bg-[#0A192F] rounded-full"
              onClick={(e) => handleAction(e, onDownload)}
            >
              <Download size={16} className="text-gray-400" />
            </button>
            <button 
              className="p-1.5 hover:bg-[#0A192F] rounded-full"
              onClick={(e) => handleAction(e, onShare)}
            >
              <Share size={16} className="text-gray-400" />
            </button>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex gap-2 mb-2">
            <span className="text-xs bg-[#0A192F] text-[#1E88E5] px-2 py-0.5 rounded-full">{report.category}</span>
            {report.tags.slice(0, 1).map(tag => (
              <span key={tag} className="text-xs bg-[#0A192F] text-gray-300 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>
          <h3 className="font-medium line-clamp-2 mb-2">{report.title}</h3>
          <p className="text-sm text-gray-300 line-clamp-2">{report.summary}</p>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-400 mt-4">
          <div>
            <div>{report.author}</div>
            <div>{report.date}</div>
          </div>
          <div className="flex items-center">
            <Eye size={14} className="mr-1" />
            {report.viewCount}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportCard 