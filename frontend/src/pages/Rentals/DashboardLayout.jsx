import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Rentals/Sidebar'
import viewBG from "../../images/viewAdminBG.jpg"

const DashboardLayout = () => {
  return (
    <div className='flex flex-col gap-4 md:flex-row' style={{
      backgroundImage: `url(${viewBG})`,
      backgroundSize: "cover",
      backgroundPosition: "50% 10%",
      backgroundRepeat: "no-repeat",
    }}>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default DashboardLayout