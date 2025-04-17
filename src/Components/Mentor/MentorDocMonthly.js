import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FiTrash2, FiSearch } from 'react-icons/fi';
import { FaFolder, FaFolderOpen, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { jwtDecode } from 'jwt-decode';

const MentorDocMonthly = () => {
  const { url } = useContext(StoreContext);
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [groupedReports, setGroupedReports] = useState({});
  const [filteredGroupedReports, setFilteredGroupedReports] = useState({});
  const [expandedStudents, setExpandedStudents] = useState({});
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  const userEmail = decoded.email;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.post(`${url}/api/mentor/getMonthlyReports`, {
          userEmail,
        });
        if (response.data.success) {
          setReports(response.data.data);
          
          // Group reports by student index
          const grouped = groupReportsByStudent(response.data.data);
          setGroupedReports(grouped);
          setFilteredGroupedReports(grouped);
        } else {
          console.error('Failed to fetch reports');
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, [url, userEmail]);

  // Function to group reports by student index
  const groupReportsByStudent = (reportsList) => {
    const grouped = {};
    
    reportsList.forEach(report => {
      const studentIndex = report.index;
      
      if (!grouped[studentIndex]) {
        grouped[studentIndex] = {
          studentInfo: {
            index: studentIndex,
            name: report.name,
          },
          reports: []
        };
      }
      
      grouped[studentIndex].reports.push(report);
    });
    
    return grouped;
  };

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      
      // Filter the grouped data
      const filtered = {};
      Object.keys(groupedReports).forEach(studentIndex => {
        const studentGroup = groupedReports[studentIndex];
        
        // Check if student info matches
        const studentMatches = 
          studentGroup.studentInfo.name.toLowerCase().includes(term) ||
          studentGroup.studentInfo.index.toLowerCase().includes(term);
        
        // Check if any report matches
        const reportMatches = studentGroup.reports.some(report => 
          report.month?.toLowerCase().includes(term)
        );
        
        if (studentMatches || reportMatches) {
          filtered[studentIndex] = studentGroup;
        }
      });
      
      setFilteredGroupedReports(filtered);
    } else {
      setFilteredGroupedReports(groupedReports);
    }
  }, [searchTerm, groupedReports]);

  const toggleExpand = (studentIndex) => {
    setExpandedStudents(prev => ({
      ...prev,
      [studentIndex]: !prev[studentIndex]
    }));
  };

  const handleViewPdf = (reportUrl) => {
    if (reportUrl) {
      setSelectedPdf(reportUrl);
      setShowPdfModal(true);
    }
  };

  const closeModal = () => {
    setShowPdfModal(false);
    setSelectedPdf(null);
  };

  const handleDelete = async (reportId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this report?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.post(`${url}/api/mentor/deleteMonthlyReport`, {
        userEmail: userEmail,
        reportId: reportId,
      });
  
      if (response.data.success) {
        // Remove the deleted item from reports array
        const updatedReports = reports.filter((item) => item._id !== reportId);
        setReports(updatedReports);
        
        // Re-group reports after deletion
        const regrouped = groupReportsByStudent(updatedReports);
        setGroupedReports(regrouped);
        setFilteredGroupedReports(regrouped);
      } else {
        alert("Failed to delete the report.");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("An error occurred while deleting the report.");
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/3 lg:w-1/5 max-w-sm">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search student or month"
            className="bg-gray-100 w-full pl-10 pr-4 py-2 rounded-md focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Link to="/MCreateMonthlyDocView">
          <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-10 rounded-md transition duration-300 ease-in-out flex items-center mt-4 md:mt-0">
            ADD
          </button>
        </Link>
      </div>

      {/* Desktop View - Folder Structure Table */}
      <div className="hidden md:block bg-gray-100 rounded-lg">
      <div className="max-h-[500px] overflow-y-auto rounded-lg">        
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Index</th>
              <th className="py-3 px-4">Reports</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.keys(filteredGroupedReports).map((studentIndex) => {
              const { studentInfo, reports } = filteredGroupedReports[studentIndex];
              const isExpanded = expandedStudents[studentIndex];
              
              return (
                <React.Fragment key={studentIndex}>
                  {/* Student row (folder) */}
                  <tr 
                    className="hover:bg-gray-50 cursor-pointer bg-gray-50" 
                    onClick={() => toggleExpand(studentIndex)}
                  >
                    <td className="py-4 px-4 flex items-center">
                      {isExpanded ? 
                        <FaChevronDown className="mr-2 text-gray-500" /> : 
                        <FaChevronRight className="mr-2 text-gray-500" />
                      }
                      {isExpanded ? 
                        <FaFolderOpen className="mr-2 text-yellow-500" /> : 
                        <FaFolder className="mr-2 text-yellow-500" />
                      }
                      {studentInfo.name}
                    </td>
                    <td className="py-4 px-4">{studentInfo.index}</td>
                    <td className="py-4 px-4">{reports.length} reports</td>
                    <td className="py-4 px-4"></td>
                  </tr>
                  
                  {/* Report rows (shown when expanded) */}
                  {isExpanded && reports.map((report, idx) => (
                    <tr key={`${studentIndex}-${idx}`} className="hover:bg-gray-50 text-sm text-[#0C7075]">
                      <td className="py-3 px-4 pl-12">Monthly Report</td>
                      <td className="py-3 px-4">{report.index}</td>
                      <td className="py-3 px-4">{report.month}</td>
                      <td className="py-3 px-4 flex space-x-6">
                        <AiOutlineFilePdf
                          className="text-red-500 text-xl cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewPdf(report.reportUrl);
                          }}
                          title="View Report"
                        />
                        <FiTrash2
                          className="text-gray-600 text-lg cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(report._id);
                          }}
                          title="Delete Report"
                        />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>

      {/* Mobile View - Accordion Cards */}
      <div className="md:hidden space-y-4">
        {Object.keys(filteredGroupedReports).map((studentIndex) => {
          const { studentInfo, reports } = filteredGroupedReports[studentIndex];
          const isExpanded = expandedStudents[studentIndex];
          
          return (
            <div key={studentIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Student header */}
              <div 
                className="p-4 flex items-center justify-between bg-gray-50 cursor-pointer"
                onClick={() => toggleExpand(studentIndex)}
              >
                <div className="flex items-center">
                  {isExpanded ? 
                    <FaFolderOpen className="mr-2 text-yellow-500" /> : 
                    <FaFolder className="mr-2 text-yellow-500" />
                  }
                  <div>
                    <div className="font-medium">{studentInfo.name}</div>
                    <div className="text-sm text-gray-500">{studentInfo.index}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-500">{reports.length} reports</span>
                  {isExpanded ? 
                    <FaChevronDown className="text-gray-500" /> : 
                    <FaChevronRight className="text-gray-500" />
                  }
                </div>
              </div>
              
              {/* Report list (shown when expanded) */}
              {isExpanded && (
                <div className="border-t border-gray-200">
                  {reports.map((report, idx) => (
                    <div 
                      key={`mobile-${studentIndex}-${idx}`}
                      className="p-4 border-b border-gray-100 flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium">{report.month}</div>
                        <div className="text-sm text-gray-500">Monthly Report</div>
                      </div>
                      <div className="flex space-x-4">
                        <AiOutlineFilePdf
                          className="text-red-500 text-xl cursor-pointer"
                          onClick={() => handleViewPdf(report.reportUrl)}
                          title="View Report"
                        />
                        <FiTrash2
                          className="text-gray-600 text-lg cursor-pointer"
                          onClick={() => handleDelete(report._id)}
                          title="Delete Report"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 h-5/6 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Assessment Report</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <iframe
                src={selectedPdf}
                className="w-full h-full border-0"
                title="PDF Document"
              ></iframe>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = selectedPdf;
                  link.download = 'assessment_report.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-5 rounded-md transition duration-300 ease-in-out"
              >
                Download
              </button>
              <button
                onClick={closeModal}
                className="ml-2 bg-gray-300 hover:bg-gray-400 py-2 px-5 rounded-md transition duration-300 ease-in-out"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDocMonthly;