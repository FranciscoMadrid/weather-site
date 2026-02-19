import { $settings, toggleKm } from '@/lib/store/site_settings';
import { useStore } from '@nanostores/react';
import React from 'react'

export default function ToggleKm() {
  const settings = useStore($settings)
  const handleToggle = () => {
    toggleKm();
  }

  const metricSymbol = settings.viewKm ? 'KMH' : 'MPH°'
  return (
    <button
      type='button'
      onClick={handleToggle} 
      className='bg-gray-900/60 w-14 cursor-pointer hover:bg-white/60 transition duration-300 ease-in-out text-white hover:text-black backdrop-blur-md p-2 rounded-full'>
      <h2 className='font-bold'>{metricSymbol}</h2>
    </button>
  )
}
