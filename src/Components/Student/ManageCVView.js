import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { FaEdit } from "react-icons/fa";
import ManageCVUpdate from './ManageCVUpdate';
import ManageCVNewAdd from './ManageCVNewAdd';

const ManageCVView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateCVModel, setUpdateCVModel] = useState(false);
  const [showNewCVUpload, setNewCVUpload] = useState(false);

  const cvData = [
    {
      id: 1,
      number: 'CV 1',
      title: 'Software Engineering',
      file: 'software_eng_cv.pdf'
    },
    {
      id: 2,
      number: 'CV 2',
      title: 'Business Analysis',
      file: 'business_analysis_cv.pdf'
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
        <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700" onClick={() => setNewCVUpload(true)}>
          ADD NEW
        </button>
      </div>

      {/* CV Table */}
      <div className="mt-8">
        <div className="bg-gray-100 rounded-t-lg">
          <div className="grid grid-cols-4 p-4 font-medium text-gray-600">
            <div className="text-left">#</div>
            <div className="text-left">CV Title</div>
            <div className="text-left">File Upload</div>
            <div className="text-left">Action</div>
          </div>
        </div>
        <div className="border-x border-b rounded-b-lg">
          {cvData.map((cv) => (
            <div 
              key={cv.id} 
              className="grid grid-cols-4 p-4 border-t items-center hover:bg-gray-50"
            >
              <div className="text-gray-600">{cv.number}</div>
              <div className="text-gray-800">{cv.title}</div>
              <div className=''>
                {cv.file}
              </div>
              <div>
                <button className="text-gray-500" onClick={() => setUpdateCVModel(true)}>
                  <FaEdit className='ml-4'/>
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

export default ManageCVView;
