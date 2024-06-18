import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { useAuthContext } from '../../hooks/useAuthContext';

const Dashboard = () => {
  const { user } = useAuthContext();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    user&&
    fetch('http://localhost:3000/feedback/', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then(response => response.json())
        .then(data => setFeedbacks(data))
        .catch(error => console.error('Error fetching feedback data:', error));
}, [user]);

  const prepareChartData = () => {
    const categories = ['1', '2', '3','4','5'];

    const categoryCounts = {};
    categories.forEach((category) => (categoryCounts[category] = 0)); 

    if (!feedbacks || feedbacks.length === 0) {
      return { labels: categories, datasets: [] }; 
    }

    feedbacks.forEach((feedbacks) => {
      if (feedbacks.rating && categories.includes(feedbacks.rating)) {
        categoryCounts[feedbacks.rating]++;
      }
    });

    const data = categories.map((category) => categoryCounts[category]);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Feedbacks',
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
    const categories = ['1', '2', '3','4','5'];

    if (!feedbacks || feedbacks.length === 0) {
      return { labels: categories, datasets: [] }; 
    }

    const categoryCounts = {};
    categories.forEach((category) => (categoryCounts[category] = 0));

    feedbacks.forEach((feedbacks) => {
      if (feedbacks.rating && categories.includes(feedbacks.rating)) {
        categoryCounts[feedbacks.rating]++;
      }
    });

    const pieData = categories.map((category) => categoryCounts[category]);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Pie Chart',
          data: pieData,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#33EC15',
            '#9966FF',
            '#FF8C00',
            '#FB73F3'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#33EC15',
            '#9966FF',
            '#FF8C00',
            '#FB73F3'
            
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="w-[1200px] h-[100vh]">
      <div className="mt-6">
        <h2 className="px-4 py-4 mb-5 text-3xl font-semibold text-center text-white bg-blue-900 rounded">Feedback and reviews</h2>
        <div className="chart-container" style={{ backgroundColor: "#fff", padding: "25px", borderRadius: "20px", margin: "0 20px" }}>
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
                        text: 'Ratings',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Rating counts',
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
