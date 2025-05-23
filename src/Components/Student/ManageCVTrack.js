import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext.js";
import { Search } from "lucide-react";
import { FaEdit } from "react-icons/fa";
import ManageCVUpdate from "./ManageCVUpdate";
import ManageCVNewAdd from "./ManageCVNewAdd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ManageCVTrack = () => {
  const { url } = useContext(StoreContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [showUpdateCVModel, setUpdateCVModel] = useState(false);
  const [showNewCVUpload, setNewCVUpload] = useState(false);
  const [submittedApplications, setSubmittedApplications] = useState([]);

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  useEffect(() => {
    const getSubmittedApplications = async () => {
      const response = await axios.post(`${url}/api/student/getSubmitted`, {
        registeredEmail,
      });
      if (response.data.success) {
        setSubmittedApplications(response.data.data);
      } else {
        setSubmittedApplications([]);
      }
    };
    getSubmittedApplications();
  }, []);

  return (
    <div className="p-4 bg-white px-6">
      {/* Search and Add New Section */}
      <div className=" flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search cv"
            className="placeholder-slate-400 pl-10 pr-4 py-2 border-cyan-600 border rounded-md w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* CV Table */}
      <div className="mt-4 border rounded-lg">
        <div className="bg-gray-100 rounded-t-lg p-4 font-medium text-gray-600 grid grid-cols-4 sticky top-0 z-10">
          <div className="text-left">Company</div>
          <div className="text-left">Position</div>
          <div className="text-left">Date</div>
          <div className="text-left">Status</div>
        </div>
        <div className="max-h-96 overflow-y-auto border-x border-b">
          {submittedApplications.length > 0 ? (
            submittedApplications.map((application, index) => (
              <div
                key={index}
                className="grid grid-cols-4 p-4 border-t items-center hover:bg-gray-50"
              >
                <div className="text-fuchsia-600">{application.companyName}</div>
                <div className="text-teal-800">{application.position}</div>
                <div className="text-cyan-600">{application.date}</div>
                <div>
                  <button className="text-gray-500">
                    <div className="px-4 py-1 rounded-3xl">
                      {application.status === null ? (
                        <div className="bg-yellow-500 text-white px-4 py-1 rounded-3xl">
                          Pending
                        </div>
                      ) : application.status ? (
                        <div className="bg-green-500 text-white px-4 py-1 rounded-3xl">
                          Accepted
                        </div>
                      ) : (
                        <div className="bg-red-500 text-white px-4 py-1 rounded-3xl">
                          Rejected
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500">No applications found.</div>
          )}
        </div>
        {showUpdateCVModel && (
          <ManageCVUpdate onClose={() => setUpdateCVModel(false)} />
        )}
        {showNewCVUpload && (
          <ManageCVNewAdd onClose={() => setNewCVUpload(false)} />
        )}
      </div>
    </div>
  );
};

export default ManageCVTrack;
