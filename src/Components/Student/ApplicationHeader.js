import React from 'react';

const ApplicationHeader = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-white ml-4">
      <div className="flex gap-8">
        <button
          className={`pb-2 px-1 ${
            activeTab === 'manage'
              ? 'text-teal-600 border-b-2 border-teal-600 font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('manage')}
        >
          Manage CV
        </button>
        <button
          className={`pb-2 px-1 ${
            activeTab === 'track'
              ? 'text-teal-600 border-b-2 border-teal-600 font-medium'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('track')}
        >
          Track CV
        </button>
      </div>
    </div>
  );
};

export default ApplicationHeader;
