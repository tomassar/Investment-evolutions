'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {chartOptions} from '../lib/Chart/Options';
import {verticalLinePlugin} from '../lib/Chart/Plugins';
import {createChartDatasets} from '../lib/Chart/Utils';

Chart.register(...registerables, verticalLinePlugin);

/* The InvestmentChart component renders a line chart using Chart.js to visualize investment data.
It takes a 'data' prop, which contains the investment data to be displayed. */
const InvestmentChart = ({ data}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // useMemo to avoid unnecessary calculations on every render.
  const canvas = document.createElement('canvas');
  const chartDatasets = useMemo(() => createChartDatasets(data, canvas), [data]);

  useEffect(() => {
    setChartData(chartDatasets);  
  }, [chartDatasets]);

  return <div><Line data={chartData} options={chartOptions} /></div>;
};

export default InvestmentChart;
