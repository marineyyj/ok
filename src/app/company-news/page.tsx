"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CompanyNewsSection from '@/components/features/CompanyNewsSection'
import { Bookmark, Clock, Filter, TrendingUp } from 'lucide-react'

export default function CompanyNewsPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">公司快讯</h1>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[#152A4A]">
              <Clock size={16} />
              <span>最近访问</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[#152A4A]">
              <Bookmark size={16} />
              <span>收藏</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[#152A4A]">
              <TrendingUp size={16} />
              <span>热门</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm hover:bg-[#152A4A]">
              <Filter size={16} />
              <span>筛选</span>
            </button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-[#2A3F5F] rounded-none p-0">
            <TabsTrigger 
              value="all" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1E88E5] data-[state=active]:bg-transparent px-4 py-2"
            >
              全部快讯
            </TabsTrigger>
            <TabsTrigger 
              value="following" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1E88E5] data-[state=active]:bg-transparent px-4 py-2"
            >
              关注公司
            </TabsTrigger>
            <TabsTrigger 
              value="holdings" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1E88E5] data-[state=active]:bg-transparent px-4 py-2"
            >
              持仓公司
            </TabsTrigger>
            <TabsTrigger 
              value="watchlist" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1E88E5] data-[state=active]:bg-transparent px-4 py-2"
            >
              股票观察名单
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="all" className="mt-0">
              <CompanyNewsSection 
                variant="full"
                showFeatured={true}
              />
            </TabsContent>
            
            <TabsContent value="following" className="mt-0">
              <CompanyNewsSection 
                variant="full"
                showFeatured={true}
              />
            </TabsContent>
            
            <TabsContent value="holdings" className="mt-0">
              <CompanyNewsSection 
                variant="full"
                showFeatured={true}
              />
            </TabsContent>
            
            <TabsContent value="watchlist" className="mt-0">
              <CompanyNewsSection 
                variant="full"
                showFeatured={true}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
} 