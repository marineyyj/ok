"use client"

import Image from 'next/image'
import { Clock, ExternalLink } from 'lucide-react'

// Mock data
const newsItems = [
  {
    id: 1,
    title: '腾讯控股发布2024财年第一季度财报，营收同比增长17%',
    company: '腾讯控股',
    time: '2小时前',
    image: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: 2,
    title: '阿里巴巴宣布新一轮组织架构调整，成立六大业务集团',
    company: '阿里巴巴',
    time: '4小时前',
    image: 'https://picsum.photos/100/100?random=2'
  },
  {
    id: 3,
    title: '美团第四季度营收同比增长22.4%，外卖业务持续增长',
    company: '美团',
    time: '昨天',
    image: 'https://picsum.photos/100/100?random=3'
  },
  {
    id: 4,
    title: '比亚迪发布全新电动汽车平台，计划进军高端市场',
    company: '比亚迪',
    time: '2天前',
    image: 'https://picsum.photos/100/100?random=4'
  }
]

const CompanyNews = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">公司快讯</h2>
        <button className="text-sm text-[#1E88E5] hover:underline">
          查看全部
        </button>
      </div>
      
      <div className="space-y-4">
        {newsItems.map((news) => (
          <div 
            key={news.id}
            className="bg-[#152A4A] rounded-lg p-4 flex gap-4 hover:bg-[#1a3056] transition-colors cursor-pointer"
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
            <div className="flex-1">
              <h3 className="font-medium line-clamp-2">{news.title}</h3>
              <div className="flex items-center mt-2 text-sm text-gray-300">
                <span className="bg-[#0A192F] px-2 py-0.5 rounded text-xs mr-2">
                  {news.company}
                </span>
                <Clock size={14} className="mr-1" />
                <span>{news.time}</span>
              </div>
            </div>
            <div className="flex-shrink-0 self-center">
              <ExternalLink size={16} className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompanyNews 