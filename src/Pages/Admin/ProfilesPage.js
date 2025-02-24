import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Admin/ASidebar";
import AdminProfile from "../../Components/Admin/AdminProfile";
import AdminProfileSideStudent from "../../Components/Admin/AdminProfileSideStudent";
import AdminProfileSideCompany from "../../Components/Admin/AdminProfileSideCompany";
import AdminProfileHeader from "../../Components/Admin/AdminProfileHeader";

const ProfilePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar state
  const [activeTab, setActiveTab] = useState("admin");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar open/close
  };

  return (
    <div className="flex flex-col flex-1 ml-auto w-full">
      {/* Main Navigation Bar */}
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

        <div className="flex-1 mt-16">
          <AdminProfileHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {activeTab === "admin" && <AdminProfile />}
          {activeTab === "students" && <AdminProfileSideStudent />}
          {activeTab === "company" && <AdminProfileSideCompany />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
