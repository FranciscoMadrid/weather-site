import type { CityStructure } from '@/lib/type';
import type { ForecastResponse } from '@/lib/weather_api/type';
import React, { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { FaLocationDot } from "react-icons/fa6";

export interface SearchBarProps{
  currentSearTerm: string,
  setData: Dispatch<SetStateAction<ForecastResponse | undefined>>;
}
export default function Searchbar({currentSearTerm, setData}: SearchBarProps) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(currentSearTerm);
  const [suggestions, setSuggestions] = useState<CityStructure[]>([])

  useEffect(() => {
    /* Checks if empty or whitespace */
    if(!searchQuery || !searchQuery.trim()){
      return;
    }
    /* Lenght of search term */
    if(searchQuery.length <= 3){
      return;
    }
    /* Pass the search terms to the astro content api to filter the cities json file. */
    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const url = (`/api/search_city?search=${encodeURIComponent(searchQuery)}`)
        const response = await fetch(url)
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false)
      }
    }, 300)
    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const fetchForecast = async (searchTerm: string) => {
    try {
      setLoading(true)
      const res = await fetch(`/api/fetch_forecast_weather?q=${searchTerm}`)
      if (!res.ok) throw new Error('Failed to fetch forecast')
        const json: ForecastResponse = await res.json()
      setData(json)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = async(city: string, country: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('city', encodeURIComponent(city))
    url.searchParams.set('country', encodeURIComponent(country))
    window.history.pushState({}, '', url);

    setSearchQuery(`${country}, ${city}`)
    setSuggestions([]);
    fetchForecast(`${country}, ${city}`)
  }
  return (
    <div className='w-full h-18 md:h-12 group text-white rounded-xl relative bg-gray-900/60 backdrop-blur-md z-10'>
      <FaLocationDot
        className='text-white h-8 w-8 md:h-5 md:w-5 absolute inset-0 top-1/2 -translate-y-1/2 left-4' 
        />
      <input 
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='w-full h-full rounded-xl pl-12 transition duration-100 ease-in focus:z-3 focus:ring-1 focus:ring-white outline-none'/>
      {suggestions.length > 0 && (
        <div className='absolute hidden group-focus-within:block top-full rounded-md mt-1 left-0 w-full bg-gray-900 p-2 backdrop-blur-md'>
          <ul className='flex flex-col gap-2 items-center justify-start'>
            {suggestions.map((city) => (
              <ul
                className='w-full h-full'
                key={city.id}>
                <button type='button'
                className=' w-full h-full p-2 text-start cursor-pointer hover:bg-gray-700'
                onClick={(e) => handleSelect(city.city_ascii, city.country)}
                >
                  {`${city.country}, ${city.city_ascii}`}
                </button>
              </ul>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
