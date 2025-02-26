import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { FaFilter } from "react-icons/fa";
import { StoreContext } from "../../Context/StoreContext";

const AdminProfileSideStudent = () => {
  const { url, idStatus, setIdStatus } = useContext(StoreContext);

  const token = localStorage.getItem("authToken");

  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idUrl, setIdUrl] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [filters, setFilters] = useState({ status: "", degree: "" });

  const openModal = (idUrl) => {
    setIdUrl(idUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIdUrl(null);
    setIsModalOpen(false);
  };

  const handleAccept = async (id) => {
    const response = await axios.put(`${url}/api/admin/updateStatus`, {
      id,
      status: true,
    });
    if (response.data.success) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === id ? { ...student, verify: true } : student
        )
      );
    } else {
      setIdStatus(null);
    }
  };

  const handleReject = async (id) => {
    const response = await axios.put(`${url}/api/admin/updateStatus`, {
      id,
      status: false,
    });
    if (response.data.success) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === id ? { ...student, verify: false } : student
        )
      );
    } else {
      setIdStatus(null);
    }
  };

  useEffect(() => {
    const getAllStudents = async () => {
      const response = await axios.get(`${url}/api/admin/getAllStudents`);
      if (response.data.success) {
        setStudents(response.data.data);
      }
    };
    getAllStudents();
  }, [token]);

  useEffect(() => {
    let filteredData = students;

    if (filters.status !== "") {
      filteredData = filteredData.filter((student) => {
        if (filters.status === "Accept") return student.verify === true;
        if (filters.status === "Reject") return student.verify === false;
        if (filters.status === "Pending") return student.verify === null;
        return true;
      });
    }

    if (filters.degree !== "") {
      filteredData = filteredData.filter((student) =>
        filters.degree === "All" ? true : student.degree === filters.degree
      );
    }

    setFilteredStudents(filteredData);
  }, [students, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        {/* Header */}
        <div className="flex justify-between items-center w-full max-w-4xl mb-6">
          <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
            <span className="text-gray-700 font-medium">All Students</span>
            <FaFilter size={13} className="text-gray-600" />
          </div>
        </div>

        {/* Filters */}
        <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-wrap gap-1 justify-between items-center mb-6">
          <div className="w-full sm:w-1/2">
            <label className="block text-gray-700 text-sm mb-1">
              Filter by Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="">All</option>
              <option value="Accept">Accept</option>
              <option value="Reject">Reject</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block text-gray-700 text-sm mb-1">
              Filter by Degree
            </label>
            <select
              name="degree"
              value={filters.degree}
              onChange={handleFilterChange}
              className="w-full border border-gray-300 p-2 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              <option value="">All</option>
              <option value="IT">IT</option>
              <option value="ITM">ITM</option>
              <option value="AI">AI</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto max-h-[calc(100vh-200px)] overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Degree
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University ID
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredStudents.map((student, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600">
                      {student.fullName}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-center flex justify-flex-start">
                      {idStatus === student.verify ? (
                        <>
                          <span className="flex flex-col gap-1 text-center">
                            <button
                              onClick={() => handleAccept(student._id)}
                              className="bg-green-100 text-green-700 px-5 py-1 rounded-full text-sm"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(student._id)}
                              className="bg-red-100 text-red-700 px-5 py-1 rounded-full text-sm"
                            >
                              Reject
                            </button>
                          </span>
                        </>
                      ) : student.verify ? (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm text-center">
                          Accepted
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm text-center">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.degree}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="flex flex-row justify-flex-start">
                        <button
                          onClick={() => openModal(student.idFrontImageUrl)}
                          className="text-blue-500 hover:underline"
                        >
                          Front
                        </button>
                        <button
                          onClick={() => openModal(student.idBackImageUrl)}
                          className="text-blue-500 hover:underline ml-4"
                        >
                          Back
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-auto max-w-3xl max-h-[80vh] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 hover:text-black text-xl"
            >
              &times;
            </button>
            <div className="flex justify-center items-center">
              <img
                src={idUrl}
                alt="ID Preview"
                className="max-w-80 max-h-[60vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProfileSideStudent;
