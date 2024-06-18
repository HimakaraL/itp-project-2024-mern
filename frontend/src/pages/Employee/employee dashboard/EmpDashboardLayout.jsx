import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import viewBG from "../../../images/viewAdminBG.jpg"

const EmpDashboardLayout = () => {
  return (
    <div className='flex flex-col gap-4 md:flex-row w-[2100]' style={{
      backgroundImage: `url(${viewBG})`,
      backgroundSize: "cover",
      backgroundPosition: "50% 10%",
      backgroundRepeat: "no-repeat",}}>
        <SideBar/>
        <Outlet/>
    </div>
  )
}

export default EmpDashboardLayout;