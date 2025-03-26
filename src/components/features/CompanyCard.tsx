"use client"

import Image from 'next/image'
import { ArrowUpRight, TrendingUp, TrendingDown, MapPin, Users, Building2 } from 'lucide-react'

export interface Company {
  id: string
  name: string
  ticker?: string
  exchange?: string
  logo?: string
  industry: string
  location?: string
  size?: string
  description?: string
  stockPrice?: number
  priceChange?: number
  priceChangePercent?: number
  employees?: number
  foundedYear?: number
  website?: string
  tags?: string[]
}

interface CompanyCardProps {
  company: Company
  layout?: 'grid' | 'list'
  onClick?: (company: Company) => void
  className?: string
}

const CompanyCard = ({
  company,
  layout = 'grid',
  onClick,
  className = '',
}: CompanyCardProps) => {
  const {
    name,
    ticker,
    exchange,
    logo,
    industry,
    location,
    description,
    stockPrice,
    priceChange,
    priceChangePercent,
    employees,
    tags
  } = company
  
  const handleClick = () => {
    if (onClick) {
      onClick(company)
    }
  }
  
  // Format price with appropriate decimal places
  const formatPrice = (price?: number) => {
    if (price === undefined) return '--'
    return price.toFixed(2)
  }
  
  // Determine color based on price change
  const getPriceChangeColor = () => {
    if (!priceChange) return 'text-gray-400'
    return priceChange > 0 ? 'text-green-500' : 'text-red-500'
  }
  
  // Format price change with sign and percentage
  const formatPriceChange = () => {
    if (priceChange === undefined || priceChangePercent === undefined) return '--'
    const sign = priceChange >= 0 ? '+' : ''
    return `${sign}${priceChange.toFixed(2)} (${sign}${priceChangePercent.toFixed(2)}%)`
  }
  
  // Generate a placeholder for missing logos
  const getLogoPlaceholder = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0A192F&color=fff&size=100`
  }
  
  if (layout === 'list') {
    return (
      <div 
        className={`bg-[#152A4A] rounded-xl hover:bg-[#1a3056] transition-colors cursor-pointer ${className}`}
        onClick={handleClick}
      >
        <div className="p-4 flex items-center">
          <div className="flex-shrink-0 w-12 h-12 mr-4 overflow-hidden rounded-lg bg-[#0A192F]">
            <Image 
              src={logo || getLogoPlaceholder()} 
              alt={`${name} logo`}
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium truncate">
                  {name}
                  {ticker && exchange && (
                    <span className="ml-2 text-sm text-gray-400">
                      {exchange}:{ticker}
                    </span>
                  )}
                </h3>
                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <Building2 size={14} className="mr-1" />
                  <span className="mr-3">{industry}</span>
                  
                  {location && (
                    <>
                      <MapPin size={14} className="mr-1" />
                      <span className="mr-3">{location}</span>
                    </>
                  )}
                  
                  {employees && (
                    <>
                      <Users size={14} className="mr-1" />
                      <span>{employees.toLocaleString()} 名员工</span>
                    </>
                  )}
                </div>
              </div>
              
              {stockPrice !== undefined && (
                <div className="text-right">
                  <div className="font-medium">{formatPrice(stockPrice)}</div>
                  <div className={`text-sm flex items-center justify-end ${getPriceChangeColor()}`}>
                    {priceChange !== undefined && priceChange > 0 ? (
                      <TrendingUp size={14} className="mr-1" />
                    ) : (
                      <TrendingDown size={14} className="mr-1" />
                    )}
                    {formatPriceChange()}
                  </div>
                </div>
              )}
            </div>
            
            {description && (
              <p className="mt-2 text-sm text-gray-300 line-clamp-2">{description}</p>
            )}
            
            {tags && tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#0A192F] text-gray-300 rounded text-xs">
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="px-2 py-0.5 bg-[#0A192F] text-gray-400 rounded text-xs">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="ml-4">
            <ArrowUpRight size={18} className="text-gray-400" />
          </div>
        </div>
      </div>
    )
  }
  
  // Grid layout (default)
  return (
    <div 
      className={`bg-[#152A4A] rounded-xl hover:bg-[#1a3056] transition-colors cursor-pointer h-full ${className}`}
      onClick={handleClick}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 mr-3 overflow-hidden rounded-lg bg-[#0A192F]">
            <Image 
              src={logo || getLogoPlaceholder()} 
              alt={`${name} logo`}
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{name}</h3>
            {ticker && exchange && (
              <div className="text-sm text-gray-400">
                {exchange}:{ticker}
              </div>
            )}
          </div>
          
          {stockPrice !== undefined && (
            <div className={`px-2 py-1 rounded text-sm ${getPriceChangeColor()}`}>
              {priceChange !== undefined && priceChange > 0 ? (
                <TrendingUp size={14} className="inline mr-1" />
              ) : (
                <TrendingDown size={14} className="inline mr-1" />
              )}
              {priceChangePercent?.toFixed(2)}%
            </div>
          )}
        </div>
        
        <div className="text-sm text-gray-400 mb-3">
          <div className="flex items-center mb-1">
            <Building2 size={14} className="mr-2" />
            <span>{industry}</span>
          </div>
          
          {location && (
            <div className="flex items-center mb-1">
              <MapPin size={14} className="mr-2" />
              <span>{location}</span>
            </div>
          )}
          
          {employees && (
            <div className="flex items-center">
              <Users size={14} className="mr-2" />
              <span>{employees.toLocaleString()} 名员工</span>
            </div>
          )}
        </div>
        
        {description && (
          <p className="text-sm text-gray-300 mb-3 line-clamp-2 flex-grow">{description}</p>
        )}
        
        {tags && tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-[#0A192F] text-gray-300 rounded text-xs">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 bg-[#0A192F] text-gray-400 rounded text-xs">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CompanyCard 