import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Sidebar from '../../Components/Student/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import chance_img from '../../Images/dashboard/chance.png';
import company_img from '../../Images/dashboard/company.png';
import application_img from '../../Images/dashboard/application.png';

const Dashboard = () => {
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar open/close state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle state
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Navigation Bar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-20' // Sidebar width based on state
          } bg-[#45A29E]`}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area */}
        <div
          className={`flex-1 p-6 transition-all duration-300`}
        >
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-[#45A29E]">
            <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
              <img src={application_img} alt=''className="pt-2 pb-5"/>
              <h3 className="text-3xl font-bold pl-2">20</h3>
              <p className="pl-2 font-bold text-sm pt-3">Submitted Applications</p>
            </div>
            <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
              <img src={company_img} alt=''className="pt-2 pb-5"/>
              <h3 className="text-3xl font-bold pl-2">12</h3>
              <p className="pl-2 font-bold text-sm pt-3">Response Companies</p>
            </div>
            <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
              <img src={chance_img} alt=''className="pt-2 pb-5"/>
              <h3 className="text-3xl font-bold pl-2">08</h3>
              <p className="pl-2 font-bold text-sm pt-3">New Chances</p>
            </div>
          </div>

          {/* Internship Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-14">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h4 className="text-lg text-[#1E1E1EAD] font-semibold mb-3">Internship Recommendations</h4>
              <ul className="space-y-2">
                <li className="flex justify-between bg-gray-200 p-2 rounded-md">
                  <span>99x</span>
                  <button className="text-green-600">→</button>
                </li>
                <li className="flex justify-between bg-gray-200 p-2 rounded-md">
                  <span>WSO2</span>
                  <button className="text-green-600">→</button>
                </li>
                <li className="flex justify-between bg-gray-200 p-2 rounded-md">
                  <span>LSEG</span>
                  <button className="text-green-600">→</button>
                </li>
              </ul>
            </div>

            {/* Interview Invitation */}
            <div className="bg-[#66FCF1] p-4 rounded-lg shadow-lg">
              <h4 className="text-lg text-[#1E1E1EAD] font-semibold mb-3">Interview Invitation</h4>
              <div className="grid grid-cols-2 gap-3">
                <img src="logo1.png" alt="99x" className="object-contain h-12" />
                <img src="logo2.png" alt="LSEG" className="object-contain h-12" />
                <img src="logo3.png" alt="WSO2" className="object-contain h-12" />
                <img src="logo4.png" alt="Virtusa" className="object-contain h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
