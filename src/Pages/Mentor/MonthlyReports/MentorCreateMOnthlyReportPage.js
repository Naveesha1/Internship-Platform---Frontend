import React, { useState } from 'react';
import Navbar from '../../../Components/Navbar/Navbar';
import Sidebar from '../../../Components/Mentor/MentorSidebar';
import MonthlyDocCreate from '../../../Components/Mentor/MentorCreateMonthlyDoc'; 

const MentorCreateMOnthlyReportPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Main Navigation Bar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#45A29E]`}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 ">
          <MonthlyDocCreate/>
        </div>
      </div>
    </div>
  );
};

export default MentorCreateMOnthlyReportPage;
