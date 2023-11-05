'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {chartOptions} from '../lib/Chart/Options';
import {verticalLinePlugin} from '../lib/Chart/Plugins';
import {createChartDatasets} from '../lib/Chart/Utils';

Chart.register(...registerables, verticalLinePlugin);

const InvestmentChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // useMemo to avoid unnecessary calculations on every render.
  const chartDatasets = useMemo(() => createChartDatasets(data), [data]);

  useEffect(() => {
    setChartData(chartDatasets);  
  }, [chartDatasets]);

  return <div><Line data={chartData} options={chartOptions} /></div>;
};

export default InvestmentChart;
