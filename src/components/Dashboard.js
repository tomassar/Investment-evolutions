"use client"

import InvestmentChart from './InvestmentChart';
import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import {doc, onSnapshot } from 'firebase/firestore';
import { ArrowDownIcon } from '@/assets/ArrowDownIcon';
import { ArrowUpIcon } from '@/assets/ArrowUpIcon';
function Dashboard() {
    const [data, setData] = useState([])
    const [period, setPeriod] = useState("year")

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'investmentEvolutions', 'user1'), (doc) => {
            const data = doc.data();
            let dataArray = data.array;
            console.log(dataArray)
    
          if (period == "year") {
            const startOfThisYear = new Date(2019, 0, 1); // January 1 of 2019
            dataArray = dataArray.filter(item => new Date(item.date.seconds * 1000) >= startOfThisYear);
          } else if (period == "month") {
            const startOfThisMonth = new Date(2019, 11, 1); // December 1 of 2019
            dataArray = dataArray.filter(item => new Date(item.date.seconds * 1000) >= startOfThisMonth);
          }
    
          setData(dataArray)
        });
    
        return () => unsubscribe();
      }, [period]);

  return (
    <div className="p-4 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Investment Evolution Chart</h1>
        <div className="flex items-center justify-center space-x-8 my-3">
            <div className="flex flex-col items-center justify-center">
                <div className={`w-[130px] h-[4px] rounded transition-all ease-in duration-800 ${period == "year" ? 'bg-[#daafa1]': 'bg-fuchsia-700'}`}></div>
                <button onClick={() => setPeriod("year")} className="rounded-md w-[150px] h-[35px] hover:opacity-60 transition-all duration-800">Year to date</button>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className={`w-[130px] h-[4px] rounded transition-all ease-in duration-800 ${period == "month" ? 'bg-[#daafa1]': 'bg-fuchsia-700'}`}></div>
                <button onClick={() => setPeriod("month")}className="rounded-md w-[150px] h-[35px] hover:opacity-60 transition-all duration-800">Month to date</button>
            </div>
        </div>
        <div className='lg:w-2/3 md:w-full sm:w-full'>
            <InvestmentChart data={data} />
            <div className="flex lg:justify-center lg:items-center lg:space-x-40 mt-[10px] sm:justify-evenly md:justify-evenly">
                <div className="flex">
                    {data[data.length-1] && data[data.length-1].dailyReturn > 0 ? <ArrowUpIcon/> : <ArrowDownIcon/>}
                    <div>
                        <h3 className="font-semibold">Today's growth</h3>
                        <h3>{data[data.length-1] ? (data[data.length-1].dailyReturn*100).toFixed(2)+"%" : ''}</h3>
                    </div>
                </div>
                <div className="flex">
                    {data[data.length-1] && data[data.length-1].portfolioIndex > 100 ? <ArrowUpIcon/> : <ArrowDownIcon/>}
                    <div>
                        <h3 className="inline font-semibold">Portfolio Performance</h3>
                        <h3>{data[data.length-1] ? (data[data.length-1].portfolioIndex).toFixed(2)+"%" : ''}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard