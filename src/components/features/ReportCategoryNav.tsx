"use client"

import { ChevronRight } from 'lucide-react'

export interface Category {
  id: string
  name: string
  count: number
  subcategories?: Category[]
}

interface ReportCategoryNavProps {
  categories: Category[]
  activeCategory?: string
  onCategorySelect: (categoryId: string) => void
}

const ReportCategoryNav = ({
  categories,
  activeCategory,
  onCategorySelect
}: ReportCategoryNavProps) => {
  return (
    <div className="bg-[#152A4A] rounded-xl p-4">
      <h2 className="text-lg font-medium mb-4">报告分类</h2>
      <div className="space-y-1">
        {categories.map((category) => (
          <CategoryItem 
            key={category.id}
            category={category}
            activeCategory={activeCategory}
            onCategorySelect={onCategorySelect}
          />
        ))}
      </div>
    </div>
  )
}

interface CategoryItemProps {
  category: Category
  activeCategory?: string
  onCategorySelect: (categoryId: string) => void
  level?: number
}

const CategoryItem = ({ 
  category, 
  activeCategory, 
  onCategorySelect,
  level = 0
}: CategoryItemProps) => {
  const isActive = category.id === activeCategory
  const hasSubcategories = category.subcategories && category.subcategories.length > 0
  
  return (
    <div>
      <div 
        className={`flex items-center justify-between py-2 px-3 rounded-md cursor-pointer ${
          isActive ? 'bg-[#1E88E5]/20 text-[#1E88E5]' : 'hover:bg-[#0A192F]'
        }`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={() => onCategorySelect(category.id)}
      >
        <div className="flex-1 flex items-center">
          <span className="truncate">{category.name}</span>
          <span className="ml-2 text-xs text-gray-400">({category.count})</span>
        </div>
        {hasSubcategories && (
          <ChevronRight size={16} className="text-gray-400" />
        )}
      </div>
      
      {hasSubcategories && (
        <div className="mt-1">
          {category.subcategories!.map((subcategory) => (
            <CategoryItem 
              key={subcategory.id}
              category={subcategory}
              activeCategory={activeCategory}
              onCategorySelect={onCategorySelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ReportCategoryNav 