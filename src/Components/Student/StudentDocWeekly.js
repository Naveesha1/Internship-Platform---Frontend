import React, { useState, useEffect, useContext } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FiTrash2, FiSearch } from "react-icons/fi";
import WeeklyReport from "../WeeklyReport.js";
import { StoreContext } from "../../Context/StoreContext.js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ConfirmDeleteButton from "../Helpers/ConfirmDeleteButton.js";
import { toast } from "react-toastify";

const StudentDocWeekly = () => {
  const { url } = useContext(StoreContext);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("weekly");
  const [weeklyReports, setWeeklyReports] = useState([]);
  const [reportUrl, setReportUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showWeeklyReport, setShowWeeklyReport] = useState(false);

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const userEmail = decodedToken.email;

  const handleOpenReport = () => {
    setShowWeeklyReport(true);
  };

  const handleCloseReport = () => {
    setShowWeeklyReport(false);
  };

  useEffect(() => {
    if (token) {
      const getWeeklyReports = async () => {
        const response = await axios.post(`${url}/api/student/getWeeklyReports`, {
          userEmail,
        });
        if (response.data.success) {
          setWeeklyReports(response.data.data);
        }
      };
      getWeeklyReports();
    }
  }, [token, weeklyReports]);

  const filteredDocuments = weeklyReports.filter(
    (doc) =>
      doc.weekNo?.toString().includes(searchText) ||
      doc.status?.toLowerCase().includes(searchText.toLowerCase()) ||
      doc.month?.toLowerCase().includes(searchText.toLowerCase())
  );

  const openModal = (reportUrl) => {
    setReportUrl(reportUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setReportUrl("");
    setIsModalOpen(false);
  };

  const deleteDocument = async (id) => {
    const response = await axios.delete(`${url}/api/student/deleteWeeklyReport`, {
      data: { userEmail, id },
    });
    if (response.data.success) {
      toast.success(response.data.message);
      setWeeklyReports(response.data.data);
    }
    else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className="w-full p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6">
        {/* Search Bar with Icon */}
        <div className="relative w-full md:w-1/3 lg:w-1/5 max-w-sm">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 w-full pl-10 pr-4 py-2 rounded-md focus:outline-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <button
          onClick={handleOpenReport}
          className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded"
        >
          ADD
        </button>
      </div>

      <div className="overflow-x-auto bg-gray-100 rounded-lg max-h-[380px] overflow-y-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4">Week</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Month</th>
              <th className="py-3 px-4">Report</th>
            </tr>
          </thead>
          {weeklyReports.length === 0 ? (
            <>
              <p className="text-center">Loading...</p>
            </>
          ) : (
            <>
              <tbody className="divide-y divide-gray-200">
                {filteredDocuments.map((doc, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-4 text-blue-600 font-medium">{doc.weekNo}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-4 py-1 rounded-full text-xs font-medium 
                      ${"done" === "Done"
                            ? "bg-teal-600 text-white"
                            : "bg-gray-500 text-white"
                          }`}
                      >
                        {/* {doc.status} */} Done
                      </span>
                    </td>
                    <td className="py-4 px-4 text-purple-600">{doc.month}</td>
                    <td className="py-4 px-4 flex space-x-3">
                      <button
                        onClick={() => openModal(doc.reportUrl)}
                        className="text-red-500 text-lg"
                      >
                        <AiOutlineFilePdf className="ml-4" />
                      </button>
                      <ConfirmDeleteButton onConfirm={() => deleteDocument(doc._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>

            </>
          )}
        </table>
      </div>

      {showWeeklyReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-xl w-full max-w-4xl shadow-xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleCloseReport}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>

            {/* Weekly Report Component inside the modal */}
            <div className="overflow-y-auto h-full">
              <WeeklyReport onClose={handleCloseReport} />
            </div>
          </div>
        </div>
      )}

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
              src={reportUrl}
              className="w-full h-full border-0"
              title="Document Preview"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDocWeekly;
