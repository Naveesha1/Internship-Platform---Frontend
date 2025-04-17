import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, Folder, FileText } from 'lucide-react';

const AdminDocWeekly = () => {
  const initialData = [
    {
      studentId: '215036R',
      studentName: 'Ekanayake HGNK',
      studentImage: '/api/placeholder/40/40',
      mentorName: 'Ranathilage ABGT',
      mentorImage: '/api/placeholder/40/40',
      mentorEmail: 'Rani@gmail.com',
      company: 'LSEG',
      degree: 'ITM',
      month: 'Jan',
      week: '3',
      reportId: '1001',
    },
    {
      studentId: '215036R',
      studentName: 'Ekanayake HGNK',
      studentImage: '/api/placeholder/40/40',
      mentorName: 'Ranathilage ABGT',
      mentorImage: '/api/placeholder/40/40',
      mentorEmail: 'Rani@gmail.com',
      company: 'LSEG',
      degree: 'ITM',
      month: 'Feb',
      week: '1',
      reportId: '1002',
    },
    {
      studentId: '215037R',
      studentName: 'Ranathilapa ABGT',
      studentImage: '/api/placeholder/40/40',
      mentorName: 'Mudiyanse HGTY',
      mentorImage: '/api/placeholder/40/40',
      mentorEmail: 'Mudi@gmail.com',
      company: '99x',
      degree: 'IT',
      month: 'Jan',
      week: '3',
      reportId: '1003',
    },
    {
      studentId: '215038R',
      studentName: 'Mudiyanse HGTY',
      studentImage: '/api/placeholder/40/40',
      mentorName: 'Ranathilage ABGT',
      mentorImage: '/api/placeholder/40/40',
      mentorEmail: 'A23ratu@gmail.com',
      company: 'WSO2',
      degree: 'ITM',
      month: 'Feb',
      week: '4',
      reportId: '1004',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [expandedStudents, setExpandedStudents] = useState({});
  const [groupedData, setGroupedData] = useState({});

  // Group data by studentId
  useEffect(() => {
    const groupByStudent = (data) => {
      const grouped = {};
      data.forEach(item => {
        if (!grouped[item.studentId]) {
          grouped[item.studentId] = {
            studentInfo: {
              studentId: item.studentId,
              studentName: item.studentName,
              studentImage: item.studentImage,
              company: item.company,
              degree: item.degree,
            },
            reports: []
          };
        }
        grouped[item.studentId].reports.push(item);
      });
      return grouped;
    };

    const grouped = groupByStudent(initialData);
    setGroupedData(grouped);
    setFilteredData(grouped);
  }, []);

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
                      <span>{reports.length} reports</span>
                    </td>
                  </tr>
                  
                  {/* Reports rows (visible when expanded) */}
                  {isExpanded && reports.map((report, index) => (
                    <tr key={`${studentId}-${report.reportId}`} className="hover:bg-gray-50">
                      <td className="px-6 py-3 pl-16 text-sm text-gray-500">
                        <FileText className="h-4 w-4 text-gray-400 inline-block mr-2" />
                        Week {report.week} ({report.month})
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500">
                        {report.mentorName}
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-500"></td>
                      <td className="px-6 py-3 text-sm">
                        <button className="text-blue-600 hover:text-blue-800 mr-3">
                          View
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
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
                  <span className="mr-2 text-sm text-gray-500">{reports.length} reports</span>
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
                  {reports.map(report => (
                    <div 
                      key={`mobile-${studentId}-${report.reportId}`} 
                      className="px-4 py-3 border-b border-gray-100 flex justify-between items-center"
                    >
                      <div>
                        <div className="font-medium text-sm">Week {report.week} ({report.month})</div>
                        <div className="text-xs text-gray-500">Mentor: {report.mentorName}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          View
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDocWeekly;