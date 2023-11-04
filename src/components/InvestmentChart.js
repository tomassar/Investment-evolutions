'use client';

import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { db } from '../lib/firebase';
import {doc, onSnapshot } from 'firebase/firestore';

Chart.register(...registerables);

const InvestmentChart = ({period}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Investment Over Time',
      data: [],
      borderColor: 'rgb(150, 122, 192)',
      fill: true,
      backgroundColor: 'rgb(150, 122, 192)',
      tension: 0.1,
      pointRadius: 0,
      pointStyle: false,
      borderWidth: 1.3,
    }],
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'investmentEvolutions', 'user1'), (doc) => {
      console.log(doc)
      const data = doc.data();
      let dataArray = data.array;

      if (period == "year") {
        const startOfThisYear = new Date(2019, 0, 1); // January 1 of 2019
        dataArray = dataArray.filter(item => new Date(item.date.seconds * 1000) >= startOfThisYear);
      } else if (period == "month") {
        const startOfThisMonth = new Date(2019, 11, 1); // December 1 of 2019
        dataArray = dataArray.filter(item => new Date(item.date.seconds * 1000) >= startOfThisMonth);
      }

      console.log(dataArray);

      // Process the data into chart-compatible format
      const chartLabels = dataArray.map(item => {
        const date = new Date(item.date.seconds * 1000);
        return date.toLocaleDateString("en-EN");
      });

      const chartDataValues = dataArray.map(item => Math.floor(item.portfolioValue));
      const contributions = dataArray.map(item => item.contributions);

      // Set the gradient here using a canvas element
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const firstGradient = ctx.createLinearGradient(0, 0, 0, 400);
      firstGradient.addColorStop(0, 'rgba(150, 122, 192, 0.2)');
      firstGradient.addColorStop(1, 'rgba(75, 192, 192, 0)'); 

      const secondGradient = ctx.createLinearGradient(0, 0, 0, 400); 
      secondGradient.addColorStop(0, 'rgba(150, 122, 192, 0.3)');
      secondGradient.addColorStop(1, 'rgba(75, 192, 192, 0)'); 

      setChartData({
        labels: chartLabels,
        datasets: [{
          label: 'Investment Over Time',
          data: chartDataValues,
          borderColor: 'rgb(150, 122, 192)',
          fill: true,
          backgroundColor: firstGradient,
          tension: 0.1,
          pointRadius: 0,
          pointStyle: false,
          borderWidth: 1.3,
        },
        {
          label: 'Deposited Over Time',
          data: contributions,
          fill: true,
          borderColor: 'rgba(0, 0, 0, 0.5)',
          backgroundColor: secondGradient,
          tension: 0.1,
          pointRadius: 0,
          pointStyle: false,
          borderWidth: 1.3,
        }],
      });
    });

    return () => unsubscribe();
  }, [period]);

  const options = {
    mouseLine: {
      color: "#32d296",
      zIndex: 3001
      },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 7,
        }
      },
      y: {
          ticks: {
              callback: function(value, index, ticks) {
                  return '$' + value.toLocaleString("es-CL");
              }
          }
      }
    },
    locale: 'es',
    responsive: true,
    maintainAspectRatio: true,
    elements:{
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxHeight: 6,
          boxWidth: 6,         
        }   
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return `${context.dataset.label}: $${value.toLocaleString("es-CL")}`;
          }
        }
      }
    }
  };

  return (
    <div>
      <Line data={chartData} options={options} key={period}/>
    </div>
  );
};

export default InvestmentChart;
