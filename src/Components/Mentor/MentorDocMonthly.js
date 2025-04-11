import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { FiTrash2, FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { jwtDecode } from 'jwt-decode';

const MentorDocMonthly = () => {
  const { url } = useContext(StoreContext);
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const token = localStorage.getItem("authToken");
  const decoded = jwtDecode(token);
  const userEmail = decoded.email;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.post(`${url}/api/mentor/getMonthlyReports`, {
          userEmail,
        });
        if (response.data.success) {
          setReports(response.data.data);
          setFilteredData(response.data.data);
        } else {
          console.error('Failed to fetch reports');
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, [url, userEmail]);

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      setFilteredData(
        reports.filter(
          (item) =>
            item.name?.toLowerCase().includes(term) ||
            item.month?.toLowerCase().includes(term) ||
            item.index?.toLowerCase().includes(term)
        )
      );
    } else {
      setFilteredData(reports);
    }
  }, [searchTerm, reports]);

  const handleViewPdf = (reportUrl) => {
    if (reportUrl) {
      setSelectedPdf(reportUrl);
      setShowPdfModal(true);
    }
  };

  const closeModal = () => {
    setShowPdfModal(false);
    setSelectedPdf(null);
  };

  const handleDelete = async (reportId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this report?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.post(`${url}/api/mentor/deleteMonthlyReport`, {
        userEmail: userEmail,  // Pass the actual userEmail decoded from the JWT
        reportId: reportId,    // Use the reportId as expected by the backend
      });
  
      if (response.data.success) {
        // Remove the deleted item from the state
        const updatedReports = reports.filter((item) => item._id !== reportId);
        setReports(updatedReports);
        setFilteredData(updatedReports);
      } else {
        alert("Failed to delete the report.");
      }
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("An error occurred while deleting the report.");
    }
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Link to="/MCreateMonthlyDocView">
          <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-10 rounded-md transition duration-300 ease-in-out flex items-center mt-4 md:mt-0">
            ADD
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-gray-100 rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Index</th>
              <th className="py-3 px-4">Month</th>
              <th className="py-3 px-4">Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 text-sm text-[#0C7075]">
                <td className="py-4 px-4">{item.name}</td>
                <td className="py-4 px-4">{item.index}</td>
                <td className="py-4 px-4">{item.month}</td>
                <td className="py-4 px-4 flex space-x-6">
                  <AiOutlineFilePdf
                    className="text-red-500 text-xl cursor-pointer"
                    onClick={() => handleViewPdf(item.reportUrl)}
                    title="View Report"
                  />
                  <FiTrash2
                    className="text-gray-600 text-lg cursor-pointer"
                    onClick={() => handleDelete(item._id)}
                    title="Delete Report"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 h-5/6 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Assessment Report</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <iframe
                src={selectedPdf}
                className="w-full h-full border-0"
                title="PDF Document"
              ></iframe>
            </div>
            <div className="flex justify-end p-4 border-t">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = selectedPdf;
                  link.download = 'assessment_report.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-5 rounded-md transition duration-300 ease-in-out"
              >
                Download
              </button>
              <button
                onClick={closeModal}
                className="ml-2 bg-gray-300 hover:bg-gray-400 py-2 px-5 rounded-md transition duration-300 ease-in-out"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDocMonthly;
