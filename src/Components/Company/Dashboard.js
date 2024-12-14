import React from 'react';
import application from '../../Images/Company/ComApplication.png';
import employee from '../../Images/Company/ComEmployee.png';
import vacancies from '../../Images/Company/ComVacanci.png';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-left mt-12 ml-12 mr-12">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-[#45A29E]">
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={application} alt='' className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">20</h3>
          <p className="pl-2 font-bold text-sm pt-3">All Applications</p>
        </div>
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={employee} alt='' className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">12</h3>
          <p className="pl-2 font-bold text-sm pt-3">Intern Employee</p>
        </div>
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={vacancies} alt='' className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">08</h3>
          <p className="pl-2 font-bold text-sm pt-3">Available Vacancies</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mt-8 w-full max-w-3xl">
        <h3 className="text-2xl font-bold text-teal-500 mb-4">Analytics</h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-teal-500 rounded-full mr-2"></div>
            <p className="text-gray-400">Views on post</p>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
            <p className="text-gray-400">Application for post</p>
          </div>
        </div>
        <div className="w-full h-48 bg-gray-700 rounded-lg mt-4"></div>
      </div>
    </div>
  );
};

export default Dashboard;


