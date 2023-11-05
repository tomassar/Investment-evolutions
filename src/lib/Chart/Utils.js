// Creates a gradient for the chart's dataset
const createGradient = (ctx, color) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'rgba(75, 192, 192, 0)');
    return gradient;
};
  
// Factored out gradient creation.
const createGradients = (canvas) => {
    const ctx = canvas.getContext('2d');
    return [createGradient(ctx, 'rgba(150, 122, 192, 0.2)'), createGradient(ctx, 'rgba(150, 122, 192, 0.3)')];
};

// Formats the date label for the chart's x-axis
const formatDateLabel = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("es-ES", { month: '2-digit', day: '2-digit' });
};

// Creates datasets for the chart
const createDataset = (label, data, gradient) => ({
    label,
    data,
    borderColor: 'rgb(150, 122, 192)',
    fill: true,
    backgroundColor: gradient,
    tension: 0.1,
    pointRadius: 0,
    borderWidth: 1.3,
});
  
// Formats the tick values for the chart's y-axis
export const formatTickValue = (value, index, ticks) => {
    if (window.innerWidth < 600) {
        const stringValue = String(value);
        // Keep first, middle, and last elements of ticks.
        if (index !== 0 && index !== Math.floor(ticks.length / 2) && index !== ticks.length - 1) {
            return null;
        }
        return stringValue.length < 7 ? `$${stringValue.substring(0, 3)}K` : `$${stringValue.substring(0, 1)}.${stringValue.substring(1, 3)}M`;
    }
    return `$${value.toLocaleString("es-CL")}`;
};
  
export const createChartDatasets = (dataArray, canvas) => {
    const chartLabels = dataArray.map(item => formatDateLabel(item.date));
    const chartDataValues = dataArray.map(item => Math.floor(item.portfolioValue));
    const contributions = dataArray.map(item => item.contributions);

    // Create gradients for chart datasets.
    const [firstGradient, secondGradient] = createGradients(canvas);

    return {
        labels: chartLabels,
        datasets: [
            createDataset('Investment Over Time', chartDataValues, firstGradient),
            createDataset('Deposited Over Time', contributions, secondGradient)
        ],
    };
};
