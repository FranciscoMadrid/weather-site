import React, { useEffect, useRef, useState } from 'react'

export interface BackgroundVideoProps{
  videoUrl?: string,
  className?: string,
  autoPlay?: boolean,
  fadeDuration?: number,
}

export default function BackgroundVideo({
  videoUrl = '/video/night/clear.mp4',
  className,
  autoPlay = true,
  fadeDuration = 2
}: BackgroundVideoProps) {

  const videoRef = useRef<HTMLVideoElement>(null)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if(!video){
      return
    }

    const handleTimeUpdate = () => {
      if(video.duration - video.currentTime <= fadeDuration){
        setFade(true)
      } else {
        setFade(false)
      }
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [fadeDuration])
  
  return (
    <div className='absolute h-full inset-0 z-0 w-full object-cover object-center top-0 left-0 '>
      <video 
        /* ref={videoRef} */
        className={`h-full w-full duration-1000 object-cover object-center transition-opacity ease-in 
          ${fade ? 'opacity-0' : 'opacity-100'}`}
        loop
        autoPlay={autoPlay}
        muted
        playsInline
      >
        <source 
          src={videoUrl}
          type='video/mp4'
        />
      </video>
    </div>
  )
}
