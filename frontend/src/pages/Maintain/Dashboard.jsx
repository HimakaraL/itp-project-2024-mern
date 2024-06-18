import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatusGraph from './StatusGraph';
import MaintenanceTypeGraph from './MaintenanceTypeGraph';
import { useAuthContext } from "../../hooks/useAuthContext";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    user&&
    axios
      .get("http://localhost:3000/maintain/", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {
        console.error("Error fetching schedules:", error);
      });
  }, [user]);

  //  data for Status graph
  const statusData = {
    started: schedules.filter(schedule => schedule.Status === 'started').length,
    onGoing: schedules.filter(schedule => schedule.Status === 'on-going').length,
    finished: schedules.filter(schedule => schedule.Status === 'finished').length
  };

  //  data for Maintenance Type graph
  const maintenanceTypeData = {
    urgent: schedules.filter(schedule => schedule.Maintenance_type === 'urgent').length,
    nonUrgent: schedules.filter(schedule => schedule.Maintenance_type === 'non-urgent').length
  };

  return (
    <div className="h-[100vh] p-4">
      <div className="flex justify-between p-4 mb-4 shadow-lg rounded-xl bg-sidebar-blue">
        <h2 className="text-3xl font-bold text-white ">Maintenace Dashboard</h2>
       
      </div>
    <div className='flex flex-col gap-20 md:flex-row'>
      
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',marginTop:'20px',marginLeft:'50px'}}>
        <h1><b>Status Graph</b></h1>
        <StatusGraph data={statusData} />
      </div>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', 
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' ,marginTop:'20px'}}>
        <h1><b>Maintenance Type Graph</b></h1>
        <MaintenanceTypeGraph data={maintenanceTypeData} />
      </div>
    </div>
    </div>
  );
  
  
};

export default Dashboard;
