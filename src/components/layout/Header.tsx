"use client"

import { Search, User, Bell } from 'lucide-react'

const Header = () => {
  return (
    <header className="w-full h-[60px] bg-gradient-to-r from-[#0A192F] to-[#1E3A8A] text-white fixed top-0 left-0 z-50 shadow-md">
      <div className="max-w-[1200px] mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">财经分析</div>
        </div>
        
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input 
              type="text" 
              placeholder="搜索公司、股票代码或行业" 
              className="w-full py-2 px-4 pl-10 rounded-full bg-[#152A4A] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-[#152A4A]">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-[#152A4A]">
            <User size={20} />
          </button>
          <button className="bg-[#4CAF50] py-1.5 px-4 rounded-full text-sm font-medium hover:bg-[#3d9140] transition-colors">
            登录
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header 