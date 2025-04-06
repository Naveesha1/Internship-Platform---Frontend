import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import logout_icon from "../../Images/sidebar/logout.png";

const CSidebar = ({ isOpen, toggleSidebar }) => {
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);

  const location = useLocation();
  const navigate = useNavigate();

  const [activeItem, setActiveItem] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);

  const menuItems = [
    { name: "Dashboard", icon: require("../../Images/sidebar/dashboard.png"), href: `/ComDashboard?${decodedToken._id}` },
    { name: "Profile", icon: require("../../Images/sidebar/profile.png"), href: `/CompanyProfile?${decodedToken._id}` },
    { name: "Internship", icon: require("../../Images/sidebar/internship.png"), href: `/CompanyInternshipPage?${decodedToken._id}` },
    { name: "Applications", icon: require("../../Images/sidebar/applications.png"), href: `/CompanyApplicationPage?${decodedToken._id}` },
    { name: "Calendar", icon: require("../../Images/sidebar/calender.png"), href: `/CompanyCalendar?${decodedToken._id}` },
  ];

  useEffect(() => {
    const currentPage = menuItems.find(item => {
      const itemPath = item.href.split('?')[0];
      const currentPath = location.pathname.split('?')[0];
      return itemPath === currentPath;
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
    <aside className={`duration-300 ease-in-out ${isOpen ? "w-64" : "w-20"} bg-[#45A29E] text-white flex flex-col z-10`}>
      <div className="p-4 flex justify-between items-center">
        <button onClick={toggleSidebar} className="focus:outline-none text-white">
          {isOpen ? <IoIosArrowBack className="h-6 w-6" /> : <IoIosArrowForward className="h-6 w-6" />}
        </button>
      </div>

      <nav className="mt-10">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center pt-4 px-6 py-3 cursor-pointer ${
              activeItem === item.name || hoverItem === item.name
                ? "bg-[#D9D9D966] text-white px-3 py-3 rounded-lg"
                : ""
            }`}
            onMouseEnter={() => setHoverItem(item.name)}
            onMouseLeave={() => setHoverItem(null)}
          >
            <Link to={item.href} className="flex items-center space-x-2 w-full">
              <img src={item.icon} alt={`${item.name} icon`} className="w-6 h-6 mr-3" />
              {isOpen && <span className="ml-2">{item.name}</span>}
            </Link>
          </div>
        ))}

        <span onClick={handleLogout} className="flex items-center space-x-2 ml-6 mt-3 cursor-pointer">
          <img src={logout_icon} alt="logout icon" className="w-6 h-6 mr-3" />
          {isOpen && <span className="ml-2">Log out</span>}
        </span>
      </nav>
    </aside>
  );
};

export default CSidebar;
