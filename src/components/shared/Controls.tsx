"use client"

import { Filter, SortAsc, SortDesc, MoreHorizontal } from 'lucide-react'

interface FilterButtonProps {
  label: string
  active?: boolean
  onClick?: () => void
}

const FilterButton = ({ label, active = false, onClick }: FilterButtonProps) => {
  return (
    <button
      className={`px-3 py-1 rounded-full text-xs ${
        active 
          ? 'bg-[#1E88E5] text-white' 
          : 'bg-[#0A192F] text-gray-300 hover:bg-[#152A4A]'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

interface TimeFilterProps {
  options: string[]
  activeOption: string
  onChange: (option: string) => void
}

const TimeFilter = ({ options, activeOption, onChange }: TimeFilterProps) => {
  return (
    <div className="flex space-x-2">
      {options.map((option) => (
        <FilterButton
          key={option}
          label={option}
          active={option === activeOption}
          onClick={() => onChange(option)}
        />
      ))}
    </div>
  )
}

interface SortButtonProps {
  ascending: boolean
  onClick: () => void
}

const SortButton = ({ ascending, onClick }: SortButtonProps) => {
  return (
    <button
      className="p-1.5 rounded-full bg-[#152A4A] hover:bg-[#1a3056]"
      onClick={onClick}
    >
      {ascending ? <SortAsc size={16} /> : <SortDesc size={16} />}
    </button>
  )
}

interface FilterControlsProps {
  showFilter?: boolean
  showSort?: boolean
  showMore?: boolean
  onFilterClick?: () => void
  onSortClick?: () => void
  onMoreClick?: () => void
  sortAscending?: boolean
}

const FilterControls = ({
  showFilter = true,
  showSort = true,
  showMore = false,
  onFilterClick,
  onSortClick,
  onMoreClick,
  sortAscending = true
}: FilterControlsProps) => {
  return (
    <div className="flex items-center space-x-2">
      {showFilter && (
        <button
          className="flex items-center text-sm bg-[#152A4A] py-1.5 px-3 rounded-lg hover:bg-[#1a3056]"
          onClick={onFilterClick}
        >
          <Filter size={14} className="mr-1.5" />
          筛选
        </button>
      )}
      
      {showSort && (
        <SortButton ascending={sortAscending} onClick={onSortClick || (() => {})} />
      )}
      
      {showMore && (
        <button
          className="p-1.5 rounded-full bg-[#152A4A] hover:bg-[#1a3056]"
          onClick={onMoreClick}
        >
          <MoreHorizontal size={16} />
        </button>
      )}
    </div>
  )
}

export { FilterButton, TimeFilter, SortButton, FilterControls } 