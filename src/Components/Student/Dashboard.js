import React, { useState } from 'react';
import chance_img from '../../Images/dashboard/chance.png';
import company_img from '../../Images/dashboard/company.png';
import application_img from '../../Images/dashboard/application.png';
import virtusa from '../../Images/dashboard/virtusa.png';
import x99 from '../../Images/dashboard/99x.png';
import lseg from '../../Images/dashboard/lseg.png';
import wso2 from '../../Images/dashboard/wso2.png';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar open/close state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle state
  };

  return (
    <div className="flex flex-col flex-1 p-6 transition-all duration-300 py-16">
      
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-[#45A29E]">
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={application_img} alt='' className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">20</h3>
          <p className="pl-2 font-bold text-sm pt-3">Submitted Applications</p>
        </div>
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={company_img} alt='' className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">12</h3>
          <p className="pl-2 font-bold text-sm pt-3">Response Companies</p>
        </div>
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={chance_img} alt='' className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">08</h3>
          <p className="pl-2 font-bold text-sm pt-3">New Chances</p>
        </div>
      </div>

      {/* Separate Wrapper for Recommendations and Invitations Section */}
      <div className="mt-6">
        
        {/* Internship Recommendations and Interview Invitations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          
          {/* Internship Recommendations */}
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
              <button className='px-4 py-4 bg-white rounded-lg place-items-center'>
                <img src={x99} alt="99x" className="object-contain" />
              </button>
              <button className='px-4 py-4 bg-white rounded-lg'>
                <img src={lseg} alt="LSEG" className="object-contain" />
              </button>
              <button className='px-4 py-4 bg-white rounded-lg'>
                <img src={wso2} alt="WSO2" className="object-contain" />
              </button>
              <button className='px-4 py-4 bg-white rounded-lg'>
                <img src={virtusa} alt="Virtusa" className="object-contain" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
