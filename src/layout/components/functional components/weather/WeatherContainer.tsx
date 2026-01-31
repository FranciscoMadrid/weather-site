import React, { useEffect, useState } from 'react'
import type { ForecastResponse } from '@/lib/weather_api/type';
import TemperatureView from './TemperatureView';
import BackgroundVideo from '../BackgroundVideo';
import ForecastView from './ForecastView';

import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { $settings, getSiteSettings } from '@/lib/store/site_settings';
import ToggleTemp from '../controls/ToggleTemp';
import { useStore } from '@nanostores/react';

export default function WeatherContainer({
  
}) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ForecastResponse>();
  const [isDay, setIsDay] = useState(true)
  const backgroundVideoUrl = `video/${isDay ? 'day' : 'night'}/clear.mp4`

  const settings = useStore($settings)
  
  const currentTemp = settings.viewCelsius
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
      setIsDay(!!json.current.is_day)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section 
      className='w-full h-full min-h-screen relative flex flex-col pt-20'>
      <div className='z-10 grid grid-cols-2 p-5 mx-auto max-w-7xl justify-between w-full h-full rounded-md'>
        {/* Left Side of Cont */}
        <div 
          className=' border-20 border-black/40 w-full h-full'>
          <div className='flex p-5 flex-col gap-2 items-center h-full bg-linear-to-t from-transparent to-black/50'>
            <div className='w-full p-3 gap-2 grid grid-cols-[auto_1fr] rounded-2xl bg-gray-800/60 backdrop-blur-md relative'>
              <FaLocationDot className='text-white h-full'/>
              <span className='text-white'>
                {data?.location.name}, {data?.location.country}
              </span>
            </div>
            {data && (
              <TemperatureView 
                currentWeather={data.current}
                temp={currentTemp}/>
            )}
          </div>
        </div>

        {/* Right Side of Cont */}
        <div className='flex flex-col gap-5 p-5 bg-black/40 w-full'>
          {data && (
            <ForecastView
              viewCelsius
              icon={FaClock}
              title='Daily'
              forecastData={data.forecast.forecastday}
            />
          )}
        </div>
      </div>
      <BackgroundVideo
        videoUrl={backgroundVideoUrl}
      />
    </section>
  )
}
