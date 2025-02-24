// AdminDocumentPage.js
import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Admin/ASidebar";
import AdminDocHeader from "../../Components/Admin/AdminDocHeader";
import AdminDocMonthly from "../../Components/Admin/AdminDocMonthly";
import AdminDocWeekly from "../../Components/Admin/AdminDocWeekly";

const AdminDocumentPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("monthly");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col flex-1 ml-auto w-full">
      <Navbar />

      <div className="flex h-screen w-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-[#45A29E]`}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 mt-16 p-8">
          <AdminDocHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "monthly" && <AdminDocMonthly />}
          {activeTab === "weekly" && <AdminDocWeekly />}
        </div>
      </div>
    </div>
  );
};

export default AdminDocumentPage;
