// Plugin for drawing a vertical line on hover
export const verticalLinePlugin = {
    id: 'verticalLineOnHover',
    afterDraw: (chart, args, options) => {
      const activeElements = chart.tooltip.getActiveElements();
      if (activeElements.length) {
        const { ctx, scales } = chart;
        const { x, y } = activeElements[0].element;
        const bottomY = scales.y.bottom;
  
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = options.lineWidth || 1;
        ctx.strokeStyle = options.lineColor || '#daafa1';
        ctx.stroke();
        ctx.restore();
      }
    }
  };