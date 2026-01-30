import React from 'react'
import CardContainer from '../../partials/CardContainer'
import type { IconType } from 'react-icons'

export interface TempDetailCard {
  className?: string,
  title: string,
  subtitle?: string,
  metric: string,
  tempSymbol?: string
  icon?: IconType
}
export default function TempDetailCard({
  className,
  title,
  subtitle,
  metric,
  tempSymbol,
  icon: Icon
}:TempDetailCard) {
  return (
    <CardContainer className={className}>
      <div className='flex flex-row gap-2 uppercase text-white items-center p-1 tracking-wider'>
        {Icon && <Icon className='text-xl'/>}
        <h2 className='font-semibold'>{title}</h2>
      </div>
      <div className='flex flex-row items-center text-white'>
        <h2 className='font-semibold tracking-wide text-xl md:text-4xl'>{metric}</h2>
        {tempSymbol && (
          <sup className='text-xs md:text-lg font-semibold'>
            {tempSymbol}
          </sup>
        )}
      </div>
      {subtitle && (
        <span className='text-white tracking-widee uppercase font-light'>
          {subtitle}
        </span>
      )}
    </CardContainer>
  )
}
