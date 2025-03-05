import React from 'react';

const StudentDocHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-white ml-8">
      <div className="flex gap-8">
        <button
          className={`pb-2 px-1 ${
            activeTab === 'monthly'
              ? 'text-teal-600 border-b-2 border-teal-600 font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly Documents
        </button>
        <button
          className={`pb-2 px-1 ${
            activeTab === 'weekly'
              ? 'text-teal-600 border-b-2 border-teal-600 font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('weekly')}
        >
          Weekly Documents
        </button>
      </div>
    </div>
  );
};

export default StudentDocHeader;