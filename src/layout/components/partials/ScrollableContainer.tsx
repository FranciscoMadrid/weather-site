import React from 'react'
import CardContainer from './CardContainer'
import type { ForecastDay } from '@/lib/weather_api/type'
import type { IconType } from 'react-icons'

export interface ScrollableContainerProps {
  title?: string,
  icon?: IconType
  children: React.ReactNode, 
  className?: string
}

export default function ScrollableContainer({
  title = 'Default title',
  icon: Icon,
  children,
  className
}: ScrollableContainerProps) {
  return (
    <CardContainer className={`w-full ${className}`}>
      <div className='flex w-full flex-col gap-2 items-start justify-between'>
        {/* View Title */}
        <div className='flex flex-row gap-2 items-start pb-1 border-b-2 border-white/80 w-full'>
          {Icon && (<Icon size={26} className='h-auto w-auto text-white/80'/>)}
          <h2 className='font-light text-lg text-white/80'>
            {title}
          </h2>
        </div>

        <div className='flex flex-row h-full gap-5 py-2 w-full overflow-x-scroll custom-scrollbar'>
          <div className='flex shrink-0 gap-2 w-full'>
            {children}
          </div>
        </div>
      </div>
    </CardContainer>
  )
}
