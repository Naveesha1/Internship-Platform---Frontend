import React, { useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext.js";

const CompanyApplication = () => {
  const { url, cvStatus, setCvStatus } = useContext(StoreContext);
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cvLink, setCvLink] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [positions, setPositions] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState({});
  const [showShortlisted, setShowShortlisted] = useState(false);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [matchThreshold, setMatchThreshold] = useState(70);

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  useEffect(() => {
    const getApplicants = async () => {
      const response = await axios.post(`${url}/api/company/getApplicants`, {
        registeredEmail,
      });
      console.log("data", response.data);
      
      if (response.data.success) {
        // Sort applications by date (assuming there's a timestamp field)
        // If there's no timestamp field, simply reverse the array to put new ones first
        const sortedApplicants = [...response.data.data].reverse();
        
        setApplicants(sortedApplicants);
        setFilteredApplicants(sortedApplicants);
  
        // Extract unique positions
        const uniquePositions = [...new Set(sortedApplicants.map(app => app.position))];
        setPositions(uniquePositions);
        
        // Initialize selected positions state
        const posState = {};
        uniquePositions.forEach(pos => {
          posState[pos] = false;
        });
        setSelectedPositions(posState);
      } else {
        setApplicants([]);
        setFilteredApplicants([]);
      }
    };
    
    getApplicants();
  }, [url, registeredEmail]);

  // Filter applicants based on search input
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredApplicants(applicants); // Reset when search is empty
    } else {
      const filtered = applicants.filter((applicant) =>
        applicant.position.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredApplicants(filtered);
    }
  }, [searchQuery, applicants]);

  // Handle position selection
  const handlePositionSelect = async (position) => {
    const newSelectedPositions = {
      ...selectedPositions,
      [position]: !selectedPositions[position]
    };
    setSelectedPositions(newSelectedPositions);
    
    // Check if any position is selected
    const anySelected = Object.values(newSelectedPositions).some(val => val);
    setShowShortlisted(anySelected);
    
    if (newSelectedPositions[position]) {
      // Position was just selected, analyze CVs
      await analyzePositionCVs(position);
    } else {
      // Position was just deselected, remove its candidates
      setShortlistedCandidates(prev => 
        prev.filter(candidate => candidate.position !== position)
      );
    }
  };

  // Analyze CVs for a specific position
  const analyzePositionCVs = async (position) => {
    setIsLoading(true);
    try {
      // Get all applicants for this position
      const positionApplicants = applicants.filter(app => app.position === position);
      
      // For each applicant, analyze their CV
      const analyzed = await Promise.all(positionApplicants.map(async (applicant) => {
        try {
          console.log('data',applicant.userCv,applicant.internshipId)
          // Call the backend to analyze the CV against the internship requirements
          const response = await axios.post(`${url}/api/company/analyzeCvController`, {
            cvUrl: applicant.userCv,
            internshipId: applicant.internshipId
          });
          
          
          if (response.data.success) {
            return {
              ...applicant,
              matchScore: response.data.matchScore,
              matchedKeywords: response.data.matchedKeywords
            };
          } else {
            console.error("Error in CV analysis:", response.data.message);
            return {
              ...applicant,
              matchScore: 0,
              matchedKeywords: []
            };
          }
        } catch (error) {
          console.error("Error analyzing CV for applicant:", applicant.userName, error);
          return {
            ...applicant,
            matchScore: 0,
            matchedKeywords: []
          };
        }
      }));
      
      // Sort by match score (highest first)
      analyzed.sort((a, b) => b.matchScore - a.matchScore);
      
      // Add to shortlisted candidates
      setShortlistedCandidates(prev => {
        // Remove any existing candidates for this position
        const filtered = prev.filter(c => c.position !== position);
        // Add new analyzed candidates
        return [...filtered, ...analyzed];
      });
    } catch (error) {
      console.error("Error analyzing CVs for position:", position, error);
    } finally {
      setIsLoading(false);
    }
  };


  const openModal = (cvUrl) => {
    setCvLink(cvUrl);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setCvLink(null);
    setIsModalOpen(false);
  };

  const handleAccept = async (id) => {
    const response = await axios.put(`${url}/api/company/updateStatus`, {
      id,
      status: true,
    });
    if (response.data.success) {
      setFilteredApplicants((prevApplicants) =>
        prevApplicants.map((student) =>
          student._id === id ? { ...student, status: true } : student
        )
      );
      setShortlistedCandidates((prevCandidates) =>
        prevCandidates.map((student) =>
          student._id === id ? { ...student, status: true } : student
        )
      );
    } else {
      setCvStatus(null);
    }
  };

  const handleReject = async (id) => {
    const response = await axios.put(`${url}/api/company/updateStatus`, {
      id,
      status: false,
    });
    if (response.data.success) {
      setFilteredApplicants((prevApplicants) =>
        prevApplicants.map((student) =>
          student._id === id ? { ...student, status: false } : student
        )
      );
      setShortlistedCandidates((prevCandidates) =>
        prevCandidates.map((student) =>
          student._id === id ? { ...student, status: false } : student
        )
      );
    } else {
      setCvStatus(null);
    }
  };

  // Filter shortlisted candidates based on threshold
  const filteredShortlisted = shortlistedCandidates.filter(
    candidate => candidate.matchScore >= matchThreshold
  );

  return (
    <>
      {/* Search Bar and Position Filters */}
      <div className="flex flex-col ml-4 mt-16">
        <div className="w-1/2 mb-4">
          <input
            type="text"
            placeholder="Search by Position"
            className="w-full px-4 py-2 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Position checkboxes */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Filter by Position (Shortlist CVs)</h3>
          <div className="flex flex-wrap gap-3">
            {positions.map((position) => (
              <label key={position} className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <input
                  type="checkbox"
                  checked={selectedPositions[position] || false}
                  onChange={() => handlePositionSelect(position)}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span>{position}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Match threshold slider (only shown when positions are selected) */}
        {showShortlisted && (
          <div className="mb-4 mt-2 w-1/3">
            <label className="block text-sm font-medium text-gray-700">
              Match Threshold: {matchThreshold}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={matchThreshold}
              onChange={(e) => setMatchThreshold(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Shortlisted Candidates Section */}
      {showShortlisted && (
        <div className="mx-4 mb-8">
          <h2 className="text-xl font-bold mb-4">Shortlisted Candidates</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-2">Analyzing CVs...</span>
            </div>
          ) : filteredShortlisted.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Position</th>
                    <th className="px-4 py-2 text-left">Match Score</th>
                    <th className="px-4 py-2 text-left">AGPA</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">CV</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShortlisted.map((candidate, index) => (
                    <tr 
                      key={`shortlisted-${index}`}
                      className={`border-b ${candidate.matchScore >= 90 ? 'bg-green-50' : ''}`}
                    >
                      <td className="px-4 py-2">{candidate.userName}</td>
                      <td className="px-4 py-2">{candidate.position}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${
                                candidate.matchScore >= 90 ? 'bg-green-500' :
                                candidate.matchScore >= 70 ? 'bg-blue-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${candidate.matchScore}%` }}
                            ></div>
                          </div>
                          <span>{candidate.matchScore.toFixed(0)}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-2">{candidate.userGpa}</td>
                      <td className="px-4 py-2">
                        {candidate.status === true ? (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm text-center">
                            Accepted
                          </span>
                        ) : candidate.status === false ? (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm text-center">
                            Rejected
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm text-center">
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => openModal(candidate.userCv)}
                          className="text-blue-500 hover:underline"
                        >
                          View CV
                        </button>
                      </td>
                      <td className="px-4 py-2 flex flex-col">
                        {cvStatus === candidate.status ? (
                          <>
                            <button
                              onClick={() => handleAccept(candidate._id)}
                              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mb-1"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(candidate._id)}
                              className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                            >
                              Reject
                            </button>
                          </>
                        ) : candidate.status === null && (
                          <>
                            <button
                              onClick={() => handleAccept(candidate._id)}
                              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mb-1"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(candidate._id)}
                              className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-100 rounded-md p-4 text-center">
              No candidates meet the current match threshold ({matchThreshold}%). Try lowering the threshold.
            </div>
          )}
        </div>
      )}

      {/* Regular Applications Table (Always shown) */}
      <div className="mt-6 mx-4">
        <h2 className="text-xl font-bold mb-4">All Applications</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-left">AGPA</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">CV</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((applicant, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{applicant.userName}</td>
                  <td className="px-4 py-2">{applicant.position}</td>
                  <td className="px-4 py-2 flex flex-col">
                    {cvStatus === applicant.status ? (
                      <>
                        <button
                          onClick={() => handleAccept(applicant._id)}
                          className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mb-1"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(applicant._id)}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                        >
                          Reject
                        </button>
                      </>
                    ) : applicant.status ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm text-center">
                        Accepted
                      </span>
                    ) : (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm text-center">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">{applicant.userGpa}</td>
                  <td className="px-4 py-2">{applicant.date}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openModal(applicant.userCv)}
                      className="text-blue-500 hover:underline"
                    >
                      View CV
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CV Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 hover:text-black text-xl"
            >
              &times;
            </button>
            <iframe
              src={cvLink}
              className="w-full h-full border-0"
              title="CV Preview"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyApplication;