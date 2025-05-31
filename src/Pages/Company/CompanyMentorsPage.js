import React, { useEffect, useContext, useState } from "react";
import Sidebar from "../../Components/Company/CSidebar.js";
import Navbar from "../../Components/Navbar/Navbar";
import { StoreContext } from "../../Context/StoreContext.js";
import { jwtDecode } from "jwt-decode";
import CompanyMentorProfile from "../../Components/Company/CompanyMentorProfile.js";
import { useNavigate } from "react-router-dom";

const CompanyMentorsPage = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);
  const [registeredEmail, setRegisteredEmail] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Handle token and redirection
  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/");
      };

      const decodedToken = jwtDecode(token);
      setRegisteredEmail(decodedToken.email);
    } catch (error) {
      navigate("/");
    }
  }, [navigate]);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Navigation Bar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-[#45A29E]`}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 transition-all flex flex-col justify-start items-left overflow-x-hidden">
          {registeredEmail && <CompanyMentorProfile />}
        </div>
      </div>
    </div>
  );
};

export default CompanyMentorsPage;
