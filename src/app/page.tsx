import Dashboard from '@/components/layout/Dashboard'
import MarketData from '@/components/features/MarketData'
import CompanyNews from '@/components/features/CompanyNews'
import Analysis from '@/components/features/Analysis'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from "next/link"

export default function Home() {
  return (
    <Dashboard>
      <div className="space-y-8">
        {/* Hero Banner */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
          <Image 
            src="https://picsum.photos/1200/400" 
            alt="Financial market banner" 
            width={1200} 
            height={400}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/80 to-transparent flex flex-col justify-center px-12">
            <h1 className="text-4xl font-bold mb-4">智能财经分析平台</h1>
            <p className="text-lg max-w-lg mb-6">
              探索市场趋势、行业分析、公司财报，助您做出明智的投资决策
            </p>
            <div>
              <button className="bg-[#4CAF50] text-white px-6 py-3 rounded-lg flex items-center hover:bg-[#3d9140] transition-colors">
                开始分析
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MarketData />
          </div>
          <div>
            <CompanyNews />
          </div>
        </div>
        
        <div className="mt-8">
          <Analysis />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-8">
        <Link 
          href="/market-indices" 
          className="p-6 bg-[#152A4A] hover:bg-[#1d365e] rounded-xl text-center"
        >
          <h2 className="text-xl font-semibold mb-2">市场指数</h2>
          <p className="text-sm text-gray-400">查看全球股市指数数据</p>
        </Link>
        <Link 
          href="/company-news" 
          className="p-6 bg-[#152A4A] hover:bg-[#1d365e] rounded-xl text-center"
        >
          <h2 className="text-xl font-semibold mb-2">公司快讯</h2>
          <p className="text-sm text-gray-400">了解最新公司动态</p>
        </Link>
        <Link 
          href="/research-reports" 
          className="p-6 bg-[#152A4A] hover:bg-[#1d365e] rounded-xl text-center"
        >
          <h2 className="text-xl font-semibold mb-2">研究报告</h2>
          <p className="text-sm text-gray-400">浏览行业分析和研究报告</p>
        </Link>
        <Link 
          href="/industry-analysis" 
          className="p-6 bg-[#152A4A] hover:bg-[#1d365e] rounded-xl text-center"
        >
          <h2 className="text-xl font-semibold mb-2">行业分析</h2>
          <p className="text-sm text-gray-400">查看行业趋势与数据可视化</p>
        </Link>
      </div>
    </Dashboard>
  )
}
