import React from 'react';

const WeatherSkeleton = () => {
  return (
    <section className="w-full h-full min-h-screen relative flex flex-col pt-20 px-5 pb-10 bg-slate-950">
      <div className="z-10 grid grid-cols-1 md:grid-cols-[40%_60%] mx-auto max-w-7xl w-full h-full rounded-md overflow-hidden border border-white/5 shadow-2xl">
        
        {/* LEFT SIDE: Search & Current Temp */}
        <div className="bg-gray-800/60 p-10 flex flex-col items-center justify-between min-h-[500px] animate-pulse border-r border-white/5">
          <div className="h-10 w-full bg-gray-700/40 rounded-xl" /> {/* Searchbar */}
          
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="h-32 w-32 bg-gray-700/40 rounded-full" /> {/* Temp Icon */}
            <div className="h-12 w-24 bg-gray-700/40 rounded-lg" />   {/* Big Temp */}
            <div className="h-4 w-40 bg-gray-700/40 rounded-md" />    {/* Condition */}
          </div>

          <div className="h-10 w-full bg-gray-700/20 rounded-lg" />   {/* Bottom info */}
        </div>

        {/* RIGHT SIDE: Forecasts & Details */}
        <div className="bg-gray-900/40 p-5 flex flex-col gap-8 animate-pulse">
          
          {/* Daily Forecast Row */}
          <div className="space-y-4">
            <div className="h-4 w-32 bg-gray-700/40 rounded" />
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-36 min-w-[120px] bg-gray-800/40 rounded-2xl" />
              ))}
            </div>
          </div>

          {/* Hourly Forecast Row */}
          <div className="space-y-4">
            <div className="h-4 w-32 bg-gray-700/40 rounded" />
            <div className="flex gap-4 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-28 min-w-[90px] bg-gray-800/40 rounded-2xl" />
              ))}
            </div>
          </div>

          {/* Bottom Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
            <div className="h-44 bg-gray-800/40 rounded-3xl" /> {/* UV Index Card */}
            <div className="h-44 bg-gray-800/40 rounded-3xl" /> {/* Wind Card */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherSkeleton;