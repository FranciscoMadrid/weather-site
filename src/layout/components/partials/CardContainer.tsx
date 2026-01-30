import React from 'react'

export interface CardContainerProps{
  className?: string,
  children: React.ReactNode,
}
export default function CardContainer({
  className,
  children,
}: CardContainerProps) {
  return (
    <div className={`bg-black/30 p-2 rounded-md backdrop-blur-lg flex flex-col items-start ${className}`}>
      {children}
    </div>
  )
}
