import React, { useEffect, useState, useContext } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FiEdit2, FiSearch } from "react-icons/fi";
import {
  FaFolder,
  FaFolderOpen,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";
import { StoreContext } from "../../Context/StoreContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";
import { toast } from "react-toastify";


const MentorDocWeekly = () => {
  const { url } = useContext(StoreContext);
  const [searchText, setSearchText] = useState("");
  const [expandedStudents, setExpandedStudents] = useState({});
  const [reports, setReports] = useState([]);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

const [showUploadModal, setShowUploadModal] = useState(false);
const [uploadingPdf, setUploadingPdf] = useState(null);
const [selectedStudent, setSelectedStudent] = useState({ registrationNumber: '', weekNo: '' });


  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  useEffect(() => {
    const getWeeklyReports = async () => {
      const response = await axios.post(`${url}/api/mentor/getWeeklyReports`, {
        registeredEmail,
      });
      if (response.data.success) {
        setReports(response.data.data);
      }
    };
    getWeeklyReports();
  }, [token]);

  const groupedReports = reports.reduce((acc, report) => {
    if (!acc[report.registrationNumber]) {
      acc[report.registrationNumber] = {
        studentInfo: {
          name: report.fullName,
          index: report.registrationNumber,
        },
        reports: [],
      };
    }
    acc[report.registrationNumber].reports.push(report);
    return acc;
  }, {});

  const filteredGroupedReports = Object.keys(groupedReports).reduce(
    (acc, studentIndex) => {
      const group = groupedReports[studentIndex];
      const matches =
        group.studentInfo.name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        group.studentInfo.index
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        group.reports.some((r) =>
          r.weekNo.toLowerCase().includes(searchText.toLowerCase())
        );

      if (matches) acc[studentIndex] = group;
      return acc;
    },
    {}
  );

  const toggleExpand = (studentIndex) => {
    setExpandedStudents((prev) => ({
      ...prev,
      [studentIndex]: !prev[studentIndex],
    }));
  };

  const handleViewPdf = (reportUrl) => {
    console.log(reportUrl);
    if (reportUrl) {
      setSelectedPdf(reportUrl);
      setShowPdfModal(true);
    }
  };

  const closeModal = () => {
    setShowPdfModal(false);
    setSelectedPdf(null);
  };

  const handleEdit = async(registrationNumber,weekNo) => {
    setSelectedStudent({ registrationNumber, weekNo });
  setShowUploadModal(true);
  };

  const handleUploadPdf = async () => {
    const { registrationNumber, weekNo } = selectedStudent;
    if (!uploadingPdf) return;
  
    const fileRef = ref(storage, `weekly-reports/${registrationNumber}-${weekNo}.pdf`);
    try {
      await uploadBytes(fileRef, uploadingPdf);
      const downloadURL = await getDownloadURL(fileRef);  
      if(downloadURL){
        const response = await axios.post(`${url}/api/student/updateWeeklyReport`, {
          registrationNumber,
          weekNo,
          reportUrl: downloadURL,
        });
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
      setShowUploadModal(false);
      setUploadingPdf(null);
      setSelectedStudent({ registrationNumber: '', weekNo: '' });
  
    } catch (error) {
      toast.error("Upload failed");
    }
  };
  

  return (
    <div className="w-full p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6">
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
      </div>

      <div className="bg-gray-100 rounded-lg overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Index</th>
              <th className="py-3 px-4">Reports</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.keys(filteredGroupedReports).map((studentIndex) => {
              const { studentInfo, reports } =
                filteredGroupedReports[studentIndex];
              const isExpanded = expandedStudents[studentIndex];

              return (
                <React.Fragment key={studentIndex}>
                  <tr
                    className="hover:bg-gray-50 cursor-pointer bg-gray-50"
                    onClick={() => toggleExpand(studentIndex)}
                  >
                    <td className="py-4 px-4 flex items-center">
                      {isExpanded ? (
                        <FaChevronDown className="mr-2 text-gray-500" />
                      ) : (
                        <FaChevronRight className="mr-2 text-gray-500" />
                      )}
                      {isExpanded ? (
                        <FaFolderOpen className="mr-2 text-yellow-500" />
                      ) : (
                        <FaFolder className="mr-2 text-yellow-500" />
                      )}
                      {studentInfo.name}
                    </td>
                    <td className="py-4 px-4">{studentInfo.index}</td>
                    <td className="py-4 px-4">{reports.length} reports</td>
                    <td className="py-4 px-4"></td>
                  </tr>

                  {isExpanded &&
                    reports.map((report, idx) => (
                      <tr
                        key={`${studentIndex}-${idx}`}
                        className="hover:bg-gray-50 text-sm text-[#0C7075]"
                      >
                        <td className="py-3 px-4 pl-12">Weekly Report</td>
                        <td className="py-3 px-4">
                          {report.registrationNumber}
                        </td>
                        <td className="py-3 px-4">Week {report.weekNo}</td>
                        <td className="py-3 px-4 flex space-x-6">
                          <AiOutlineFilePdf
                            className="text-red-500 text-xl cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewPdf(report.reportUrl);
                            }}
                            title="View Report"
                          />
                          <FiEdit2
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(report.registrationNumber,report.weekNo);
                            }}
                            className="text-gray-600 text-lg cursor-pointer"
                            title="Edit Report"
                          />
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 h-5/6 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Weekly Report</h3>
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
                  const link = document.createElement("a");
                  link.href = selectedPdf;
                  link.download = "assessment_report.pdf";
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


{showUploadModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
      <h2 className="text-lg font-semibold mb-4">Upload Weekly Report</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setUploadingPdf(e.target.files[0])}
        className="mb-4"
      />
      <div className="flex justify-end">
        <button
          onClick={handleUploadPdf}
          disabled={!uploadingPdf}
          className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded mr-2 disabled:opacity-50"
        >
          Upload
        </button>
        <button
          onClick={() => {
            setShowUploadModal(false);
            setUploadingPdf(null);
          }}
          className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MentorDocWeekly;
