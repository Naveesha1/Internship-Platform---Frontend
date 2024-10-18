import React,{ useState } from "react";
import Sidebar from '../../Components/Student/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';


const Calender = () => {
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
            isSidebarOpen ? "w-64" : "w-20" // Sidebar width based on state
          } bg-[#45A29E]`}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area */}
        <div className={`flex-1 p-6 transition-all duration-300`}
        >
            contents of calender appear here
        </div>

      </div>
    </div>
  );
};

export default Calender;
