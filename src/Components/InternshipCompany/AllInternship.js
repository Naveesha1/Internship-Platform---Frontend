import React, { useEffect, useState, useContext } from "react";
import {
  FaFilter,
  FaArrowCircleRight,
  FaArrowCircleLeft,
} from "react-icons/fa";
import CompanyInternshipCard from "../../Components/Company/companyInternshipCard";
import { IoMdArrowDropdown } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext.js";

const AllInternship = () => {
  const { url } = useContext(StoreContext);

  const [showAllFilters, setShowAllFilters] = useState(false);
  const [internships, setInternships] = useState([]);
  const [filteredInternships, setFilteredInternships] = useState([]);
  const [searchCompany, setSearchCompany] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const internshipsPerPage = 8;

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;
  const registeredEmail = decodedToken.email;

  const toggleAllFilters = () => setShowAllFilters(!showAllFilters);

  // Fetching all internships
  useEffect(() => {
    const getCompanySpecificInternships = async () => {
      const response = await axios.post(`${url}/api/company/allInternships`, {
        registeredEmail,
      });
      if (response.data.success) {
        setInternships(response.data.data);
        setFilteredInternships(response.data.data);
      } else {
        console.log(response.data.message);
      }
    };
    getCompanySpecificInternships();
  }, [userId]);

  // Filtering internships
  useEffect(() => {
    const filtered = internships.filter(
      (internship) =>
        internship.companyName
          .toLowerCase()
          .includes(searchCompany.toLowerCase()) &&
        internship.position.toLowerCase().includes(searchRole.toLowerCase())
    );
    setFilteredInternships(filtered);
  }, [searchCompany, searchRole, internships]);

  const startIndex = currentPage * internshipsPerPage;
  const currentInternships = filteredInternships.slice(
    startIndex,
    startIndex + internshipsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (startIndex + internshipsPerPage < internships.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-6 flex-1 overflow-y-auto">
        {/* All Internships Section */}
        <div className="flex justify-between items-center font-semibold mt-6 mb-4">
          <div className="flex items-center">
            All Internships
            <FaFilter className="ml-4 mt-1" size={12} />
            <IoMdArrowDropdown
              className="mt-1 cursor-pointer"
              onClick={toggleAllFilters}
            />
          </div>
          <div>
            <button className="mr-2" onClick={handlePrevPage}>
              <FaArrowCircleLeft color="#45A29E" />
            </button>
            <button onClick={handleNextPage}>
              <FaArrowCircleRight color="#45A29E" />
            </button>
          </div>
        </div>

        {showAllFilters && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 w-72">
            <input
              type="text"
              placeholder="Company"
              className="w-full p-2 border rounded-md mb-2"
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
            />
            <input
              type="text"
              placeholder="Role"
              className="w-full p-2 border rounded-md"
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentInternships.map((internship, index) => (
            <CompanyInternshipCard key={index} internships={internship} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllInternship;
