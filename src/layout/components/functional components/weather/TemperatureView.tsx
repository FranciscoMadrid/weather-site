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
  const windSpeed = settings.viewKm ? currentWeather.wind_kph : currentWeather.wind_mph
  const metricSymbol = settings.viewKm ? 'KMP' : 'MPH'

  const {condition} = currentWeather;
  return (
    <div className={`flex flex-col gap-2 items-center p-5 w-full h-full justify-between ${className}`}>

      {/* Temperature & Condition */}
      <div className='flex flex-col -gap-2 items-center w-full'>
        <div className='flex flex-row items-center text-white'>
          <h2 className='font-extralight text-7xl'>{temp}</h2>
          <sup className='font-bold text-2xl'>{tempSymbol}</sup>
        </div>
        <h2 className='text-4xl text-white font-light'>{condition.text}</h2>
        <img src={condition.icon} className='w-20 h-20'/>
      </div>

      {/* Temperature Details */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 items-center justify-between w-full'>
        
        {/* Feels Like */}
        <TempDetailCard
          className='gap-2 h-full'
          title='Feels like'
          metric={`${temp}`}
          tempSymbol={tempSymbol}
          icon={FaTemperatureHigh}
        />

        {/* Humidity */}
        <TempDetailCard
          className='gap-2 h-full'
          title='Humidity'
          metric={`${currentWeather.humidity}%`}
          subtitle={`UV index ${currentWeather.uv} of 10`}
          icon={WiHumidity}
        />

        <TempDetailCard
          className='gap-2 h-full'
          title={`${metricSymbol}`}
          icon={FaWind}
          metric={`${windSpeed}`}
          subtitle={`${currentWeather.wind_dir} ${currentWeather.wind_degree}°`}
        />
      </div>
    </div>
  )
}
