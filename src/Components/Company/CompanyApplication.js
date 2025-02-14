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

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  useEffect(() => {
    const getApplicants = async () => {
      const response = await axios.post(`${url}/api/company/getApplicants`, {
        registeredEmail,
      });
      if (response.data.success) {
        setApplicants(response.data.data);
        setFilteredApplicants(response.data.data); // Set initial filtered data
      } else {
        setApplicants([]);
        setFilteredApplicants([]);
      }
    };
    getApplicants();
  }, [registeredEmail]);

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
      setCvStatus(true);
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
      setCvStatus(false);
    } else {
      setCvStatus(null);
    }
  };

  return (
    <>
      {/* Search Bar */}
      <div className="flex justify-start ml-4 mt-16">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search by Position"
            className="w-1/2 px-4 py-2 border rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Body Table */}
      <div className="mt-8 mx-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Status</th>
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
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Accepted
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
