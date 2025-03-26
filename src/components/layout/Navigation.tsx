"use client"

import { Home, BarChart2, Newspaper, LineChart, Search, PieChart, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigationItems = [
  { name: '市场概况', icon: Home, href: '/' },
  { name: '股指信息', icon: BarChart2, href: '/market-indices' },
  { name: '公司快讯', icon: Newspaper, href: '/company-news' },
  { name: '研究报告', icon: LineChart, href: '/research-reports' },
  { name: '行业分析', icon: PieChart, href: '/industry-analysis' },
  { name: '搜索公司', icon: Search, href: '/company-search' },
]

const Navigation = () => {
  const pathname = usePathname()

  return (
    <nav className="w-[240px] h-screen bg-[#0A192F] text-white fixed left-0 top-0 pt-[70px] pb-6 z-40">
      <div className="flex flex-col space-y-1 px-3 mt-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.name}
              href={item.href}
              className={`flex items-center py-3 px-4 rounded-lg ${
                isActive 
                  ? 'bg-[#1E88E5] text-white' 
                  : 'text-gray-300 hover:bg-[#152A4A] hover:text-white'
              } transition-colors`}
            >
              <item.icon size={18} className="mr-3" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>

      <div className="px-3 mt-auto pt-6 border-t border-[#152A4A] mx-3">
        <Link
          href="/settings"
          className="flex items-center py-3 px-4 rounded-lg text-gray-300 hover:bg-[#152A4A] hover:text-white transition-colors"
        >
          <Settings size={18} className="mr-3" />
          <span>设置</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navigation 