import React, { useEffect, useState } from 'react'
import type { ForecastResponse } from '@/lib/weather_api/type';
import CardContainer from '../../partials/CardContainer';
import TemperatureView from './TemperatureView';
import { FaLocationDot } from "react-icons/fa6";
import { getConditionCategory } from '@/lib/weather_api';
import BackgroundVideo from '../BackgroundVideo';

export interface WeatherCardProps {
  
}

export default function WeatherContainer({
  
}: WeatherCardProps) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ForecastResponse>();
  const [viewCelsius, setViewCelsius] = useState(true)
  const [viewKm, setViewKm] = useState(true)
  
  const currentTemp = viewCelsius
    ? data?.current.temp_c
    : data?.current.temp_f;
  
  useEffect(() => {
    fetchForecast()
  }, [])

  const fetchForecast = async () => {
    try {
      setLoading(true)

      const res = await fetch('/api/fetch_forecast_weather')
      if (!res.ok) throw new Error('Failed to fetch forecast')
      const json: ForecastResponse = await res.json()
      setData(json)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section 
      className='w-full h-full min-h-screen relative flex flex-col pt-20'>
      <div className='flex z-10 flex-col md:flex-row p-5 mx-auto max-w-7xl justify-between w-full h-full rounded-md'>
        {/* Left Side of Cont */}
        <div 
          className=' border-20 border-black/20 w-full h-full'>
          <div className='flex p-5 flex-col gap-2 items-center h-full bg-linear-to-t from-transparent to-black/50'>
            <div className='w-full p-3 gap-2 grid grid-cols-[auto_1fr] rounded-2xl bg-gray-800 relative'>
              <FaLocationDot className='text-white h-full'/>
              <span className='text-white'>
                {data?.location.name}, {data?.location.country}
              </span>
            </div>
            {data && (
              <TemperatureView 
                currentWeather={data.current}
                viewCelsius={viewCelsius}
                viewKm={viewKm}
                temp={currentTemp}/>
            )}
          </div>
        </div>

        {/* Right Side of Cont */}
        <div className='flex flex-col gap-5 bg-black/20 items-center w-full'>
        </div>
      </div>
      <BackgroundVideo/>
    </section>
  )
}
