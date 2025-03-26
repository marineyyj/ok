"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'

export interface FilterOption {
  id: string
  label: string
  count?: number
}

export interface FilterGroup {
  id: string
  name: string
  options: FilterOption[]
}

export interface CompanyFilterPanelProps {
  filterGroups: FilterGroup[]
  selectedFilters: Record<string, string[]>
  onFilterChange: (groupId: string, filterId: string, isSelected: boolean) => void
  onClearFilters: () => void
  className?: string
}

const CompanyFilterPanel = ({
  filterGroups,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  className = '',
}: CompanyFilterPanelProps) => {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  // Toggle the collapsed state of a filter group
  const toggleGroup = (groupId: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  // Check if a filter is selected
  const isFilterSelected = (groupId: string, filterId: string) => {
    return selectedFilters[groupId]?.includes(filterId) || false
  }

  // Count total selected filters
  const countSelectedFilters = () => {
    return Object.values(selectedFilters).reduce(
      (total, filters) => total + filters.length, 
      0
    )
  }

  // Active filter count for a group
  const activeFilterCount = (groupId: string) => {
    return selectedFilters[groupId]?.length || 0
  }

  return (
    <div className={`bg-[#152A4A] rounded-xl overflow-hidden ${className}`}>
      <div className="p-4 border-b border-[#2A3F5F] flex items-center justify-between">
        <h3 className="font-medium">筛选条件</h3>
        {countSelectedFilters() > 0 && (
          <button 
            onClick={onClearFilters}
            className="text-xs text-[#1E88E5] hover:text-[#1976D2]"
          >
            清除全部
          </button>
        )}
      </div>
      
      <div className="max-h-[calc(100vh-210px)] overflow-y-auto">
        {filterGroups.map((group) => (
          <div key={group.id} className="border-b border-[#2A3F5F] last:border-b-0">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#0A192F] transition-colors"
              onClick={() => toggleGroup(group.id)}
            >
              <div className="flex items-center">
                <span className="font-medium">{group.name}</span>
                {activeFilterCount(group.id) > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-[#1E88E5] text-white rounded-full">
                    {activeFilterCount(group.id)}
                  </span>
                )}
              </div>
              {collapsedGroups[group.id] ? (
                <ChevronUp size={16} className="text-gray-400" />
              ) : (
                <ChevronDown size={16} className="text-gray-400" />
              )}
            </div>
            
            {!collapsedGroups[group.id] && (
              <div className="px-4 pb-3">
                {group.options.map((option) => (
                  <div 
                    key={option.id} 
                    className="flex items-center py-2 cursor-pointer hover:bg-[#0A192F] rounded-md px-2 -mx-2"
                    onClick={() => onFilterChange(
                      group.id, 
                      option.id, 
                      !isFilterSelected(group.id, option.id)
                    )}
                  >
                    <div className={`w-4 h-4 border rounded mr-2 transition-colors ${
                      isFilterSelected(group.id, option.id)
                        ? 'bg-[#1E88E5] border-[#1E88E5] flex items-center justify-center'
                        : 'border-[#2A3F5F]'
                    }`}>
                      {isFilterSelected(group.id, option.id) && (
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-white">
                          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                        </svg>
                      )}
                    </div>
                    <span className="flex-1">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-xs text-gray-400">{option.count}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Active filters section */}
      {countSelectedFilters() > 0 && (
        <div className="p-4 border-t border-[#2A3F5F]">
          <div className="text-sm font-medium mb-2">已选筛选条件</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([groupId, filterIds]) =>
              filterIds.map(filterId => {
                const group = filterGroups.find(g => g.id === groupId)
                const option = group?.options.find(o => o.id === filterId)
                
                if (!group || !option) return null
                
                return (
                  <div 
                    key={`${groupId}-${filterId}`}
                    className="flex items-center bg-[#1E88E5]/20 text-[#1E88E5] px-2 py-1 rounded-full text-xs"
                  >
                    <span>{option.label}</span>
                    <button 
                      className="ml-1.5 p-0.5 rounded-full hover:bg-[#1E88E5]/30"
                      onClick={() => onFilterChange(groupId, filterId, false)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CompanyFilterPanel 