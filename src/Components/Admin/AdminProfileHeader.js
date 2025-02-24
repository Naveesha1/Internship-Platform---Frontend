// AdminHeader.js
import React from 'react';

const AdminProfileHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-white ml-8">
      <div className="flex gap-8">
        <button
          className={`pb-2 px-1 ${
            activeTab === 'admin'
              ? 'text-teal-600 border-b-2 border-teal-600 font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('admin')}
        >
          Admin
        </button>
        <button
          className={`pb-2 px-1 ${
            activeTab === 'students'
              ? 'text-teal-600 border-b-2 border-teal-600 font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button
          className={`pb-2 px-1 ${
            activeTab === 'company'
              ? 'text-teal-600 border-b-2 border-teal-600 font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('company')}
        >
          Company
        </button>
      </div>
    </div>
  );
};

export default AdminProfileHeader;