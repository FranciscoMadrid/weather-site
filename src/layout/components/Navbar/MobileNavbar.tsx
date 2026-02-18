import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi"
import navMenuConfig from '@/config/nav_menu.json'
import NavLink from '../NavLink'

export interface MobileNavbarProps {
  logo_image: ImageMetadata,
  logo_title?: string,
  height?: number,
  width?: number,
}

export default function MobileNavbar({
  logo_image, 
  logo_title,
  height = 80,
  width = 80,
}: MobileNavbarProps) {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => setToggle(!toggle)
  const handleClose = () => setToggle(false)

  return (
    <nav className='bg-transparent flex md:hidden flex-row justify-between items-center w-full p-2 px-5 z-10'>
      
      {/* Logo */}
      <a className="flex flex-row items-center" href="/">
        <img
          width={width}
          height={height}
          loading={'eager'}
          src={logo_image.src}
          alt={logo_title}
        />
      </a>

      {/* Hamburger */}
      

      {/* Overlay */}
      <div
        onClick={handleClose}
        className={`fixed inset-0 bg-black/30 transition-opacity duration-200 ease-in-out
          ${toggle ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Sliding Menu */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-1/2 bg-primary h-full fixed top-0 right-0 transform transition-transform duration-200 ease-in-out origin-right flex flex-col gap-5 items-center
            ${toggle ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Logo */}
          <a className="flex flex-col justify-between items-center bg-primary-darken w-full py-5" href="/">
            <img
              width={width}
              height={height}
              loading={'eager'}
              src={logo_image.src}
              alt={logo_title}
            />
          </a>
        </div>
      </div>
    </nav>
  )
}
