import React, { useState, useEffect, useRef } from 'react'
import { BsThreeDots } from "react-icons/bs";
import ToggleTemp from './ToggleTemp';
import ToggleKm from './ToggleKm';

export default function SettingsContainer() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false) // <- only render interactive parts on client
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleVisible = () => setVisible(!visible)

  useEffect(() => {
    setMounted(true)

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!mounted) return null // don't render on server

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={toggleVisible}
        className='bg-gray-900/60 w-10 cursor-pointer hover:bg-white/60 transition duration-300 ease-in-out text-white hover:text-black backdrop-blur-md p-2 rounded-full'>
        <BsThreeDots size={24}/>
      </button>
      <div className={`absolute right-0 backdrop-blur-3xl -bottom-2 z-10 flex flex-col gap-5 items-start rounded-2xl bg-gray-900/80 p-5 translate-y-full ${visible ? 'block' : 'hidden'}`}>
        <div className='flex flex-row items-center gap-2 justify-between w-full'>
          <span className='text-white font-bold'>Temp</span>
          <ToggleTemp/>
        </div>
        <div className='flex flex-row items-center gap-2 justify-between w-full'>
          <span className='text-white font-bold'>Metric</span>
          <ToggleKm/>
        </div>
      </div>
    </div>
  )
}