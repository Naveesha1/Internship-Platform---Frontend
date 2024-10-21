import React ,{useState} from "react";
import Internship from '../../Components/Student/Internship'; 
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Student/Sidebar";

const InternshipPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-20'
          } bg-[#45A29E]`}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        <Internship />
      </div>
    </div>
  );
};

export default InternshipPage;