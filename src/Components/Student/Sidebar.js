import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import logout_icon from "../../Images/sidebar/logout.png";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);

  // Access the current route using useLocation hook
  const location = useLocation();
  const navigate = useNavigate();

  // State to track the active menu item
  const [activeItem, setActiveItem] = useState(null);
  // Still keep hover state for visual feedback
  const [hoverItem, setHoverItem] = useState(null);

  const menuItems = [
    { name: 'Dashboard', icon: require("../../Images/sidebar/dashboard.png"), href: `/STDashboard?${decodedToken._id}` },
    { name: 'Profile', icon: require("../../Images/sidebar/profile.png"), href: `/SProfile?${decodedToken._id}` },
    { name: 'Internship', icon: require("../../Images/sidebar/internship.png"), href: `/InternshipPage?${decodedToken._id}` },
    { name: 'Applications', icon: require("../../Images/sidebar/applications.png"), href: `/ApplicationPage?${decodedToken._id}` },
    { name: 'Calendar', icon: require("../../Images/sidebar/calender.png"), href: `/CalendarPage?${decodedToken._id}` },
    { name: 'ChatBot', icon: require("../../Images/sidebar/chatbot.png"), href: `/ChatbotPage?${decodedToken._id}` },
  ];

  // Update active item based on current path whenever location changes
  useEffect(() => {
    // Find the menu item that matches the current path
    const currentPage = menuItems.find(item => {
      // Extract the base path without query parameters
      const itemPath = item.href.split('?')[0];
      const currentPath = location.pathname.split('?')[0];
      return currentPath === itemPath;
    });
    
    if (currentPage) {
      setActiveItem(currentPage.name);
    } else {
      setActiveItem(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    if (localStorage.getItem("authToken")) {
      localStorage.removeItem("authToken");
      navigate("/");
      window.location.reload();
    } else {
      console.log("No authentication token found. Redirecting to login page.");
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <aside
      className={`duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'} bg-[#45A29E] text-white flex flex-col z-10`}
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
              activeItem === item.name || hoverItem === item.name
                ? 'bg-[#D9D9D966] text-white px-3 py-3 rounded-lg' // Active or hover state
                : ''
            }`}
            onMouseEnter={() => setHoverItem(item.name)} // Set hover state
            onMouseLeave={() => setHoverItem(null)} // Remove hover state
          >
            <Link to={item.href} className="flex items-center space-x-2 w-full">
              <img src={item.icon} alt={`${item.name} icon`} className="w-6 h-6 mr-3" />
              {isOpen && <span className="ml-2">{item.name}</span>}
            </Link>
          </div>
        ))}

        {/* Logout Button */}
        <span
          onClick={handleLogout}
          className="flex items-center space-x-2 ml-6 mt-3 cursor-pointer"
        >
          <img src={logout_icon} alt="logout icon" className="w-6 h-6 mr-3" />
          {isOpen && <span className="ml-2">Log out</span>}
        </span>
      </nav>
    </aside>
  );
};

export default Sidebar;