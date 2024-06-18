import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import Chart from "chart.js/auto"; // Import Chart constructor

import viewBG from "../../images/viewAdminBG.jpg";

const ExpenseChart = ({ marketings }) => {
  const [categoryExpenses, setCategoryExpenses] = useState({
    "Ad Campaign": 0,
    "Social Media": 0,
    "Email Marketing": 0,
    "Discount Offer": 0,
    "Event Sponsorship": 0,
    "Print Media": 0,
    "Promotional Giveaway": 0,
    Other: 0,
  });

  useEffect(() => {
    const updatedExpenses = marketings.reduce((acc, marketing) => {
      const category = marketing.expenseCategory;
      const amount = parseFloat(marketing.expenseAmount);

      if (!isNaN(amount)) {
        acc[category] = (acc[category] || 0) + amount;
      }

      return acc;
    }, {});

    setCategoryExpenses(updatedExpenses);
  }, [marketings]);

  useEffect(() => {
    const table = document.getElementById("myChart");
    const config = {
      type: "bar",
      data: {
        labels: Object.keys(categoryExpenses),
        datasets: [
          {
            label: "Total Expenses",
            data: Object.values(categoryExpenses),
            backgroundColor: "rgba(128, 179, 255)", // Solid color

            borderWidth: 0, // No border
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white", // X-axis text color
            },
          },
          y: {
            ticks: {
              color: "white", // Y-axis text color
            },
          },
        },
      },
    };

    var myChart = new Chart(table, config);

    // when component unmounts
    return () => {
      myChart.destroy();
    };
  }, [categoryExpenses]);

  return (
    <div
      className="h-screen px-4 pb-4 my-4"
      style={{
        backgroundImage: `url(${viewBG})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 10%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <canvas
        id="myChart"
        width="200"
        height="100"
        className="text-white"
      ></canvas>
    </div>
  );
};
export default ExpenseChart;
