import React, { useState } from 'react';
import { FaFilter } from "react-icons/fa";

const AdminProfileSideStudent = () => {
  const initialStudents = [
    { name: "H.K.G.N.K.Ekanayake", status: "Accept", degree: "ITM", date: "2024.01.02", document: "cv.pdf" },
    { name: "I.P.B.M.Iddamalgoda", status: "Reject", degree: "IT", date: "2024.01.23", document: "cv.pdf" },
    { name: "A.B.C.D.Heelibathdeniya", status: "Pending", degree: "ITM", date: "2024.01.02", document: "cv.pdf" }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [filters, setFilters] = useState({
    pending: { IT: false, ITM: false, AI: false },
    accept: { IT: false, ITM: false, AI: false },
    reject: { IT: false, ITM: false, AI: false }
  });
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filterStudents = () => {
    const hasActiveFilters = Object.values(filters).some(categoryFilters =>
      Object.values(categoryFilters).some(value => value)
    );

    if (!hasActiveFilters) {
      setStudents(initialStudents);
      return;
    }

    const filteredStudents = initialStudents.filter(student => {
      return (
        (filters.pending[student.degree] && student.status === "Pending") ||
        (filters.accept[student.degree] && student.status === "Accept") ||
        (filters.reject[student.degree] && student.status === "Reject")
      );
    });

    setStudents(filteredStudents);
  };

  const handleFilterChange = (category, degree) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [degree]: !prev[category][degree]
      }
    }));
    setTimeout(filterStudents, 0);
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
          <span className="text-gray-700 font-medium">All Students</span>
          <FaFilter size={13} className="text-gray-600" />
        </div>
        
        {/* Mobile Filter Toggle */}
        <button 
          className="md:hidden bg-teal-600 text-white px-8 py-2 mr-12 rounded-lg"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 flex-shrink-0 ${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="space-y-4">
            {["Pending", "Accept", "Reject"].map(category => (
              <div key={category} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-medium mb-3 text-gray-700">{category}</h3>
                <div className="space-y-2">
                  {["IT", "ITM", "AI"].map(degree => (
                    <label key={`${category.toLowerCase()}-${degree}`} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters[category.toLowerCase()][degree]}
                        onChange={() => handleFilterChange(category.toLowerCase(), degree)}
                        className="form-checkbox h-4 w-4 text-teal-600 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">{degree}</span>
                    </label>
                  ))}
                </div>
              </div>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {students.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-teal-600">{student.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={student.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{student.degree}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{student.date}</span>
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

export default AdminProfileSideStudent;