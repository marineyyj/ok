"use client"

import Header from '@/components/layout/Header'
import Navigation from '@/components/layout/Navigation'
import CompanyNewsSection from '@/components/features/CompanyNewsSection'
import GlobalIndices from '@/components/features/GlobalIndices'

// Mock data for global indices
const mockGlobalIndices = [
  {
    id: 1,
    name: "上证指数",
    value: "3,345.60",
    change: "+0.88%",
    changeValue: "+29.23",
    isUp: true
  },
  {
    id: 2,
    name: "恒生指数",
    value: "19,204.32",
    change: "-0.25%",
    changeValue: "-48.46",
    isUp: false
  },
  {
    id: 3,
    name: "道琼斯",
    value: "37,653.23",
    change: "+0.34%",
    changeValue: "+127.80",
    isUp: true
  },
  {
    id: 4,
    name: "纳斯达克",
    value: "16,920.80",
    change: "+0.56%",
    changeValue: "+94.32",
    isUp: true
  }
]

interface DashboardProps {
  children: React.ReactNode
}

const Dashboard = ({ children }: DashboardProps) => {
  return (
    <div className="min-h-screen bg-[#0A192F] text-white">
      <Header />
      <div className="flex">
        {/* Left sidebar */}
        <aside className="fixed left-0 top-[60px] w-[240px] h-[calc(100vh-60px)] bg-[#0F2644] border-r border-[#2A3F5F] overflow-y-auto">
          <Navigation />
        </aside>
        
        {/* Main content */}
        <main className="ml-[240px] pt-[60px] min-h-screen w-full">
          <div className="flex">
            {/* Main content area */}
            <div className="flex-1 p-6">
              {children}
            </div>
            
            {/* Right sidebar - only visible on larger screens */}
            <aside className="w-[320px] border-l border-[#2A3F5F] bg-[#0F2644] p-4 overflow-y-auto hidden xl:block">
              <div className="space-y-6">
                <GlobalIndices 
                  indices={mockGlobalIndices}
                  className="mb-8" 
                  onRefresh={() => console.log("Refreshing indices")}
                  onSelectIndex={(index) => console.log("Selected index:", index.name)}
                />
                
                <CompanyNewsSection 
                  variant="sidebar"
                  maxItems={5}
                  showFeatured={false}
                />
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard 