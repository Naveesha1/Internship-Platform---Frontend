import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { FaFilter } from "react-icons/fa";
import { StoreContext } from "../../Context/StoreContext";

const AdminProfileSideCompany = () => {
  const { url, idStatus, setIdStatus } = useContext(StoreContext);

  const token = localStorage.getItem("authToken");

  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [document, setDocument] = useState(null);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filters, setFilters] = useState({ status: "" });

  const openModal = (docUrl) => {
    setDocument(docUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setDocument(null);
    setIsModalOpen(false);
  };

  const handleAccept = async (id) => {
    const response = await axios.put(`${url}/api/admin/updateCompanyStatus`, {
      id,
      status: true,
    });
    if (response.data.success) {
      setCompanies((prevCompanies) =>
        prevCompanies.map((companies) =>
          companies._id === id ? { ...companies, verify: true } : companies
        )
      );
    } else {
      setIdStatus(null);
    }
  };

  const handleReject = async (id) => {
    const response = await axios.put(`${url}/api/admin/updateCompanyStatus`, {
      id,
      status: false,
    });
    if (response.data.success) {
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company._id === id ? { ...company, verify: false } : company
        )
      );
    } else {
      setIdStatus(null);
    }
  };

  useEffect(() => {
    const getAllCompanies = async () => {
      const response = await axios.get(`${url}/api/admin/getAllCompanies`);
      if (response.data.success) {
        setCompanies(response.data.data);
      }
    };
    getAllCompanies();
  }, [token]);

  useEffect(() => {
    let filteredData = companies;

    if (filters.status !== "") {
      filteredData = filteredData.filter((company) => {
        if (filters.status === "Accept") return company.verify === true;
        if (filters.status === "Reject") return company.verify === false;
        if (filters.status === "Pending") return company.verify === null;
        return true;
      });
    }

    setFilteredCompanies(filteredData);
  }, [companies, filters]);

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
            <span className="text-gray-700 font-medium">All Companies</span>
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
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telephone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Incorperation Doc
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredCompanies.map((company, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600">
                      {company.companyName}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-center flex justify-flex-start">
                      {idStatus === company.verify ? (
                        <>
                          <span className="flex flex-col gap-1 text-center">
                            <button
                              onClick={() => handleAccept(company._id)}
                              className="bg-green-100 text-green-700 px-5 py-1 rounded-full text-sm"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(company._id)}
                              className="bg-red-100 text-red-700 px-5 py-1 rounded-full text-sm"
                            >
                              Reject
                            </button>
                          </span>
                        </>
                      ) : company.verify ? (
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
                      {company.rating}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {company.industry}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {company.contactNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {company.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="flex flex-row justify-center">
                        <button
                          onClick={() => openModal(company.companyDocument)}
                          className="text-blue-500 hover:underline"
                        >
                          View
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
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 hover:text-black text-xl"
            >
              &times;
            </button>
            <iframe
              src={document}
              className="w-full h-full border-0"
              title="Document Preview"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProfileSideCompany;
