"use client"

import InvestmentChart from './InvestmentChart'; // Adjust the path according to your project structure
import React, { useEffect, useState } from 'react';

function Dashboard() {
    const [period, setPeriod] = useState("year")

    
      
  return (
    <div className="p-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Investment Evolution Chart</h1>
        <div className="flex items-center justify-center space-x-8 my-3">
            <button onClick={() => setPeriod("year")} className="rounded-md bg-fuchsia-700 w-[150px] h-[35px] text-white opacity-70 hover:opacity-60 transition-all duration-600">Year to date</button>
            <button onClick={() => setPeriod("month")}className="rounded-md bg-fuchsia-700 w-[150px] h-[35px] text-white opacity-70 hover:opacity-60 transition-all duration-600">Month to date</button>
        </div>
        <div className='lg:w-2/3 md:w-full sm:w-full'>
            <InvestmentChart period={period} />
        </div>
        <div className="flex justify-center items-center space-x-40 mt-[10px]">
            <div className="w-1/3 h-1/3">
                <h3>Today'</h3>
            </div>
            <div className="w-1/3 h-1/3">
                <h3>Portfolio Performance</h3>
            </div>
        </div>
    </div>
  )
}

export default Dashboard