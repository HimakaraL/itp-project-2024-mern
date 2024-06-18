import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import { useAuthContext } from '../../../hooks/useAuthContext';

const EmployeeDashboard = () => {
  const { user } = useAuthContext();
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/employee/employees/', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.data || !response.data.data) {
          throw new Error('Failed to fetch employee data');
        }
        setEmployeeData(response.data.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    if (user && user.token) {
      fetchEmployeeData();
    }
  }, [user]);

  const prepareBarChartData = () => {
    const positions = ['Cleaner', 'Helper', 'Technician', 'Supervisor', 'Manager', 'Driver'];
    const employeeCounts = {};
    positions.forEach((position) => (employeeCounts[position] = 0));

    if (!employeeData || employeeData.length === 0) {
      return { labels: positions, datasets: [] };
    }

    employeeData.forEach((employee) => {
      if (employee.position && positions.includes(employee.position)) {
        employeeCounts[employee.position]++;
      }
    });

    const data = positions.map((position) => employeeCounts[position]);

    return {
      labels: positions,
      datasets: [
        {
          label: 'Number of Employees',
          data: data,
          backgroundColor: 'red', // Change the color to orange
          borderColor: 'rgba(0, 0, 0, 0.5)',
          borderWidth: 1,
          barThickness: 30, 
        },
      ],
    };
  };

  const preparePieChartData = () => {
    const positions = ['Cleaner', 'Helper', 'Technician', 'Supervisor', 'Manager', 'Driver'];
    const employeeCounts = {};
    positions.forEach((position) => (employeeCounts[position] = 0));

    if (!employeeData || employeeData.length === 0) {
      return { labels: positions, datasets: [] };
    }

    employeeData.forEach((employee) => {
      if (employee.position && positions.includes(employee.position)) {
        employeeCounts[employee.position]++;
      }
    });

    const data = positions.map((position) => employeeCounts[position]);

    return {
      labels: positions,
      datasets: [
        {
          label: 'Number of Employees',
          data: data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF8C00'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF8C00'
          ],
        },
      ],
    };
  };

  const prepareLineChartData = () => {
    const positions = ['Cleaner', 'Helper', 'Technician', 'Supervisor', 'Manager', 'Driver'];
    const employeeCounts = {};
    positions.forEach((position) => (employeeCounts[position] = 0));

    if (!employeeData || employeeData.length === 0) {
      return { labels: positions, datasets: [] };
    }

    employeeData.forEach((employee) => {
      if (employee.position && positions.includes(employee.position)) {
        employeeCounts[employee.position]++;
      }
    });

    const data = positions.map((position) => employeeCounts[position]);

    return {
      labels: positions,
      datasets: [
        {
          label: 'Number of Employees',
          data: data,
          fill: false,
          borderColor: 'red',
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="container">
      <div className="mt-6">
        <h2 className="px-4 py-4 mb-5 text-3xl font-semibold text-center text-white bg-blue-900 rounded">Employee Position Distribution</h2>
        <div className="chart-container" style={{ backgroundColor: "#fff", padding: "25px", borderRadius: " 0px", margin: "0 auto", maxWidth: "1000px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              {/* Bar Chart */}
              <Bar
                data={prepareBarChartData()}
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
                        text: 'Positions',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Number of Employees',
                      },
                      min: 0,
                      max: 20,
                      stepSize: 3,  
                      ticks: {
                        callback: (value) => Math.round(value).toString(), // Round values to nearest integer
                      },
                    },
                  },
                  barPercentage: 1,
                  categoryPercentage: 1,
                }}
              />
            </div>
            <div style={{ width: "48%" }}>
              {/* Pie Chart */}
              <Pie
                data={preparePieChartData()}
                options={{
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>
          <div style={{ width: "100%" }}>
            {/* Line Chart */}
            <Line
              data={prepareLineChartData()}
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
                      text: 'Positions',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Number of Employees',
                    },
                    min: 0,
                    max: 20,
                    stepSize: 3,  
                    ticks: {
                      callback: (value) => Math.round(value).toString(), // Round values to nearest integer
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
