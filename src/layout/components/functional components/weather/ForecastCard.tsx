import { $settings, getSiteSettings } from '@/lib/store/site_settings'
import type { ForecastDay } from '@/lib/weather_api/type'
import { useStore } from '@nanostores/react'
import React from 'react'
import type { IconType } from 'react-icons'

export interface ForecastCardProps {
  forecastDay: ForecastDay,
  title: string,
  subtitle?:string,
  icon?: IconType,
  isHourly?: boolean
}

export default function ForecastCard({
  forecastDay, 
  title, 
  icon: Icon,
  subtitle,
  isHourly = false
}: ForecastCardProps) {
  const settings = useStore($settings);
  
  // Clean up temperature logic: math.round makes it look much cleaner in UI
  const temp = Math.round(settings.viewCelsius ? forecastDay.day.avgtemp_c : forecastDay.day.avgtemp_f);
  const tempSymbol = settings.viewCelsius ? '°C' : '°F';

  return (
    <div className='p-3 w-28 shrink-0 rounded-xl bg-white/5 hover:bg-white/20 transition-all duration-300 flex flex-col items-center gap-1 cursor-default'>
      
      {/* Date/Day Info */}
      <div className='flex flex-col items-center'>
        <span className='text-white text-sm font-medium'>
          {title}
        </span>
        {subtitle && (
          <span className='text-white/50 text-xs'>
            {subtitle}
          </span>
        )}
      </div>

      {/* Weather Icon */}
      <img 
        src={`${forecastDay.day.condition.icon}`}
        alt={forecastDay.day.condition.text}
        className='h-12 w-12 my-1'
      />

      {/* Temperature */}
      <div className='flex items-start text-white'>
        <span className='font-semibold text-xl'>{temp}</span>
        <span className='text-xs mt-1 font-light ml-0.5'>{tempSymbol}</span>
      </div>
      
    </div>
  )
}