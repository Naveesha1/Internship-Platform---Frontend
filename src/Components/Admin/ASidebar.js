import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { jwtDecode } from "jwt-decode"; 
import logout_icon from "../../Images/sidebar/logout.png";

const ASidebar = ({ isOpen, toggleSidebar }) => {

  const location = useLocation();
  const history = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: require("../../Images/sidebar/dashboard.png"),
      href: `/AdminDashboard`,
    },
    {
      name: "Profiles",
      icon: require("../../Images/sidebar/profile.png"),
      href: `/AdminProfiles`,
    },
    {
      name: "Internship",
      icon: require("../../Images/sidebar/internship.png"),
      href: `/AdminInternships`,
    },
    {
      name: "Progress Submissions",
      icon: require("../../Images/sidebar/Document.png"),
      href: `/AdminDocument`,
    },
    {
      name: "Calendar",
      icon: require("../../Images/sidebar/calender.png"),
      href: `/AdminCalender`,
    },
    {
      name: "Analytics",
      icon: require("../../Images/AdminDashboard/Analytics.png"),
      href: `/AdminAnalyticsPage`,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    history("/");
    window.location.reload();
  };

  return (
    <aside
      className={`duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      } bg-[#45A29E] text-white flex flex-col z-10`}
    >
      {/* Toggle button */}
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="focus:outline-none text-white"
        >
          {isOpen ? (
            <IoIosArrowBack className="h-6 w-6" />
          ) : (
            <IoIosArrowForward className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar items */}
      <nav className="mt-10">
        {menuItems.map((item) => {
          const isActive =
            location.pathname === new URL(item.href, window.location.origin).pathname;

          return (
            <div
              key={item.name}
              className={`flex items-center pt-4 px-6 py-3 cursor-pointer ${
                isActive ? "bg-[#D9D9D966] text-white px-3 py-3 rounded-lg" : ""
              }`}
            >
              <Link to={item.href} className="flex items-center space-x-2">
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className="w-6 h-6 mr-3"
                />
                {isOpen && <span className="ml-2">{item.name}</span>}
              </Link>
            </div>
          );
        })}

        {/* Logout */}
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

export default ASidebar;
