import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const StatusGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const options = {
    aspectRatio: 0.6,
  };

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
  
    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Started', 'On-going', 'Finished'],
          datasets: [{
            label: 'Status',
            data: [data.started, data.onGoing, data.finished],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }],
        },
        options: options,
      
      });
    }
  }, [data]);
  

  return <canvas ref={chartRef} />;
};

export default StatusGraph;
