import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import logout_icon from "../../Images/sidebar/logout.png";
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { url } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  // State to track the active menu item
  const [activeItem, setActiveItem] = useState(null);
  // Still keep hover state for visual feedback
  const [hoverItem, setHoverItem] = useState(null);
  // State to track user verification status
  const [isUserVerified, setIsUserVerified] = useState(true); // Default to true to avoid blocking initially

  // Memoize menuItems to prevent recreation on every render
  const menuItems = useMemo(() => [
    { name: 'Dashboard', icon: require("../../Images/sidebar/dashboard.png"), href: `/STDashboard` },
    { name: 'Profile', icon: require("../../Images/sidebar/profile.png"), href: `/SProfile` },
    { name: 'Internship', icon: require("../../Images/sidebar/internship.png"), href: `/InternshipPage`, requiresVerification: true },
    { name: 'Applications', icon: require("../../Images/sidebar/applications.png"), href: `/ApplicationPage`, requiresVerification: true },
    { name: 'Progress Report', icon: require("../../Images/sidebar/applications.png"), href: `/DocumentPage`, requiresVerification: true },
    { name: 'Calendar', icon: require("../../Images/sidebar/calender.png"), href: `/CalendarPage` },
    { name: 'FAQ', icon: require("../../Images/sidebar/chatbot.png"), href: `/ChatbotPage` },
  ], []);

  // Check user verification status on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }

    const checkUserVerification = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const registeredEmail = decodedToken.email;
        
        const response = await axios.post(`${url}/api/student/checkProfileVerification`, { registeredEmail });
        if (response.data.success) {
          setIsUserVerified(true);
        } else {
          setIsUserVerified(false);
        }
      } catch (error) {
        console.log(error);
        setIsUserVerified(false);
      }
    };

    checkUserVerification();
  }, [url, navigate]);

  // Update active item based on current path whenever location changes
  useEffect(() => {
    const currentPage = menuItems.find(item => {
      const itemPath = item.href.split('?')[0];
      const currentPath = location.pathname.split('?')[0];
      return currentPath === itemPath;
    });
    
    if (currentPage) {
      setActiveItem(currentPage.name);
    } else {
      setActiveItem(null);
    }
  }, [location.pathname, menuItems]);

  // Handle navigation with verification check
  const handleNavigation = useCallback((item, event) => {
    // Check if this page requires verification and user is not verified
    if (item.requiresVerification && !isUserVerified) {
      event.preventDefault();
      toast.error("Your profile is not verified yet!");
      navigate("/SProfile");
      return;
    }
  }, [isUserVerified, navigate]);

  // Handle logout
  const handleLogout = useCallback(() => {
    if (localStorage.getItem("authToken")) {
      localStorage.removeItem("authToken");
      navigate("/");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <aside
      className={`transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      } bg-[#45A29E] text-white flex flex-col z-10 h-full`}
    >
      {/* Sidebar Header with Toggle Button */}
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="focus:outline-none text-white transition-transform duration-200"
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
      <nav className="mt-10 flex-1">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center pt-4 px-6 py-3 cursor-pointer transition-all duration-200 ${
              activeItem === item.name
                ? 'bg-[#D9D9D966] text-white px-3 py-3 rounded-lg' // Active state
                : hoverItem === item.name
                ? 'bg-[#D9D9D933] text-white px-3 py-3 rounded-lg' // Hover state (lighter)
                : ''
            }`}
            onMouseEnter={() => setHoverItem(item.name)}
            onMouseLeave={() => setHoverItem(null)}
          >
            <Link
              to={item.href}
              className="flex items-center space-x-2 w-full"
              onClick={(event) => handleNavigation(item, event)}
            >
              <img
                src={item.icon}
                alt={`${item.name} icon`}
                className="w-6 h-6 mr-3 flex-shrink-0"
              />
              {isOpen && <span className="ml-2">{item.name}</span>}
            </Link>
          </div>
        ))}

        {/* Logout Button */}
        <span
          onClick={handleLogout}
          className="flex items-center space-x-2 ml-6 mt-3 cursor-pointer transition-all duration-200 hover:bg-[#D9D9D933] py-2 rounded-lg"
        >
          <img src={logout_icon} alt="logout icon" className="w-6 h-6 mr-3 flex-shrink-0" />
          {isOpen && <span className="ml-2">Log out</span>}
        </span>
      </nav>
    </aside>
  );
};

export default Sidebar;