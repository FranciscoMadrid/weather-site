import { $settings, getSiteSettings } from '@/lib/store/site_settings'
import type { ForecastDay } from '@/lib/weather_api/type'
import { useStore } from '@nanostores/react'
import React from 'react'
import type { IconType } from 'react-icons'

export interface ForecastCardProps {
  temp: number,
  title: string,
  subtitle?:string,
  icon: string,
  rightNow?: boolean
}

export default function ForecastCard({
  temp, 
  title, 
  icon,
  rightNow = false,
  subtitle,
}: ForecastCardProps) {
  const settings = useStore($settings);
  const tempSymbol = settings.viewCelsius ? '°C' : '°F';

  return (
    <div className={`p-2 w-20 md:w-28 shrink-0 rounded-xl bg-white/10 transition-all duration-300 flex flex-col items-center gap-1 
      ${rightNow ? 'bg-white/40' : 'hover:bg-white/20'}`}>
      {/* Date/Day Info */}
      <div className='flex flex-col items-center'>
        <span className='text-white text-sm md:text-xl font-medium'>
          {title}
        </span>
        {subtitle && (
          <span className='text-gray-400 text-xs'>
            {subtitle}
          </span>
        )}
      </div>

      {/* Weather Icon */}
      <img 
        src={icon}
        alt={icon?.toString()}
        className='h-8 w-8 md:h-12 md:w-12 my-1'
      />

      {/* Temperature */}
      <div className='flex items-start text-white'>
        <span className='font-semibold text-sm md:text-xl'>{temp}</span>
        <sub className='mt-1 font-light ml-0.5'>{tempSymbol}</sub>
      </div>
      
    </div>
  )
}