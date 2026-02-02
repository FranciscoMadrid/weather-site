import React, { useEffect, useState } from 'react'
import type { ForecastResponse } from '@/lib/weather_api/type';
import TemperatureView from './TemperatureView';
import BackgroundVideo from '../BackgroundVideo';
import ScrollableContainer from '../../partials/ScrollableContainer';
import { WeekdayMap } from '@/lib/type'
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import { $settings } from '@/lib/store/site_settings';
import { useStore } from '@nanostores/react';
import ForecastCard from './ForecastCard';
import CardContainer from '../../partials/CardContainer';
import { FaSun } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import UVLevelBar from './UVLevelBar';

export default function WeatherContainer({
  
}) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ForecastResponse>();
  const [isDay, setIsDay] = useState(false)
  const backgroundVideoUrl = `video/${isDay ? 'day' : 'night'}/clear.mp4`
  const settings = useStore($settings)
  
  const currentTemp = settings.viewCelsius
    ? data?.current.temp_c
    : data?.current.temp_f;

  const currentWind = settings.viewKm
    ? data?.current.wind_kph
    : data?.current.wind_mph

  const currentGust = settings.viewKm
    ? data?.current.gust_kph
    : data?.current.gust_mph

  const metricSymbol = settings.viewKm
    ? 'KPH'
    : 'MPH'
  
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
      console.log(json)
      setIsDay(!!json.current.is_day)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section 
      className='w-full h-full min-h-screen relative flex flex-col pt-20 px-5'>
      <div className='z-10 grid grid-cols-1 md:grid-cols-[40%_60%] mx-auto max-w-7xl w-full h-full rounded-md overflow-hidden'>
        {/* Left Side of Cont */}
        <div 
          className='border-20 border-black/40 w-full h-full'>
          <div className='flex p-5 flex-col gap-2 items-center h-full bg-linear-to-t from-transparent to-black/50 justbe'>
            {/* Searchbar */}
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
        {data && (
          <div className='flex flex-col gap-5 p-5 bg-black/40 w-full'>
            {/* Daily Forecast */}
            <ScrollableContainer
              icon={FaClock}
              title='Daily'>
                {data.forecast.forecastday.map((day) => {
                  const dateString = day.date;
                  const date = new Date (dateString);
                  const forecastSubtitle = `${date.getUTCDate().toString()}/${date.getUTCMonth() + 1}`;
                  const temp = settings.viewCelsius ? day.day.avgtemp_c : day.day.avgtemp_f
                  return (
                    <ForecastCard
                      temp={temp}
                      title={WeekdayMap[date.getUTCDay()]}
                      subtitle={forecastSubtitle}
                      icon={day.day.condition.icon}
                    />
                  )
                })}
            </ScrollableContainer>
            
            {/* Hourly Forecast */}
            <ScrollableContainer
              icon={FaClock}
              title='Hourly - 24 Hours'>
                {data.forecast.forecastday.slice(0,1).map((item) =>
                  item.hour.map((hour) => {
                    const temp = settings.viewCelsius ? hour.temp_c : hour.temp_f;
                    const datetime = new Date (hour.time)
                    const time = datetime.toLocaleTimeString('en-GB', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: false
                    })
                    return (
                      <ForecastCard
                        key={time}
                        title={time}
                        temp={temp}
                        icon={hour.condition.icon}
                      />
                    )
                  })
                )}
            </ScrollableContainer>

            <div className='grid grid-cols-1 md:grid-cols-2 h-full w-full gap-5'>
              {/* UV INDEX */}
              <CardContainer className='bg-black/60 flex flex-col h-fit justify-between gap-5 p-5'>
                <div className='w-full gap-2 grid grid-cols-[auto_1fr] rounded-2xl text-xl tracking-wider'>
                  <FaSun className='text-white h-full'/>
                  <span className='text-gray-400'>
                    UV INDEX
                  </span>
                </div>
                <UVLevelBar
                  uv={data.current.uv}
                />
              </CardContainer>
              <CardContainer className='bg-black/60 flex h-fit flex-col justify-between gap-5 p-5'>
                <div className='grid grid-cols-2 items-center'>
                  <div className='w-full gap-2 grid grid-cols-[auto_1fr] rounded-2xl text-xl tracking-wider'>
                    <FaWind className='text-white h-full'/>
                    <span className='text-gray-400'>
                      Wind
                    </span>
                  </div>
                  <span className='text-gray-400 text-center text-xl'>
                    {data.current.wind_dir}
                  </span>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <div className='flex flex-col gap-2'>
                    {/* Wind Speed */}
                    <div className='text-white flex flex-row items-center gap-4'>
                      <span className='font-medium text-2xl'>{currentWind}</span>
                      <div className='grid grid-rows-2 gap-2 font-medium tracking-tight'>
                        <span className='text-gray-400'>{metricSymbol}</span>
                        <span className='text-gray-200'>Wind</span>
                      </div>
                    </div>
                    <div className='w-full rounded-full h-0.5 bg-gray-600'/>
                    {/* Gust Speed */}
                    <div className='text-white flex flex-row items-center gap-4'>
                      <span className='font-medium text-2xl'>{currentGust}</span>
                      <div className='grid grid-rows-2 gap-2 font-medium tracking-tight'>
                        <span className='text-gray-400'>{metricSymbol}</span>
                        <span className='text-gray-200'>Gust</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col items-center'>
                    <div className='relative'>
                      <img
                        className={`w-fit h-full scale-75 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
                        style={{
                          rotate: `${data.current.wind_degree}deg`
                        }}
                        alt='comppas_needle.png' 
                        src='/images/needle_compass.png'/>
                      <img 
                        alt='compass.png' 
                        src='/images/compass_body.png' 
                        className='w-fit'/>
                    </div>
                  </div>
                </div>
              </CardContainer>
            </div>
          </div>
        )}
      </div>
      <BackgroundVideo
        videoUrl={backgroundVideoUrl}
      />
    </section>
  )
}
