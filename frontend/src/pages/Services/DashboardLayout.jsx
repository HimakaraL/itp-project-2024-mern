import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import AllMarketings from "../Marketing/AllMarketings";
import viewBG from "../../images/viewAdminBG.jpg"

const DashboardLayout = () => {
  const location = useLocation();
  return (
    <div className="flex flex-row" style={{
      backgroundImage: `url(${viewBG})`,
      backgroundSize: "cover",
      backgroundPosition: "50% 10%",
      backgroundRepeat: "no-repeat",
    }}>
      <div className="flex-none">
        <SideBar />
      </div>
      {location.pathname === "/admin/service/dashboard" && <AllMarketings />}
      <div className="flex items-center justify-center flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
