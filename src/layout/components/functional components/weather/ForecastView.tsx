import React from 'react'
import CardContainer from '../../partials/CardContainer'
import type { ForecastDay } from '@/lib/weather_api/type'
import type { IconType } from 'react-icons'
import ForecastCard from './ForecastCard'
import { WeekdayMap } from '@/lib/type'

export interface ForecastViewProps {
  forecastData: ForecastDay[],
  viewCelsius: boolean,
  title?: string,
  icon?: IconType
}

export default function ForecastView({
  forecastData,
  title = 'Default title',
  icon: Icon
}: ForecastViewProps) {
  return (
    <CardContainer className='w-full bg-black/60'>
      <div className='flex w-full flex-col gap-2 items-start justify-between'>
        {/* Card Title */}
        <div className='flex flex-row gap-2 items-start pb-1 border-b-2 border-white/80 w-full'>
          {Icon && (<Icon size={26} className='h-auto w-auto text-white/80'/>)}
          <h2 className='font-light text-lg text-white/80'>
            {title}
          </h2>
        </div>

        <div className='flex flex-row h-full gap-5 w-full overflow-x-scroll custom-scrollbar'>
          <div className='flex shrink-0 gap-2 w-full m-2'>
            {forecastData.map((day) => {
              const dateString = day.date;
              const date = new Date (dateString);
              console.log(date.getMonth())
              const forecastSubtitle = `${date.getUTCDate().toString()}/${date.getUTCMonth() + 1}`;
              return (
                <ForecastCard
                  forecastDay={day}
                  title={WeekdayMap[date.getUTCDay()]}
                  subtitle={forecastSubtitle}
                />
              )
            })}
          </div>
        </div>
      </div>
    </CardContainer>
  )
}
