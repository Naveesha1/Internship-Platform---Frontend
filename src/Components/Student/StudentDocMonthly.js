import React, { useState } from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FiEdit2, FiSearch } from 'react-icons/fi';

const StudentDocMonthly = () => {
    const [searchText, setSearchText] = useState('');

    const documents = [
        { id: 1, week: 1, status: 'New', month: 'Jan', report: true },
        { id: 2, week: 2, status: 'Viewed', month: 'Jan', report: true },
        { id: 3, week: 3, status: 'Viewed', month: 'Jan', report: true },
    ];

    const filteredDocuments = documents.filter(doc =>
        doc.week.toString().includes(searchText) ||
        doc.status.toLowerCase().includes(searchText.toLowerCase()) ||
        doc.month.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="w-full p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6">
                <div className="relative w-full md:w-1/3 lg:w-1/5">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-100 w-full pl-10 pr-3 py-2 rounded-md focus:outline-none"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto bg-gray-100 rounded-lg">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="py-3 px-4">Week</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Month</th>
                            <th className="py-3 px-4">Report</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredDocuments.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50">
                                <td className="py-4 px-4">{doc.week}</td>
                                <td className="py-4 px-4">
                                    <span className={`px-4 py-1 rounded-full text-xs font-medium 
                                        ${doc.status === 'New' ? 'bg-teal-600 text-white' : 'bg-gray-500 text-white'}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4">{doc.month}</td>
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

export default StudentDocMonthly;
