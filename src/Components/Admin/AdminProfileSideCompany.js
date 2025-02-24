import React, { useState } from 'react';
import { FaFilter } from "react-icons/fa";

const AdminProfileSideCompany = () => {
  const initialCompany = [
    { name: "NewTech Pvt", status: "Accept", date: "2024.01.02", document: "cv.pdf" },
    { name: "FinTech", status: "Reject", date: "2024.01.23", document: "cv.pdf" },
    { name: "Epic Lanka", status: "Pending", date: "2024.01.02", document: "cv.pdf" }
  ];

  const [company, setCompany] = useState(initialCompany);
  const [filters, setFilters] = useState({ Accept: false, Reject: false, Pending: false });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filterCompany = () => {
    const activeFilters = Object.keys(filters).filter(status => filters[status]);
    if (activeFilters.length === 0) {
      setCompany(initialCompany);
    } else {
      setCompany(initialCompany.filter(comp => activeFilters.includes(comp.status)));
    }
  };

  const handleFilterChange = (status) => {
    setFilters(prev => {
      const updatedFilters = { ...prev, [status]: !prev[status] };
      return updatedFilters;
    });
    setTimeout(filterCompany, 0);
  };

  const StatusBadge = ({ status }) => {
    const statusStyles = {
      Accept: "bg-green-500 text-white",
      Reject: "bg-red-500 text-white",
      Pending: "bg-yellow-500 text-white"
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm ${statusStyles[status]} font-medium`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
          <span className="text-gray-700 font-medium">All Companies</span>
          <FaFilter size={16} className="text-gray-600" />
        </div>
        {/* Mobile Filter Toggle */}
        <button 
          className="md:hidden bg-teal-600 text-white px-6 mr-4 py-2 rounded-lg"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          Filters
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 flex-shrink-0 ${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="space-y-4">
            {["Pending", "Accept", "Reject"].map(status => (
              <label key={status} className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <input
                  type="checkbox"
                  checked={filters[status]}
                  onChange={() => handleFilterChange(status)}
                  className="form-checkbox h-4 w-4 text-teal-600 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {company.map((comp, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-teal-600">{comp.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={comp.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{comp.date}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-teal-600 hover:text-teal-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileSideCompany;
