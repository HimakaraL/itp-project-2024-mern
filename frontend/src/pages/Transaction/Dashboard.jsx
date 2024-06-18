import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from '../../hooks/useAuthContext';

const Dashboard = () => {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if(user && user.token){
    setLoading(true);
      fetch("http://localhost:3000/finance/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data.data)||setTypes(data.data);
          setLoading(false);
        });
    }
  }, [user]);

  const prepareChartData = () => {
    const categories = ['equipment rental', 'service fee', 'hut rental', 'maintenance fee', 'utility bill', 'transport fee', 'marketing fee', 'Other'];

    const categoryCounts = {};
    categories.forEach((category) => (categoryCounts[category] = 0)); 

    if (!transactions || transactions.length === 0) {
      return { labels: categories, datasets: [] }; 
    }

    transactions.forEach((transactions) => {
      if (transactions.category && categories.includes(transactions.category)) {
        categoryCounts[transactions.category]++;
      }
    });

    const data = categories.map((category) => categoryCounts[category]);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Transactions',
          data: data,
          backgroundColor: `rgba(252,103,54)`, 
          borderColor: 'rgba(0, 0, 0, 0.5)',
          borderWidth: 1,
          barThickness: 30, 
        },
      ],
    };
  };

  const prepareChartData2 = () => {
    const categories = ['income','expense']

    const categoryCounts = {};
    categories.forEach((category) => (categoryCounts[category] = 0)); 

    if (!types || types.length === 0) {
      return { labels: categories, datasets: [] }; 
    }

    types.forEach((types) => {
      if (types.transactionType && categories.includes(types.transactionType)) {
        categoryCounts[types.transactionType]++;
      }
    });

    const data = categories.map((category) => categoryCounts[category]);

    return {
      labels: categories,
      datasets: [
        {
          label: 'Transactions',
          data: data,
          backgroundColor: `rgba(252,103,54)`, 
          borderColor: 'rgba(0, 0, 0, 0.5)',
          borderWidth: 1,
          barThickness: 30, 
        },
      ],
    };
  };
  const preparePieChartData2 = () => {
    const categories = ['income','expense']

    if (!types || types.length === 0) {
      return { labels: categories, datasets: [] }; 
    }

    const categoryCounts = {};
    categories.forEach((category) => (categoryCounts[category] = 0));

    types.forEach((types) => {
      if (types.transactionType && categories.includes(types.transactionType)) {
        categoryCounts[types.transactionType]++;
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

  const preparePieChartData = () => {
    const categories = ['equipment rental', 'service fee', 'hut rental', 'maintenance fee', 'utility bill', 'transport fee', 'marketing fee', 'Other'];

    if (!transactions || transactions.length === 0) {
      return { labels: categories, datasets: [] }; 
    }

    const categoryCounts = {};
    categories.forEach((category) => (categoryCounts[category] = 0));

    transactions.forEach((transactions) => {
      if (transactions.category && categories.includes(transactions.category)) {
        categoryCounts[transactions.category]++;
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

  useEffect(() => {
    if (loading) {
      toast.info("Loading data...", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "colored",
        toastId: "loading",
      });
    } else {
      toast.dismiss("loading");
    }
  }, [loading]);

  return (
    <div className="w-[1200px] h-full-screen">
      <div className="mt-6 mb-8">
        <h2 className="px-4 py-4 mb-5 text-3xl font-semibold text-center text-white rounded bg-sidebar-blue">Transactions</h2>
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
                        text: 'Transaction Categories',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Transactions',
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
        <h2 className="px-4 py-4 mt-8 mb-5 text-3xl font-semibold text-center text-white rounded bg-sidebar-blue">Transaction Types</h2>
        <div className="chart-container" style={{ backgroundColor: "#fff", padding: "25px", borderRadius: "20px", margin: "0 20px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "70%", paddingRight: "20px" }}>
              <Bar
                data={prepareChartData2()}
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
                        text: 'Transaction Types',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Transactions',
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
              <Pie data={preparePieChartData2()} />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
