import React from 'react';

const InternshipHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-white ml-10  ">
      <div className="flex gap-8">
        <button
          className={`pb-2 px-1 ${
            activeTab === 'manage'
              ? 'text-teal-600 border-b-2 border-teal-600 font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('manage')}
        >
          All Internship
        </button>
        <button
          className={`pb-2 px-1 ${
            activeTab === 'track'
              ? 'text-teal-600 border-b-2 border-teal-600 font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('track')}
        >
          Create Internship
        </button>
      </div>
    </div>
  );
};

export default InternshipHeader;
