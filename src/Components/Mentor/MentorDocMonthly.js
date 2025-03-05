import React, { useState } from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FiTrash2, FiSearch } from 'react-icons/fi';

const MentorDocMonthly = () => {
    const initialData = [
        { index: '215036R', name: 'Ekanayake HGNK', avatar: '/api/placeholder/40/40', month: 'Jan' },
        { index: '215050E', name: 'Ranathilapa ABGT', avatar: '/api/placeholder/40/40', month: 'Feb' },
        { index: '202076T', name: 'Mudiyanse HGTY', avatar: '/api/placeholder/40/40', month: 'Feb' },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState(initialData);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setData(
            initialData.filter(
                (item) =>
                    item.name.toLowerCase().includes(term) ||
                    item.month.toLowerCase().includes(term)
            )
        );
    };

    return (
        <div className="w-full p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6">
                {/* Search Bar */}
                <div className="relative w-full md:w-1/3 lg:w-1/5 max-w-sm">
                    <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-gray-100 w-full pl-10 pr-4 py-2 rounded-md focus:outline-none"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-10 rounded-md transition duration-300 ease-in-out flex items-center">
                    ADD
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-gray-100 rounded-lg">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-200 text-left ">
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Index</th>
                            <th className="py-3 px-4">Month</th>
                            <th className="py-3 px-4">Report</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-sm text-[#0C7075]">
                                <td className="py-4 px-4 flex items-center space-x-3">
                                    <img src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full" />
                                    <span className='px-2'>{item.name}</span>
                                </td>
                                <td className="py-4 px-4">{item.index}</td>
                                <td className="py-4 px-4">{item.month}</td>
                                <td className="py-4 px-4 flex space-x-8">
                                    <AiOutlineFilePdf className="text-red-500 text-lg cursor-pointer ml-4" />
                                    <FiTrash2 className="text-gray-600 text-lg cursor-pointer " />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MentorDocMonthly;
