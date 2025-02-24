import React, { useState } from 'react';
import { Search } from 'lucide-react';

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
    },
    {
      studentId: '215036R',
      studentName: 'Ranathilapa ABGT',
      studentImage: '/api/placeholder/40/40',
      mentorName: 'Mudiyanse HGTY',
      mentorImage: '/api/placeholder/40/40',
      mentorEmail: 'Mudi@gmail.com',
      company: '99x',
      degree: 'IT',
      month: 'Jan',
      week: '3',
    },
    {
      studentId: '215036R',
      studentName: 'Mudiyanse HGTY',
      studentImage: '/api/placeholder/40/40',
      mentorName: 'Ranathilage ABGT',
      mentorImage: '/api/placeholder/40/40',
      mentorEmail: 'A23ratu@gmail.com',
      company: 'WSO2',
      degree: 'ITM',
      month: 'Feb',
      week: '4',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(initialData);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredData = initialData.filter(item =>
      item.studentName.toLowerCase().includes(term) ||
      item.mentorName.toLowerCase().includes(term) ||
      item.company.toLowerCase().includes(term) ||
      item.degree.toLowerCase().includes(term) ||
      item.month.toLowerCase().includes(term) ||
      item.week.includes(term)
    );

    setData(filteredData);
  };

  return (
    <div className="flex-1 p-6">
      {/* Search Bar */}
      <div className="relative mb-6 mt-8">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-96 pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Table View for Large Screens */}
      <div className="hidden md:block overflow-x-auto bg-gray-200 rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="px-6 py-3">Students</th>
              <th className="px-6 py-3">Mentor</th>
              <th className="px-6 py-3">Company</th>
              <th className="px-6 py-3">Degree</th>
              <th className="px-6 py-3">Month</th>
              <th className="px-6 py-3">Week</th>
              <th className="px-6 py-3">Document</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 flex items-center">
                  <img src={item.studentImage} alt={item.studentName} className="h-8 w-8 rounded-full" />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{item.studentName}</div>
                    <div className="text-sm text-gray-500">{item.studentId}</div>
                  </div>
                </td>
                <td className="px-6 py-4">{item.mentorName}</td>
                <td className="px-6 py-4">{item.company}</td>
                <td className="px-6 py-4">{item.degree}</td>
                <td className="px-6 py-4">{item.month}</td>
                <td className="px-6 py-4">{item.week}</td>
                <td className="px-6 py-4">
                  <button className="text-red-600 hover:text-red-800">📄</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card View for Small Screens */}
      <div className="md:hidden overflow-y-auto max-h-[500px] space-y-4">
        {data.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <img src={item.studentImage} alt={item.studentName} className="h-10 w-10 rounded-full" />
              <div>
                <div className="text-lg font-semibold">{item.studentName}</div>
                <div className="text-sm text-gray-500">{item.studentId}</div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-700">Mentor: {item.mentorName}</div>
            <div className="text-sm text-gray-700">Company: {item.company}</div>
            <div className="text-sm text-gray-700">Degree: {item.degree}</div>
            <div className="text-sm text-gray-700">Month: {item.month}</div>
            <div className="text-sm text-gray-700">Week: {item.week}</div>
            <button className="mt-2 text-red-600 hover:text-red-800">📄 View Document</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDocWeekly;
