import type { CurrentWeather } from '@/lib/weather_api/type'
import React from 'react'
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import TempDetailCard from './TempDetailCard';
import { FaWind } from "react-icons/fa";
import { $settings, getSiteSettings } from '@/lib/store/site_settings';
import { useStore } from '@nanostores/react';


export interface TemperatureViewProps {
  currentWeather: CurrentWeather,
  temp?: number,
  className?:string
}

export default function TemperatureView({
  currentWeather,
  temp = 0,
  className
}: TemperatureViewProps) {
  const settings = useStore($settings)
  const tempSymbol = settings.viewCelsius ? 'C°' : 'F°'
  const {condition} = currentWeather;
  return (
    <div className={`flex flex-col gap-20 md:gap-40 items-center w-full h-full justify-evenly ${className}`}>

      {/* Temperature & Condition */}
      <div className='flex flex-col gap-5 py-5 items-center w-full'>
        <div className='flex flex-row items-center text-white'>
          <h2 className='font-extralight text-7xl'>{temp}</h2>
          <sup className='font-bold text-2xl'>{tempSymbol}</sup>
        </div>
        <h2 className='text-4xl text-white font-light'>{condition.text}</h2>
        <img
          alt={condition.text}
          src={condition.icon} 
          className='w-20 h-20'/>
      </div>

      {/* Temperature Details */}
      <div className='grid grid-cols-2 gap-5 items-end justify-between w-full h-full'>
        
        {/* Feels Like */}
        <TempDetailCard
          className='gap-2 min-h-30 flex flex-col'
          title='Feels like'
          metric={`${temp}`}
          tempSymbol={tempSymbol}
          icon={FaTemperatureHigh}
        />

        {/* Humidity */}
        <TempDetailCard
          className='gap-2 min-h-30 flex flex-col'
          title='Humidity'
          metric={`${currentWeather.humidity}%`}
          icon={WiHumidity}
        />
      </div>
    </div>
  )
}
