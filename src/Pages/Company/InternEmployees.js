import React, { useEffect, useContext, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { StoreContext } from "../../Context/StoreContext.js";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import InternEmployeesComponent from "../../Components/Company/InternEmployees.js";

const InternEmployees = () => {
  const { state } = useLocation();
  const mentor = state?.mentor;
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  const { url } = useContext(StoreContext);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Navigation Bar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        {/* <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-[#45A29E]`}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div> */}

        {/* Main Content Area */}
        <div className="flex-1 p-4 transition-all flex flex-col justify-start items-left overflow-x-hidden">
          <InternEmployeesComponent mentor={mentor} />
        </div>
      </div>
    </div>
  );
};

export default InternEmployees;
