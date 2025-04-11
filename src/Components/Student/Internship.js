import React, { useEffect, useState, useContext } from "react";
import {
  FaFilter,
  FaArrowCircleRight,
  FaArrowCircleLeft,
  FaSearch,
} from "react-icons/fa";
import InternshipCard from "../../Components/Student/InternshipCard";
import { IoMdArrowDropdown } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext.js";

const Internship = () => {
  const { url } = useContext(StoreContext);

  const [showSuggestionFilters, setShowSuggestionFilters] = useState(false);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [internships, setInternships] = useState([]);
  const [suggestInternships, setSuggestInternships] = useState([]);

  const [filteredInternships, setFilteredInternships] = useState([]);
  const [filteredSuggestInternships, setFilteredSuggestInternships] = useState(
    []
  );

  const [searchCompany, setSearchCompany] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchSuggestCompany, setSearchSuggestCompany] = useState("");
  const [searchSuggestRole, setSearchSuggestRole] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [currentSuggestionsPage, setCurrentSuggestionsPage] = useState(0);
  const internshipsPerPage = 4;

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;
  const registeredEmail = decodedToken.email;

  const toggleSuggestFilters = () =>
    setShowSuggestionFilters(!showSuggestionFilters);
  const toggleAllFilters = () => setShowAllFilters(!showAllFilters);

  useEffect(() => {
    const getAllInternships = async () => {
      const response = await axios.get(`${url}/api/student/allInternships`);
      if (response.data.success) {
        console.log("data",response.data);
        setInternships(response.data.data);
        setFilteredInternships(response.data.data); // Initially set filtered data to full data
      } else {
        console.log(response.data.message);
      }
    };
    getAllInternships();
  }, [userId]);

  useEffect(() => {
    const getSuggestInternships = async () => {
      const response = await axios.post(`${url}/api/student/getMatchingInternshipsController`, {
        registeredEmail,
      });
      if (response.data.success) {
        console.log("Suggested Internships: ", response.data.data);
        setSuggestInternships(response.data.data);
        setFilteredSuggestInternships(response.data.data);
      } else {
        console.log(response.data.message);
      }
    };
    getSuggestInternships();
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

  // Filtering suggested internships
  useEffect(() => {
    const filtered = suggestInternships.filter(
      (internship) =>
        internship.companyName
          .toLowerCase()
          .includes(searchSuggestCompany.toLowerCase()) &&
        internship.position
          .toLowerCase()
          .includes(searchSuggestRole.toLowerCase())
    );
    setFilteredSuggestInternships(filtered);
  }, [searchSuggestCompany, searchSuggestRole, suggestInternships]);

  const startIndex = currentPage * internshipsPerPage;
  const startSuggestionIndex = currentSuggestionsPage * internshipsPerPage;
  const currentInternships = filteredInternships.slice(
    startIndex,
    startIndex + internshipsPerPage
  );
  const suggestedInternships = filteredSuggestInternships.slice(
    startSuggestionIndex,
    startSuggestionIndex + internshipsPerPage
  );

  // Page navigation functions
  const handlePrevPageSuggestions = () => {
    if (currentSuggestionsPage > 0) {
      setCurrentSuggestionsPage((previousPage) => previousPage - 1);
    }
  };

  const handleNextPageSuggestions = () => {
    if (
      startSuggestionIndex + internshipsPerPage <
      suggestedInternships.length
    ) {
      setCurrentSuggestionsPage((previousPage) => previousPage + 1);
    }
  };

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
        {/* Suggestions Section */}
        <div className="flex justify-between items-center font-semibold mt-6 mb-4">
          <div className="flex items-center">
            Suggestions for you
            <FaFilter className="ml-4 mt-1" size={12} />
            <IoMdArrowDropdown
              className="mt-1 cursor-pointer"
              onClick={toggleSuggestFilters}
            />
          </div>
          <div>
            <button className="mr-2" onClick={handlePrevPageSuggestions}>
              <FaArrowCircleLeft color="#45A29E" />
            </button>
            <button onClick={handleNextPageSuggestions}>
              <FaArrowCircleRight color="#45A29E" />
            </button>
          </div>
        </div>

        {showSuggestionFilters && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 w-72">
            <input
              type="text"
              placeholder="Company"
              className="w-full p-2 border rounded-md mb-2"
              value={searchSuggestCompany}
              onChange={(e) => setSearchSuggestCompany(e.target.value)}
            />
            <input
              type="text"
              placeholder="Role"
              className="w-full p-2 border rounded-md"
              value={searchSuggestRole}
              onChange={(e) => setSearchSuggestRole(e.target.value)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {suggestedInternships.map((internship, index) => (
            <InternshipCard key={index} internships={internship} />
          ))}
        </div>

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
            <InternshipCard key={index} internships={internship} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Internship;
