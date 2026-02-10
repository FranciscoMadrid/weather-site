import React, { useEffect, useState } from 'react'
import type { ForecastResponse, WeatherAsset } from '@/lib/weather_api/type';
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
import WeatherConditions from '@/config/weather_api_conditions.json';
import { getWeatherAssets } from '@/lib/util';
import Searchbar from '@/layout/components/functional components/controls/Searchbar';

export interface WeatherContainerProps {
  city?: string,
  country?:string
}
export default function WeatherContainer({
  city, 
  country
}:WeatherContainerProps) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ForecastResponse>();
  const settings = useStore($settings)
  const currentDay = new Date();
  const [backgroundVideoUrl, setBackgroundVideoUrl] = useState<WeatherAsset>()
  const defaultData = city && country ? `${country}, ${city}` : 'San Pedro Sula, Honduras'

  const currentTempSymbol = settings.viewCelsius
    ? data?.current.temp_c
    : data?.current.temp_f;

  const currentWindMetric = settings.viewKm
    ? data?.current.wind_kph
    : data?.current.wind_mph

  const currentGustMetric = settings.viewKm
    ? data?.current.gust_kph
    : data?.current.gust_mph

  const metricSymbol = settings.viewKm
    ? 'KPH'
    : 'MPH'
  
  useEffect(() => {
    fetchForecast(defaultData)
  }, [])

  /* For the background video */
  useEffect(() => {
    if(data){
      const newAssets = getWeatherAssets(data.current.condition.code, !!data.current.is_day)
      setBackgroundVideoUrl(newAssets)
    }
  }, [data])

  const fetchForecast = async (searchTerm: string) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/fetch_forecast_weather?q=${searchTerm}`)
      if (!res.ok) throw new Error('Failed to fetch forecast')
        const json: ForecastResponse = await res.json()
      setData(json)
      setBackgroundVideoUrl(getWeatherAssets(json.current.condition.code, !!json.current.is_day))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section 
      className='w-full h-full min-h-screen relative flex flex-col pt-20 px-5 pb-10'>
      <div className='z-10 grid grid-cols-1 md:grid-cols-[40%_60%] mx-auto max-w-7xl w-full h-full rounded-md overflow-hidden'>
        {/* Left Side of Cont */}
        <div 
          className='border-20 border-gray-800/40 w-full h-full'>
            {data && (
              <div className='flex p-5 flex-col gap-2 items-center h-full bg-linear-to-t from-transparent to-gray-600/40 justify-between'>
              {/* Searchbar */}
              <Searchbar
                setData={setData}
                currentSearTerm={`${data.location.country}, ${data.location.name}`}/>
              <TemperatureView 
                currentWeather={data.current}
                temp={currentTempSymbol}/>
              </div>
            )}
        </div>

        {/* Right Side of Cont */}
        {data && (
          <div className='flex flex-col gap-5 p-5 bg-gray-800/40 w-full'>
            {/* Daily Forecast */}
            <ScrollableContainer
              className='bg-gray-800/30'
              icon={FaClock}
              title='Daily - Average'>
                {data.forecast.forecastday.map((day) => {
                  const dateString = day.date;
                  const date = new Date (dateString);
                  const forecastSubtitle = `${date.getUTCDate().toString()}/${date.getUTCMonth() + 1}`;
                  const temp = settings.viewCelsius ? day.day.avgtemp_c : day.day.avgtemp_f

                  return (
                    <ForecastCard
                      key={day.date}
                      temp={temp}
                      title={WeekdayMap[date.getUTCDay()]}
                      rightNow={currentDay.getUTCDate() === date.getUTCDate() && currentDay.getUTCMonth() === date.getUTCMonth()}
                      subtitle={forecastSubtitle}
                      icon={day.day.condition.icon}
                    />
                  )
                })}
            </ScrollableContainer>
            
            {/* Hourly Forecast */}
            <ScrollableContainer
              className='bg-gray-800/30'
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
              <CardContainer className='bg-gray-800/40 flex flex-col h-fit justify-between gap-5 p-5'>
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

              {/* Wind Details */}
              <CardContainer className='bg-gray-800/30 flex h-fit flex-col justify-between gap-5 p-5'>
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
                      <span className='font-medium text-2xl'>{currentWindMetric}</span>
                      <div className='grid grid-rows-2 gap-2 font-medium tracking-tight'>
                        <span className='text-gray-400'>{metricSymbol}</span>
                        <span className='text-gray-200'>Wind</span>
                      </div>
                    </div>
                    <div className='w-full rounded-full h-0.5 bg-gray-600'/>
                    {/* Gust Speed */}
                    <div className='text-white flex flex-row items-center gap-4'>
                      <span className='font-medium text-2xl'>{currentGustMetric}</span>
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
      {backgroundVideoUrl && (
        <BackgroundVideo
          assets={backgroundVideoUrl}
        />
      )}
    </section>
  )
}
