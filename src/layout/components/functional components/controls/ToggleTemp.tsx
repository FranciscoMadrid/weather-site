import React from 'react'
import { $settings, toggleCelsius } from '@/lib/store/site_settings'
import { useStore } from '@nanostores/react';

export default function ToggleTemp() {
  const settings = useStore($settings)

  const tempSymbol = settings.viewCelsius ? 'C°' : 'F°'
  const handleToggle = () => {
    toggleCelsius();
  }
  return (
    <button
      type='button'
      onClick={handleToggle} 
      className='bg-gray-900/60 w-10 cursor-pointer hover:bg-white/60 transition duration-300 ease-in-out text-white hover:text-black backdrop-blur-md p-2 rounded-full'>
      <h2 className='font-bold'>{tempSymbol}</h2>
    </button>
  )
}