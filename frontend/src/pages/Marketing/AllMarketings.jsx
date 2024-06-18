import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MarketingTable from "../../components/home/MarketingTable";
import { FaPlusCircle } from "react-icons/fa";
import ExpenseChart from "../../components/home/ExpenseChart";
import { useAuthContext } from "../../hooks/useAuthContext";
import viewBG from "../../images/viewAdminBG.jpg";

const AllMarketings = () => {
  const { user } = useAuthContext();
  const [services, setServices] = useState([]);
  const [marketings, setMarketings] = useState([]);

  useEffect(() => {
    user &&
      fetch("http://localhost:3000/marketing/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setMarketings(data));
  }, [user]);

  return (
    <div
      className="h-full-screen px-4 pb-4 my-4"
      style={{
        backgroundImage: `url(${viewBG})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 10%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center justify-center p-4 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">
          Promotions and Marketing Expenses
        </h2>
      </div>
      <div className="flex items-center mt-4">
        <p className="mr-2 text-white text-md">New Promotion</p>
        <Link
          to={`/admin/service/dashboard/marketing/add`}
          className="text-2xl text-white"
        >
          <FaPlusCircle />
        </Link>
      </div>
      <br />
      <div className="col-span-3">
        <MarketingTable marketings={marketings} />
      </div>
      <br />
      <div className="flex items-center justify-center p-4 mb-6 shadow-lg rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">
          Promotions and Marketing Expenses Chart
        </h2>
      </div>
      <ExpenseChart marketings={marketings} />
    </div>
  );
};

export default AllMarketings;
