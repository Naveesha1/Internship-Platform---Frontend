import React, { useState } from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FiEdit2, FiSearch } from 'react-icons/fi';

const MentorDocWeekly = () => {
    const [searchText, setSearchText] = useState('');

    const mentors = [
        { id: 1, name: "Ekanayake HGNK", index: "215036R", month: "Jan", status: "Viewed", avatar: "https://via.placeholder.com/40", report: true },
        { id: 2, name: "Ranathunga ABGT", index: "215050E", month: "Feb", status: "View", avatar: "https://via.placeholder.com/40", report: true },
        { id: 3, name: "Mudiyanse HGTY", index: "202076T", month: "Feb", status: "View", avatar: "https://via.placeholder.com/40", report: true },
    ];

    const filteredMentors = mentors.filter(mentor =>
        mentor.name.toLowerCase().includes(searchText.toLowerCase()) ||
        mentor.index.toLowerCase().includes(searchText.toLowerCase()) ||
        mentor.month.toLowerCase().includes(searchText.toLowerCase())
    );

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

            <div className="overflow-x-auto bg-gray-100 rounded-lg">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Index</th>
                            <th className="py-3 px-4">Month</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Report</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredMentors.map((mentor) => (
                            <tr key={mentor.id} className="hover:bg-gray-50 text-sm text-[#0C7075]">
                                <td className="py-4 px-4 flex items-center space-x-3">
                                    <img src={mentor.avatar} alt={mentor.name} className="w-10 h-10 rounded-full " />
                                    <span className='px-2'>{mentor.name}</span>
                                </td>
                                <td className="py-4 px-4">{mentor.index}</td>
                                <td className="py-4 px-4">{mentor.month}</td>
                                <td className="py-4 px-4">
                                    <span className={`px-4 py-1 rounded-full text-xs font-medium 
                                        ${mentor.status === 'View'
                                            ? 'bg-teal-600 text-white'
                                            : 'bg-gray-500 text-white'}`}>
                                        {mentor.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4 flex space-x-3">
                                    <a href="#" className="text-red-500 text-lg">
                                        <AiOutlineFilePdf className='ml-4' />
                                    </a>
                                    <button className="text-gray-600 text-lg">
                                        <FiEdit2 className='ml-6' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MentorDocWeekly;
