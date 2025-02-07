// import React, { useState } from "react";
// import { FaFilter, FaArrowCircleRight, FaArrowCircleLeft,FaSearch } from "react-icons/fa";
// import companyInternshipCard from '../../Components/Company/companyInternshipCard';
// import { IoMdArrowDropdown } from "react-icons/io";


// const AllInternship = () => {

//   const[showSuggestionFilters, setShowSuggestionFilters] = useState(false);
//   const[showAllFilters, setShowAllFilters] = useState(false);

//   const toggleSuggestFilters = () => {
//     setShowSuggestionFilters(!showSuggestionFilters);
//   };

//   const toggleAllFilters = () => {
//     setShowAllFilters(!showAllFilters);
//   };

//   return (
//     <div className="flex-1 flex flex-col overflow-hidden">
//       <div className="p-6 flex-1 overflow-y-auto ml-4">
//         {/* Suggestions Section */}
//         <div className="flex justify-between items-center font-semibold mt-6 mb-4">
//           <div className="flex items-center">
//             Latest Post
//             <FaFilter className="ml-4 mt-1" size={12}/> 
//             <IoMdArrowDropdown className="mt-1 cursor-pointer" onClick={toggleSuggestFilters}/>

//           </div>
//           <div>
//             <button className="mr-2">
//               <FaArrowCircleLeft color="#45A29E" />
//             </button>
//             <button>
//               <FaArrowCircleRight color="#45A29E" />
//             </button>
//           </div>
//         </div>
        
//         {/* conditionally render filters */}
//         {showSuggestionFilters && (
//           <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 w-72">
//             <div className="grid grid-cols-1 gap-4">

//             <div className="relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Company"
//                   className="w-full pl-10 p-2 border rounded-md"
//                 />
//               </div>

//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Role"
//                   className="w-full pl-10 p-2 border rounded-md"
//                 />
//               </div>

//               <div className="relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Type"
//                   className="w-full pl-10 p-2 border rounded-md"
//                 />
//               </div>

//             </div>
//           </div>
//         )}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           {/* {[...Array(4)].map((_, index) => (
//             <InternshipCard key={index} />
//           ))} */}
//         </div>

//         {/* All Internships Section */}
//         <div className="flex justify-between items-center font-semibold mt-6 mb-4">
//           <div className="flex items-center">
//             All Post
//             <FaFilter className="ml-4 mt-1" size={12} /> 
//             <IoMdArrowDropdown className="mt-1 cursor-pointer" onClick={toggleAllFilters}/>

//           </div>
//           <div>
//             <button className="mr-2">
//               <FaArrowCircleLeft color="#45A29E" />
//             </button>
//             <button>
//               <FaArrowCircleRight color="#45A29E" />
//             </button>
//           </div>
//         </div>

//         {/* conditionally render filters */}
//         {    showAllFilters && (
//           <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 w-72">
//           <div className="grid grid-cols-1 gap-4">

//           <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Company"
//                 className="w-full pl-10 p-2 border rounded-md"
//               />
//             </div>

//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Role"
//                 className="w-full pl-10 p-2 border rounded-md"
//               />
//             </div>

//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Type"
//                 className="w-full pl-10 p-2 border rounded-md"
//               />
//             </div>

//           </div>
//         </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {[...Array(4)].map((_, index) => (
//             <companyInternshipCard key={index} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllInternship;





import React, { useEffect, useState, useContext } from "react";
import { FaFilter, FaArrowCircleRight, FaArrowCircleLeft, FaSearch } from "react-icons/fa";
import CompanyInternshipCard from "../../Components/Company/companyInternshipCard";
import { IoMdArrowDropdown } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext.js";

