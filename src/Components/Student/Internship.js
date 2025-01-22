// import React, { useEffect, useState,useContext } from "react";
// import { FaFilter, FaArrowCircleRight, FaArrowCircleLeft,FaSearch } from "react-icons/fa";
// import InternshipCard from '../../Components/Student/InternshipCard';
// import { IoMdArrowDropdown } from "react-icons/io";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import { StoreContext } from "../../Context/StoreContext.js";

// const Internship = () => {

//   const { url } = useContext(StoreContext);

//   const[showSuggestionFilters, setShowSuggestionFilters] = useState(false);
//   const[showAllFilters, setShowAllFilters] = useState(false);
//   const [internships,setInternships] = useState([]);

//   const token = localStorage.getItem("authToken");
//   const decodedToken = jwtDecode(token);
//   const userId = decodedToken._id;

//   const toggleSuggestFilters = () => {
//     setShowSuggestionFilters(!showSuggestionFilters);
//   };

//   const toggleAllFilters = () => {
//     setShowAllFilters(!showAllFilters);
//   };

//   useEffect(()=> {
//     const getAllInternships = async() => {
//       const response = await axios.get(`${url}/api/student/allInternships`);
//       if(response.data.success){
//         setInternships(response.data.data);
//       } else {
//         console.log(response.data.message);
//       }
//     }

//     getAllInternships();
//   },[userId]);
//   console.log(internships);
  
  

//   return (
//     <div className="flex-1 flex flex-col overflow-hidden">
//       <div className="p-6 flex-1 overflow-y-auto">
//         {/* Suggestions Section */}
//         <div className="flex justify-between items-center font-semibold mt-6 mb-4">
//           <div className="flex items-center">
//             Suggestions for you
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
//           {[...Array(4)].map((_, index) => (
//               <InternshipCard key={index} allInterships={internships}  />
//           ))}
//         </div>

//         {/* All Internships Section */}
//         <div className="flex justify-between items-center font-semibold mt-6 mb-4">
//           <div className="flex items-center">
//             All Internships
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
//             <InternshipCard key={index} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Internship;




import React, { useEffect, useState, useContext } from "react";
import { FaFilter, FaArrowCircleRight, FaArrowCircleLeft, FaSearch } from "react-icons/fa";
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
  const [currentPage, setCurrentPage] = useState(0); // Tracks the current page index
  const internshipsPerPage = 4; // Number of internships per page

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken._id;

  const toggleSuggestFilters = () => {
    setShowSuggestionFilters(!showSuggestionFilters);
  };

  const toggleAllFilters = () => {
    setShowAllFilters(!showAllFilters);
  };

  useEffect(() => {
    const getAllInternships = async () => {
      const response = await axios.get(`${url}/api/student/allInternships`);
      if (response.data.success) {
        setInternships(response.data.data);
      } else {
        console.log(response.data.message);
      }
    };

    getAllInternships();
  }, [userId]);

  // Calculate the internships to display on the current page
  const startIndex = currentPage * internshipsPerPage;
  const currentInternships = internships.slice(startIndex, startIndex + internshipsPerPage);

  // Navigate to the previous page
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Navigate to the next page
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
            <IoMdArrowDropdown className="mt-1 cursor-pointer" onClick={toggleSuggestFilters} />
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

        {/* Conditionally render filters */}
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

        {/* Render internships */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {currentInternships.map((internship, index) => (
            <InternshipCard key={index} internships={internship} />
          ))}
        </div>

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

        {/* Conditionally render filters */}
        {showAllFilters && (
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
          {currentInternships.map((internship, index) => (
            <InternshipCard key={index} internships={internship} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Internship;
