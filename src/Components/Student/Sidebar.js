import React from 'react';
import { Link, useLocation,useNavigate } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import logout_icon from "../../Images/sidebar/logout.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);

  // Access the current route using useLocation hook
  const location = useLocation();
  const history = useNavigate();
  
  const menuItems = [
    { name: 'Dashboard', icon: require("../../Images/sidebar/dashboard.png"), href: `/STDashboard` },
    { name: 'Profile', icon: require("../../Images/sidebar/profile.png"), href: `/SProfile` },
    { name: 'Internship', icon: require("../../Images/sidebar/internship.png"), href: `/InternshipPage` },
    { name: 'Applications', icon: require("../../Images/sidebar/applications.png"), href: `/ApplicationPage` },
    { name: 'Calendar', icon: require("../../Images/sidebar/calender.png"), href: `/CalendarPage` },
    { name: 'ChatBot', icon: require("../../Images/sidebar/chatbot.png"), href: `/ChatBot` },
  ];
  
  const handleLogout = () => {
    if (localStorage.getItem("authToken")) {
      localStorage.removeItem("authToken");
      history("/");
      window.location.reload();
    } else {
      console.log("No authentication token found. Redirecting to login page.");
      history("/");
      window.location.reload();
    }
  };

  return (
    <aside
      className={`duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20' // Sidebar width based on state
      } bg-[#45A29E] text-white flex flex-col z-10`}
    >
      {/* Sidebar Header with Toggle Button */}
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="focus:outline-none text-white"
        >
          {/* Toggle Arrow: forward if closed, backward if open */}
          {isOpen ? (
            <IoIosArrowBack className="h-6 w-6" />
          ) : (
            <IoIosArrowForward className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="mt-10">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center pt-4 px-6 py-3 cursor-pointer ${
              location.pathname === item.href
                ? 'bg-[#D9D9D966] text-white px-3 py-3 rounded-lg' // Active class based on current route
                : ''
            }`}
          >
            <Link to={item.href} className="flex items-center space-x-2">
              <img src={item.icon} alt={`${item.name} icon`} className="w-6 h-6 mr-3" />
              {isOpen && <span className="ml-2">{item.name}</span>}
            </Link>
          </div>
        ))}
            <span onClick={handleLogout} className="flex items-center space-x-2 ml-6 mt-3 cursor-pointer">
              <img src={logout_icon} alt={`logout icon`} className="w-6 h-6 mr-3" />
              {isOpen && <span className="ml-2">Log out</span>}
            </span>
      </nav>
    </aside>
  );
};

export default Sidebar;
