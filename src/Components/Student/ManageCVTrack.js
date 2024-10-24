import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { FaEdit } from "react-icons/fa";
import ManageCVUpdate from './ManageCVUpdate';
import ManageCVNewAdd from './ManageCVNewAdd';

const ManageCVTrack = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateCVModel, setUpdateCVModel] = useState(false);
  const [showNewCVUpload, setNewCVUpload] = useState(false);

  const cvData = [
    {
      Company: '99x',
      Position: 'Software Engineering',
      Date: '2024.05.12' ,
      Status: 'Reject'
    },
    {
      Company: '99x',
      Position:'Business Analysis',
      Date: '2024.12.04' ,
      Status: 'Accept'
    }
  ];

  return (
    <div className="p-4 bg-white px-6">
      {/* Search and Add New Section */}
      <div className="mt-10 flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search cv"
            className="placeholder-slate-400 pl-10 pr-4 py-2 border-cyan-600 border rounded-md w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

      </div>

      {/* CV Table */}
      <div className="mt-8">
        <div className="bg-gray-100 rounded-t-lg">
          <div className="grid grid-cols-4 p-4 font-medium text-gray-600">
            <div className="text-left">Company</div>
            <div className="text-left">Position</div>
            <div className="text-left">Date</div>
            <div className="text-left">Status</div>
          </div>
        </div>
        <div className="border-x border-b rounded-b-lg">
          {cvData.map((cv) => (
            <div 
              key={cv.id} 
              className="grid grid-cols-4 p-4 border-t items-center hover:bg-gray-50"
            >
              <div className="text-gray-600">{cv.Company}</div>
              <div className="text-gray-800">{cv.Position}</div>
              <div className=''>
                {cv.Date}
              </div>
              <div>
                <button className="text-gray-500" >
                <div className='bg-cyan-100 px-4 py-1 rounded-3xl'>
                {cv.Status}   </div> 
                </button>
              </div>
            </div>
          ))}
        </div>
        {showUpdateCVModel && <ManageCVUpdate onClose={() => setUpdateCVModel(false)} />}
        {showNewCVUpload && <ManageCVNewAdd onClose={() => setNewCVUpload(false)} />}
      </div>
    </div>
  );
};

export default ManageCVTrack;
