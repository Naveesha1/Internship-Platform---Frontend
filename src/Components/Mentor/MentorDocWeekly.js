import React, { useState } from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FiEdit2, FiSearch } from 'react-icons/fi';
import { FaFolder, FaFolderOpen, FaChevronRight, FaChevronDown } from 'react-icons/fa';

const MentorDocWeekly = () => {
  const [searchText, setSearchText] = useState('');
  const [expandedStudents, setExpandedStudents] = useState({});

  const reports = [
    { id: 1, name: "Ekanayake HGNK", index: "215036R", week: "1", status: "Viewed", report: true },
    { id: 2, name: "Ekanayake HGNK", index: "215036R", week: "2", status: "View", report: true },
    { id: 3, name: "Ranathunga ABGT", index: "215050E", week: "1", status: "View", report: true },
    { id: 4, name: "Mudiyanse HGTY", index: "202076T", week: "3", status: "View", report: true },
  ];

  const groupedReports = reports.reduce((acc, report) => {
    if (!acc[report.index]) {
      acc[report.index] = {
        studentInfo: {
          name: report.name,
          index: report.index
        },
        reports: []
      };
    }
    acc[report.index].reports.push(report);
    return acc;
  }, {});

  const filteredGroupedReports = Object.keys(groupedReports).reduce((acc, studentIndex) => {
    const group = groupedReports[studentIndex];
    const matches = group.studentInfo.name.toLowerCase().includes(searchText.toLowerCase()) ||
      group.studentInfo.index.toLowerCase().includes(searchText.toLowerCase()) ||
      group.reports.some(r => r.week.toLowerCase().includes(searchText.toLowerCase()));

    if (matches) acc[studentIndex] = group;
    return acc;
  }, {});

  const toggleExpand = (studentIndex) => {
    setExpandedStudents(prev => ({
      ...prev,
      [studentIndex]: !prev[studentIndex]
    }));
  };

  return (
    <div className="w-full p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6">
        <div className="relative w-full md:w-1/3 lg:w-1/5 max-w-sm">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 w-full pl-10 pr-4 py-2 rounded-md focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg overflow-x-auto">
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
                  <tr
                    className="hover:bg-gray-50 cursor-pointer bg-gray-50"
                    onClick={() => toggleExpand(studentIndex)}
                  >
                    <td className="py-4 px-4 flex items-center">
                      {isExpanded ? <FaChevronDown className="mr-2 text-gray-500" /> : <FaChevronRight className="mr-2 text-gray-500" />}
                      {isExpanded ? <FaFolderOpen className="mr-2 text-yellow-500" /> : <FaFolder className="mr-2 text-yellow-500" />}
                      {studentInfo.name}
                    </td>
                    <td className="py-4 px-4">{studentInfo.index}</td>
                    <td className="py-4 px-4">{reports.length} reports</td>
                    <td className="py-4 px-4"></td>
                  </tr>

                  {isExpanded && reports.map((report, idx) => (
                    <tr key={`${studentIndex}-${idx}`} className="hover:bg-gray-50 text-sm text-[#0C7075]">
                      <td className="py-3 px-4 pl-12">Weekly Report</td>
                      <td className="py-3 px-4">{report.index}</td>
                      <td className="py-3 px-4">Week {report.week}</td>
                      <td className="py-3 px-4 flex space-x-6">
                        <AiOutlineFilePdf className="text-red-500 text-xl cursor-pointer" title="View Report" />
                        <FiEdit2 className="text-gray-600 text-lg cursor-pointer" title="Edit Report" />
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
  );
};

export default MentorDocWeekly;
