import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      setLoading(true);
      fetch("http://localhost:3000/reservation/all-reservations/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setReservations(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching reservations:", error);
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (loading) {
      toast.info("Loading data...", {
        position: "bottom-right",
        autoClose: false,
        theme: "colored",
        toastId: "loading",
      });
    } else {
      toast.dismiss("loading");
    }
  }, [loading]);

  const prepareChartData = () => {
    const categories = ["pending", "approved", "cancelled"];

    const categoryCounts = {};
    categories.forEach((category) => (categoryCounts[category] = 0));

    if (!reservations || reservations.length === 0) {
      return { labels: categories, datasets: [] };
    }

    reservations.forEach((reservation) => {
      if (
        reservation.reservationStatus &&
        categories.includes(reservation.reservationStatus)
      ) {
        categoryCounts[reservation.reservationStatus]++;
      }
    });

    const data = categories.map((category) => categoryCounts[category]);

    return {
      labels: categories,
      datasets: [
        {
          label: "Reservations",
          data: data,
          backgroundColor: `rgba(252,103,54)`,
          borderColor: "rgba(0, 0, 0, 0.5)",
          borderWidth: 1,
          barThickness: 30,
        },
      ],
    };
  };

  const preparePieChartData = () => {
    const categories = ["pending", "approved", "cancelled"];

    if (!reservations || reservations.length === 0) {
      return { labels: categories, datasets: [] };
    }

    const categoryCounts = {};
    categories.forEach((category) => (categoryCounts[category] = 0));

    reservations.forEach((reservation) => {
      if (
        reservation.reservationStatus &&
        categories.includes(reservation.reservationStatus)
      ) {
        categoryCounts[reservation.reservationStatus]++;
      }
    });

    const pieData = categories.map((category) => categoryCounts[category]);

    return {
      labels: categories,
      datasets: [
        {
          label: "Pie Chart",
          data: pieData,
          backgroundColor: [
            "rgba(255, 99, 132)",
            "rgba(54, 162, 235)",
            "#4BC0C0",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="w-[1200px] h-[100vh]">
      <div className="mt-6">
        <h2 className="px-4 py-4 mb-5 text-3xl font-semibold text-center text-white bg-blue-900 rounded">
          Reservations
        </h2>
        <div
          className="chart-container"
          style={{
            backgroundColor: "#fff",
            padding: "25px",
            borderRadius: "20px",
            margin: "0 20px",
          }}
        >
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
                        text: "Reservations Categories",
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: "Reservations",
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
