import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { useAuthContext } from '../../../hooks/useAuthContext';

const Dashboard = () => {
  const { user } = useAuthContext();
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/inventory/', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.data || !response.data.data) {
          throw new Error('Failed to fetch inventory data');
        }
        setInventoryData(response.data.data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    if (user && user.token) {
      fetchInventoryData();
    }
  }, [user]);

  const prepareChartData = () => {
    const categories = ['Electrical', 'Lighting', 'Sound', 'Stage Equipment'];
    const stockLevels = [0, 5, 10, 15, 20]; // Stock levels from 0 to 20 

    const categoryCounts = {};
    categories.forEach((category) => (categoryCounts[category] = 0)); // Initialize category counts to zero

    if (!inventoryData || inventoryData.length === 0) {
      return { labels: categories, datasets: [] }; // Return categories with empty datasets
    }

    inventoryData.forEach((item) => {
      if (item.category && categories.includes(item.category)) {
        categoryCounts[item.category]++; // Increment count for each item in the category
      }
    });

    const data = categories.map((category) => categoryCounts[category]);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Stock Level',
          data: data,
          backgroundColor: `rgba(252,103,54)`, 
          borderColor: 'rgba(0, 0, 0, 0.5)',
          borderWidth: 1,
          barThickness: 30, 
        },
      ],
    };
  };

  const preparePieChartData = () => {
    const categories = ['Electrical', 'Lighting', 'Sound', 'Stage Equipment'];

    if (!inventoryData || inventoryData.length === 0) {
      return { labels: categories, datasets: [] }; // Return categories with empty datasets
    }

    const categoryCounts = {};
    categories.forEach((category) => (categoryCounts[category] = 0));

    inventoryData.forEach((item) => {
      if (item.category && categories.includes(item.category)) {
        categoryCounts[item.category]++;
      }
    });

    const pieData = categories.map((category) => categoryCounts[category]);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Pie Chart',
          data: pieData,
          backgroundColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)', 'rgba(255, 206, 86)', 'rgba(75, 192, 192)'],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="w-[1200px]">
      <div className="mt-6">
        <h2 className="px-4 py-4 mb-5 text-3xl font-semibold text-center text-white bg-blue-900 rounded">Inventory Stock Level</h2>
        <div  style={{ backgroundColor: "#fff", padding: "25px", borderRadius: "20px", margin: "0 auto", maxWidth: "1000px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "70%", paddingRight: "20px" }}>
              <Bar
                data={prepareChartData()}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Categories',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Stock Level',
                      },
                      min: 0,
                      max: 10,
                      stepSize: 3,
                      ticks: {
                        callback: (value) => value.toString(),
                      },
                    },
                  },
                  barPercentage: 1,
                  categoryPercentage: 1,
                }}
              />
            </div>
            <div style={{ width: "30%" }}>
              <Pie data={preparePieChartData()} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
