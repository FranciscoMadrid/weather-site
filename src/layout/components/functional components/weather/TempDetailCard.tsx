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
  subtitle = '',
  metric,
  tempSymbol,
  icon: Icon
}:TempDetailCard) {
  return (
    <CardContainer className={`${className} w-full`}>
      <div className='flex flex-row gap-2 uppercase text-white items-center p-1 tracking-wider '>
        {Icon && <Icon size={30}/>}
        <h2 className='font-semibold text-sm'>{title}</h2>
      </div>

      <div className='flex flex-row items-center text-white self-center'>
        <h2 className='font-medium text-2xl tracking-wide'>{metric}</h2>
        {tempSymbol && (
          <sup className='font-medium'>
            {tempSymbol}
          </sup>
        )}
      </div>

      <span className='text-white  tracking-widee uppercase font-light'>
        {subtitle}
      </span>
    </CardContainer>
  )
}
