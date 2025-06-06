import React, { useEffect, useContext, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { StoreContext } from "../../Context/StoreContext.js";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import InternEmployeesComponent from "../../Components/Company/InternEmployees.js";

const InternEmployees = () => {
  const { state } = useLocation();
  const mentor = state?.mentor;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Navigation Bar */}
      <Navbar />

      <div className="flex flex-1">

        {/* Main Content Area */}
        <div className="flex-1 p-4 transition-all flex flex-col justify-start items-left overflow-x-hidden">
          <InternEmployeesComponent mentor={mentor} />
        </div>
      </div>
    </div>
  );
};

export default InternEmployees;
