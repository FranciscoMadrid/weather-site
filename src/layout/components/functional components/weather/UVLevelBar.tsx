import React from 'react'

export interface UVLevelBarProps{
  uv: number,
}

export default function UVLevelBar({uv}:UVLevelBarProps) {
  const uvLabel = (uv: number) => {
    if (uv < 3) return 'Low';
    if (uv < 6) return 'Moderate';
    if (uv < 8) return 'High';
    if (uv < 11) return 'Very High';
    return 'Extreme';
  };
  const maxUv = 11;
  const percent = Math.min((uv / maxUv) * 100, 100);

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col justify-center'>
        <span className='text-white text-2xl'>{uv}</span>
        <p className='text-white text-base font-light tracking-tighter'>{uvLabel(uv)}</p>
      </div>
      <div className="h-1.5 w-full rounded-full bg-linear-to-r relative
      from-green-500
      via-red-500
      to-purple-700">
        <div className={`h-4 w-4 outline-2 ring-2 left-[${percent}] bg-white rounded-full absolute -top-1/2 -translatey-1/2`}/>
      </div>
    </div>
  )
}
