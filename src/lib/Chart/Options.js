import { formatTickValue } from './Utils';

// Base options for the chart
export const chartOptions = {
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 5
        }
      },
      y: {
        ticks: {
          maxTicksLimit: 5,
          // Improved formatting function for readability.
          callback: function(value, index, ticks) {
            // Handle formatting based on window size and value.
            const formattedValue = formatTickValue(value, index, ticks);
            return formattedValue;
          }
        }
      }
    },
    locale: 'es',
    responsive: true,
    maintainAspectRatio: true,
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