import React, { useEffect, useContext, useState } from "react";
import Sidebar from "../../Components/Company/CSidebar.js";
import Navbar from "../../Components/Navbar/Navbar";
import { StoreContext } from "../../Context/StoreContext.js";
import { jwtDecode } from "jwt-decode";
import CompanyMentorProfile from "../../Components/Company/CompanyMentorProfile.js";

const CompanyMentorsPage = () => {
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  const { url } = useContext(StoreContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // for toggle sidebar
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
          <CompanyMentorProfile/>
        </div>
      </div>
    </div>
  );
};

export default CompanyMentorsPage;
