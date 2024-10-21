import React, { useState } from "react";
import { FaFilter, FaArrowCircleRight, FaArrowCircleLeft,FaSearch } from "react-icons/fa";
import InternshipCard from '../../Components/Student/InternshipCard';
import { IoMdArrowDropdown } from "react-icons/io";


const Internship = () => {

  const[showSuggestionFilters, setShowSuggestionFilters] = useState(false);
  const[showAllFilters, setShowAllFilters] = useState(false);

  const toggleSuggestFilters = () => {
    setShowSuggestionFilters(!showSuggestionFilters);
  };

  const toggleAllFilters = () => {
    setShowAllFilters(!showAllFilters);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-6 flex-1 overflow-y-auto">
        {/* Suggestions Section */}
        <div className="flex justify-between items-center font-semibold mt-6 mb-4">
          <div className="flex items-center">
            Suggestions for you
            <FaFilter className="ml-4 mt-1" size={12}/> 
            <IoMdArrowDropdown className="mt-1 cursor-pointer" onClick={toggleSuggestFilters}/>

          </div>
          <div>
            <button className="mr-2">
              <FaArrowCircleLeft color="#45A29E" />
            </button>
            <button>
              <FaArrowCircleRight color="#45A29E" />
            </button>
          </div>
        </div>
        
        {/* conditionally render filters */}
        {showSuggestionFilters && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 w-72">
            <div className="grid grid-cols-1 gap-4">

            <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Company"
                  className="w-full pl-10 p-2 border rounded-md"
                />
              </div>

              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Role"
                  className="w-full pl-10 p-2 border rounded-md"
                />
              </div>

              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Type"
                  className="w-full pl-10 p-2 border rounded-md"
                />
              </div>

            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, index) => (
            <InternshipCard key={index} />
          ))}
        </div>

        {/* All Internships Section */}
        <div className="flex justify-between items-center font-semibold mt-6 mb-4">
          <div className="flex items-center">
            All Internships
            <FaFilter className="ml-4 mt-1" size={12} /> 
            <IoMdArrowDropdown className="mt-1 cursor-pointer" onClick={toggleAllFilters}/>

          </div>
          <div>
            <button className="mr-2">
              <FaArrowCircleLeft color="#45A29E" />
            </button>
            <button>
              <FaArrowCircleRight color="#45A29E" />
            </button>
          </div>
        </div>

        {/* conditionally render filters */}
        {    showAllFilters && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 w-72">
          <div className="grid grid-cols-1 gap-4">

          <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Company"
                className="w-full pl-10 p-2 border rounded-md"
              />
            </div>

            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Role"
                className="w-full pl-10 p-2 border rounded-md"
              />
            </div>

            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Type"
                className="w-full pl-10 p-2 border rounded-md"
              />
            </div>

          </div>
        </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <InternshipCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Internship;
