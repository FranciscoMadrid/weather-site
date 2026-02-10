import type { WeatherAsset } from '@/lib/weather_api/type'
import React, { useEffect, useRef, useState } from 'react'

export interface BackgroundVideoProps{
  assets: WeatherAsset,
  className?: string,
  autoPlay?: boolean,
  fadeDuration?: number,
}

export default function BackgroundVideo({
  assets,
  autoPlay = true,
}: BackgroundVideoProps) {

  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeVideo, setActiveVideo] = useState<string>(assets.video)
  const [nextVideo, setNextVideo] = useState<string | null>(null)
  const [fade, setFade] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if(assets.video !== activeVideo){
      setNextVideo(assets.video);
      setFade(false)
    }
  }, [assets.video, activeVideo])

  const handleCanPlay = () => {
    if(nextVideo) {
      setFade(true)
      setTimeout(() => {
        setActiveVideo(nextVideo)
        setNextVideo(null)
        setFade(false)
      }, 300)
    }
  }
  
  return (
    <div className='absolute h-full inset-0 z-0 w-full overflow-hidden bg-black'>
      <video
        key={activeVideo}
        className="absolute h-full w-full object-cover"
        loop
        autoPlay={autoPlay}
        muted
        playsInline
      >
        <source src={activeVideo} type='video/mp4' />
      </video>
      {nextVideo && (
        <video
          key={nextVideo}
          onCanPlay={handleCanPlay}
          className={`absolute h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
          loop
          autoPlay={autoPlay}
          muted
          playsInline
        >
          <source src={nextVideo} type='video/mp4' />
        </video>
      )}
    </div>
  )
}
