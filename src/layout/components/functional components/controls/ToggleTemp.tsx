import React from 'react'
import { $settings, toggleCelsius } from '@/lib/store/site_settings'

export default function ToggleTemp() {
  const handleToggle = () => {
    toggleCelsius();
  }
  return (
    <div onClick={handleToggle} className='p-5 bg-white'>ToggleTemp</div>
  )
}