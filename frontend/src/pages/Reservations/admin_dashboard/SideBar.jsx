import { TiHome } from "react-icons/ti";
import { CgFileDocument } from "react-icons/cg";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import React from "react";
import logo from "../../../images/logo.png";
import { useLogout } from "../../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const SideBar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  
  const Menus = [
    { title: "Dashboard", icon: <CgFileDocument />,href:"/admin/feedback/dashboard" },
    { title: "Home", icon: <TiHome />,href:"/admin/dashboard" },
    { title: "Clients Reservations", icon: <CgFileDocument />,href:"/admin/reservation/dashboard/manage" },
    { title: "Approved Reservations", icon: <GiConfirmed /> ,href:"/admin/reservation/dashboard/approve-reservations"},
    { title: "Cancelled Reservations", icon: <GiCancel /> ,href:"/admin/reservation/dashboard/cancel-reservations"},
    { title: "Logout", icon: <IoLogOut /> ,href:"/"},
  ];

  const showSuccess = () => {
    toast.info("Logout successfully!", {
      position: "bottom-right",
      theme: "colored",
      autoClose: 5000,
    });
  };

  const handleClick = (href) => {
    if (href === "/") {
      showSuccess();
      logout();
      navigate(href);
    }
    navigate(href);
  };

  return (
    <div className="h-full-screen w-72 bg-dark-purple" >
      <div className="flex items-center mb-8">
        <img
          src={logo}
          alt="Logo"
          className="w-24 m-auto mt-4 duration-500 cursor-pointer rounded-xl"
        />
        <h1 className="mr-2 text-2xl font-bold text-white duration-300 origin-left ">
          Chandika Light
        </h1>
      </div>
      <ul>
        {Menus.map((menu, index) => (
          <li key={index} onClick={() => handleClick(menu.href)} className="flex items-center p-4 text-xl font-bold text-gray-300 cursor-pointer rounded-2xl gap-x-4 hover:bg-sidebar-orange">
            {menu.icon}
            <span>{menu.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
