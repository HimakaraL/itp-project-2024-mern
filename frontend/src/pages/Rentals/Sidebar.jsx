import React from 'react';
import { HiChartPie } from 'react-icons/hi';
import { CgFileDocument } from 'react-icons/cg';
import { IoLogOut } from 'react-icons/io5';
import logo from '../../images/logo.png';
import { TiHome } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SideBar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const Menus = [
    { title: 'Dashboard', icon: <HiChartPie/>, href: '/admin/rental/dashboard' },
    { title: 'Home', icon: <TiHome/>, href: '/admin/dashboard' },
    { title: 'Rental Management', icon: <CgFileDocument/>, href: '/admin/rental/dashboard/manage' },
    { title: 'Add Order', icon: <CgFileDocument/>, href: '/admin/rental/dashboard/add' },
    { title: 'Log Out', icon:<IoLogOut/>, href: '/' },
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
    <div className="h-full-screen w-72 bg-dark-purple">
      <div className="flex items-center mb-8">
        <img
          src={logo}
          alt="Logo"
          className="w-24 m-auto mt-4 duration-500 cursor-pointer rounded-xl"
        />
        <h1 className="mr-4 text-xl font-bold text-white duration-300 origin-left ">
          Chandika Light
        </h1>
      </div>
      <ul>
        {Menus.map((menu, index) => (
          <li
            key={index}
            onClick={() => handleClick(menu.href)}
            className="flex items-center p-4 text-xl font-bold text-gray-300 cursor-pointer rounded-2xl gap-x-4 hover:bg-sidebar-orange"
          >
            {menu.icon}
            <span>{menu.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
