"use client"

import Image from 'next/image'
import { Download, Filter } from 'lucide-react'

// Mock data
const industryData = [
  { id: 1, name: '科技', value: 28.5, color: '#1E88E5' },
  { id: 2, name: '金融', value: 22.3, color: '#00BCD4' },
  { id: 3, name: '医疗健康', value: 15.7, color: '#4CAF50' },
  { id: 4, name: '消费品', value: 12.8, color: '#FFC107' },
  { id: 5, name: '能源', value: 10.1, color: '#FF5722' },
  { id: 6, name: '其他', value: 10.6, color: '#9E9E9E' }
]

const Analysis = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">行业分析</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center text-sm bg-[#152A4A] py-1.5 px-3 rounded-lg hover:bg-[#1a3056]">
            <Filter size={14} className="mr-1.5" />
            筛选
          </button>
          <button className="flex items-center text-sm bg-[#152A4A] py-1.5 px-3 rounded-lg hover:bg-[#1a3056]">
            <Download size={14} className="mr-1.5" />
            下载
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#152A4A] rounded-lg p-4">
          <h3 className="font-medium mb-4">行业市值占比</h3>
          <div className="h-[250px] relative">
            <Image 
              src="https://picsum.photos/400/250?random=5" 
              alt="Industry pie chart" 
              width={400} 
              height={250}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {industryData.map((industry) => (
              <div key={industry.id} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: industry.color }}
                ></div>
                <span className="text-xs">{industry.name} {industry.value}%</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#152A4A] rounded-lg p-4">
          <h3 className="font-medium mb-4">行业表现趋势</h3>
          <div className="h-[250px] relative">
            <Image 
              src="https://picsum.photos/400/250?random=6" 
              alt="Industry trends chart" 
              width={400} 
              height={250}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div className="flex space-x-2">
              <button className="bg-[#1E88E5] text-white px-3 py-1 rounded-full text-xs">周度</button>
              <button className="bg-[#0A192F] text-white px-3 py-1 rounded-full text-xs">月度</button>
              <button className="bg-[#0A192F] text-white px-3 py-1 rounded-full text-xs">年度</button>
            </div>
            <div className="text-xs text-gray-300">更新于 2023-04-01</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analysis 