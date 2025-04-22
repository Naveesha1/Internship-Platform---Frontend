import React, { useState, useEffect, useContext } from 'react';
import { Search, ChevronDown, ChevronRight, Folder, FileText } from 'lucide-react';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';

const AdminDocWeekly = () => {
    const { url } = useContext(StoreContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [expandedStudents, setExpandedStudents] = useState({});
  const [groupedData, setGroupedData] = useState({});
  const [students,setStudents] = useState([]);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  

  useEffect(()=>{
    const getStudents = async () => {
      try {
        const response = await axios.get(`${url}/api/admin/getWeeklyReportsAvailableStudents`);
        if (response.data.success) {
          setStudents(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getStudents();
  },[]);
  // Group data by studentId
  useEffect(() => {
    const groupByStudent = (data) => {
      const grouped = {};
      data.forEach(item => {
        if (!grouped[item.registrationNumber]) {
          grouped[item.registrationNumber] = {
            studentInfo: {
              studentId: item.registrationNumber,
              studentName: item.fullName,
              studentImage: item.profileImageUrl,
              company: item.company,
              degree: item.degree,
            },
            reports: []
          };
        }
        grouped[item.registrationNumber].reports.push(item.weekly);
      });
      return grouped;
    };

    const grouped = groupByStudent(students);
    setGroupedData(grouped);
    setFilteredData(grouped);
  }, [students]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setFilteredData(groupedData);
      return;
    }

    // Filter the grouped data based on search term
    const filtered = {};
    Object.keys(groupedData).forEach(studentId => {
      const studentGroup = groupedData[studentId];
      
      // Check if student info matches search
      const studentInfoMatches = 
        studentGroup.studentInfo.studentName.toLowerCase().includes(term) ||
        studentGroup.studentInfo.studentId.toLowerCase().includes(term) ||
        studentGroup.studentInfo.company.toLowerCase().includes(term) ||
        studentGroup.studentInfo.degree.toLowerCase().includes(term);
      
      // Check if any report matches search
      const reportMatches = studentGroup.reports.some(report => 
        report.month.toLowerCase().includes(term) ||
        report.week.includes(term) ||
        report.mentorName.toLowerCase().includes(term)
      );

      if (studentInfoMatches || reportMatches) {
        filtered[studentId] = studentGroup;
      }
    });

    setFilteredData(filtered);
  };

  const toggleExpand = (studentId) => {
    setExpandedStudents(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
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

  return (
    <div className="flex-1 p-6">
      {/* Search Bar */}
      <div className="relative mb-6 mt-8">
        <input
          type="text"
          placeholder="Search student, mentor, company, degree, month or week..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-96 pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-600 text-sm">
              <th className="px-6 py-3">Student</th>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Degree</th>
              <th className="px-6 py-3">Reports</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.keys(filteredData).map(studentId => {
              const { studentInfo, reports } = filteredData[studentId];
              const isExpanded = expandedStudents[studentId];
              return (
                <>
                {reports.length>0 && (
                <React.Fragment key={studentId}>
                  {/* Student row */}
                  <tr className="bg-gray-50 hover:bg-gray-100">
                    <td className="px-6 py-4 flex items-center">
                      <button 
                        onClick={() => toggleExpand(studentId)}
                        className="mr-2 focus:outline-none"
                      >
                        {isExpanded ? 
                          <ChevronDown className="h-5 w-5 text-gray-500" /> :
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        }
                      </button>
                      <img src={studentInfo.studentImage} alt={studentInfo.studentName} className="h-8 w-8 rounded-full" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{studentInfo.studentName}</div>
                        <div className="text-sm text-gray-500">{studentInfo.studentId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{studentInfo.company}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{studentInfo.degree}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <Folder className="h-5 w-5 text-blue-500 inline-block mr-2" />
                      <span>{reports[0].length} reports</span>
                    </td>
                  </tr>
                  
                  {/* Reports rows (visible when expanded) */}
                  {isExpanded && reports.map((weeklyReports, outerIndex) =>
                    weeklyReports.map((report, index) => (
                      <tr key={`${studentId}-${report._id || outerIndex + '-' + index}`} className="hover:bg-gray-50">
                        <td className="px-6 py-3 pl-16 text-sm text-gray-500">
                          <FileText className="h-4 w-4 text-gray-400 inline-block mr-2" />
                          Week No:{report.weekNo}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-500">
                          {report.mentorName || "N/A"}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-500"></td>
                        <td className="px-6 py-3 text-sm">
                          <button
                            onClick={() => handleViewPdf(report.reportUrl)}
                            className="text-blue-600 hover:text-blue-800 mr-3"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}

                </React.Fragment>
                )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {Object.keys(filteredData).map(studentId => {
          const { studentInfo, reports } = filteredData[studentId];
          const isExpanded = expandedStudents[studentId];
          
          return (
            <div key={studentId} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Student card header */}
              <div 
                className="p-4 flex items-center justify-between bg-gray-50"
                onClick={() => toggleExpand(studentId)}
              >
                <div className="flex items-center">
                  <img src={studentInfo.studentImage} alt={studentInfo.studentName} className="h-10 w-10 rounded-full" />
                  <div className="ml-3">
                    <div className="font-medium">{studentInfo.studentName}</div>
                    <div className="text-sm text-gray-500">{studentInfo.studentId}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-500">{reports[0].length} reports</span>
                  {isExpanded ? 
                    <ChevronDown className="h-5 w-5 text-gray-500" /> :
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  }
                </div>
              </div>
              
              {/* Student details */}
              <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                <div className="text-sm text-gray-700">Company: {studentInfo.company}</div>
                <div className="text-sm text-gray-700">Degree: {studentInfo.degree}</div>
              </div>
              
              {/* Reports list (visible when expanded) */}
              {isExpanded && (
                <div className="border-t border-gray-100">
                  {reports.map((weeklyReports) => (
                    weeklyReports.map((report) => (

                    <div 
                      key={`mobile-${studentId}-${report.reportId}`} 
                      className="px-4 py-3 border-b border-gray-100 flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium text-sm">Week No:{report.weekNo}</div>
                        <div className="text-xs text-gray-500">Mentor: {report.mentorName}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                            onClick={() => handleViewPdf(report.reportUrl)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            View
                          </button>
                      </div>
                    </div>
                    ))
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

export default AdminDocWeekly;