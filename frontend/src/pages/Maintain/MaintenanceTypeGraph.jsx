import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const MaintenanceTypeGraph = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Reference to the chart instance

  const options = {
    aspectRatio: 0.6,
  };
  
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy existing chart if it exists
    }

    if (chartRef.current && data) {
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Urgent', 'Non-urgent'],
          datasets: [{
            label: 'Maintenance Type',
            data: [data.urgent, data.nonUrgent],
            backgroundColor: ['#9966FF', '#FF8C00'],
          }],
        },
        options: options,
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default MaintenanceTypeGraph;