const AllInternship = () => {
  const { url } = useContext(StoreContext);

  // const [showSuggestionFilters, setShowSuggestionFilters] = useState(false);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [internships, setInternships] = useState([]);
  // const [suggestInternships, setSuggestInternships] = useState([]);

  const [filteredInternships, setFilteredInternships] = useState([]);
  // const [filteredSuggestInternships, setFilteredSuggestInternships] = useState([]);

  const [searchCompany, setSearchCompany] = useState("");
  const [searchRole, setSearchRole] = useState("");
  // const [searchSuggestCompany, setSearchSuggestCompany] = useState("");
  // const [searchSuggestRole, setSearchSuggestRole] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  // const [currentSuggestionsPage, setCurrentSuggestionsPage] = useState(0);
  const internshipsPerPage = 4;

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;
  const registeredEmail = decodedToken.email;

  // const toggleSuggestFilters = () => setShowSuggestionFilters(!showSuggestionFilters);
  const toggleAllFilters = () => setShowAllFilters(!showAllFilters);

  useEffect(() => {
    const getCompanySpecificInternships = async () => {
      const response = await axios.post(`${url}/api/company/allInternships`,{registeredEmail});
      if (response.data.success) {
        setInternships(response.data.data);
        setFilteredInternships(response.data.data); // Initially set filtered data to full data
      } else {
        console.log(response.data.message);
      }
    };
    getCompanySpecificInternships();
  }, [userId]);

  // useEffect(() => {
  //   const getSuggestInternships = async () => {
  //     const response = await axios.post(`${url}/api/student/getSuggestions`, { registeredEmail });
  //     if (response.data.success) {
  //       setSuggestInternships(response.data.data);
  //       setFilteredSuggestInternships(response.data.data); // Initially set filtered data to full data
  //     } else {
  //       console.log(response.data.message);
  //     }
  //   };
  //   getSuggestInternships();
  // }, [userId]);

  // Filtering internships
  useEffect(() => {
    const filtered = internships.filter((internship) =>
      internship.companyName.toLowerCase().includes(searchCompany.toLowerCase()) &&
      internship.position.toLowerCase().includes(searchRole.toLowerCase())
    );
    setFilteredInternships(filtered);
  }, [searchCompany, searchRole, internships]);

  // Filtering suggested internships
  // useEffect(() => {
  //   const filtered = suggestInternships.filter((internship) =>
  //     internship.companyName.toLowerCase().includes(searchSuggestCompany.toLowerCase()) &&
  //     internship.position.toLowerCase().includes(searchSuggestRole.toLowerCase())
  //   );
  //   setFilteredSuggestInternships(filtered);
  // }, [searchSuggestCompany, searchSuggestRole, suggestInternships]);

  const startIndex = currentPage * internshipsPerPage;
  // const startSuggestionIndex = currentSuggestionsPage * internshipsPerPage;
  const currentInternships = filteredInternships.slice(startIndex, startIndex + internshipsPerPage);
  // const suggestedInternships = filteredSuggestInternships.slice(startSuggestionIndex, startSuggestionIndex + internshipsPerPage);


  //   // Page navigation functions
  // const handlePrevPageSuggestions = () => {
  //   if (currentSuggestionsPage>0){
  //     setCurrentSuggestionsPage((previousPage)=> previousPage-1);
  //   }
  // };

  // const handleNextPageSuggestions = () => {
  //   if (startSuggestionIndex + internshipsPerPage < suggestedInternships.length) {
  //     setCurrentSuggestionsPage((previousPage) => previousPage + 1);
  //   }
  // };

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
        {/* <div className="flex justify-between items-center font-semibold mt-6 mb-4">
          <div className="flex items-center">
            Latest posts
            <FaFilter className="ml-4 mt-1" size={12} />
            <IoMdArrowDropdown className="mt-1 cursor-pointer" onClick={toggleSuggestFilters} />
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
            <CompanyInternshipCard key={index} internships={internship} />
          ))} 
        </div> */}

        {/* All Internships Section */}
        <div className="flex justify-between items-center font-semibold mt-6 mb-4">
          <div className="flex items-center">
            All Internships
            <FaFilter className="ml-4 mt-1" size={12} />
            <IoMdArrowDropdown className="mt-1 cursor-pointer" onClick={toggleAllFilters} />
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

