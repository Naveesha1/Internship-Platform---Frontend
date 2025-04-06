import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import logout_icon from "../../Images/sidebar/logout.png";

const MentorSidebar = ({ isOpen, toggleSidebar }) => {
  // Safely get and decode the token
  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken?._id;

  const location = useLocation();
  const history = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: require("../../Images/sidebar/dashboard.png"),
      href: `/MDashboard?${userId}`,
    },
    {
      name: "Profile",
      icon: require("../../Images/sidebar/profile.png"),
      href: `/MProfile?${userId}`,
    },
    {
      name: "Documents",
      icon: require("../../Images/sidebar/Document.png"),
      href: `/MDocument?${userId}`,
    },
    {
      name: "Calendar",
      icon: require("../../Images/sidebar/calender.png"),
      href: `/MCalender?${userId}`,
    },
    {
      name: "Students",
      icon: require("../../Images/sidebar/student.png"),
      href: `/MStudent?${userId}`,
    },
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
        isOpen ? "w-64" : "w-20"
      } bg-[#45A29E] text-white flex flex-col z-10`}
    >
      {/* Sidebar Toggle Button */}
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

      {/* Sidebar Navigation */}
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

export default MentorSidebar;
