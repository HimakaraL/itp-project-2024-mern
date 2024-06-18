import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import logo from "../../images/logo.png";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import profile from "../../images/profile-img2.jpg";

const NavBar = () => {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const showSuccess = () => {
    toast.info("Logout successfully!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  const handleClick = () => {
    logout();
    showSuccess();
    navigate("/");
  };

  return (
    <div>
      <Navbar
        style={{ borderRadius: "0" }}
        fluid
        rounded
        className="bg-gradient-to-r from-dark-brown to-white via-client-yellow"
      >
        <Navbar.Brand href="#">
          <img
            src={logo}
            className="h-24 ml-5 rounded-lg"
            alt="Flowbite React Logo"
          />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={profile} rounded />}
          >
            {user && (
              <div>
                <Dropdown.Header>
                  <span className="block text-sm font-medium truncate">
                    {user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item onClick={handleClick}>Log out</Dropdown.Item>
                {user && user.userType === "admin" ? (
                  <Dropdown.Item href="/admin/dashboard">
                    Dashboard
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item href="/client/dashboard/manage">
                    Dashboard
                  </Dropdown.Item>
                )}
              </div>
            )}
            {!user && (
              <div>
                <Dropdown.Item href="/client/dashboard/login">
                  Log In
                </Dropdown.Item>
                <Dropdown.Item href="/client/dashboard/signup">
                  Sign Up
                </Dropdown.Item>
              </div>
            )}
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="mr-12 text-xl">
          <style>
            {`
          .nav-link {
            text-decoration: none;
            position: relative;
            transition: color 0.3s;
          }
          .nav-link::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: red;
            visibility: hidden;
            transform: scaleX(0);
            transition: all 0.3s ease-in-out;
          }
          .nav-link:hover::after {
            visibility: visible;
            transform: scaleX(1);
          }
          .nav-link:hover {
            color: black;
          }
       `}
          </style>
          <Navbar.Link
            href="/"
            className="text-lg font-bold text-client-brown nav-link"
          >
            Home
          </Navbar.Link>

          {user && user.userType === "user" ? (
            <Navbar.Link
              href="/client/dashboard/manage"
              className="text-lg font-bold text-client-brown nav-link"
            >
              Reservation
            </Navbar.Link>
          ) : !user ? (
            <Navbar.Link
              href="/client/dashboard/login"
              className="text-lg font-bold text-client-brown nav-link"
            >
              Reservation
            </Navbar.Link>
          ) : (
            <Navbar.Link
              onClick={() => alert("Please Login as a user")}
              href=""
              className="text-lg font-bold text-client-brown nav-link"
            >
              Reservation
            </Navbar.Link>
          )}

          {user && user.userType === "user" ? (
            <Navbar.Link
              href="/client/service"
              className="text-lg font-bold text-client-brown nav-link"
            >
              Services
            </Navbar.Link>
          ) : !user ? (
            <Navbar.Link
              href="/client/dashboard/login"
              className="text-lg font-bold text-client-brown nav-link"
            >
              Services
            </Navbar.Link>
          ) : (
            <Navbar.Link
              onClick={() => alert("Please Login as a user")}
              href=""
              className="text-lg font-bold text-client-brown nav-link"
            >
              Services
            </Navbar.Link>
          )}

          <Navbar.Link
            href="/client/inventory/details"
            className="text-lg font-bold text-client-brown nav-link"
          >
            Inventory
          </Navbar.Link>

          {user && user.userType === "user" ? (
            <Navbar.Link
              href="/client/feedback/homeFeedback"
              className="text-lg font-bold text-client-brown nav-link"
            >
              Feedback and Review
            </Navbar.Link>
          ) : !user ? (
            <Navbar.Link
              href="/client/dashboard/login"
              className="text-lg font-bold text-client-brown nav-link"
            >
              Feedback and Review
            </Navbar.Link>
          ) : (
            <Navbar.Link
              onClick={() => alert("Please Login as a user")}
              href=""
              className="text-lg font-bold text-client-brown nav-link"
            >
              Feedback and Review
            </Navbar.Link>
          )}

          <Navbar.Link
            href="/client/dashboard/aboutus"
            className="text-lg font-bold text-client-brown nav-link"
          >
            About Us
          </Navbar.Link>
          <Navbar.Link
            href="/client/dashboard/faq"
            className="text-lg font-bold text-client-brown nav-link"
          >
            FAQ
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
