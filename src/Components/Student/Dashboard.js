import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext.js";
import chance_img from "../../Images/dashboard/chance.png";
import company_img from "../../Images/dashboard/company.png";
import application_img from "../../Images/dashboard/application.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


const Dashboard = () => {
  const { url } = useContext(StoreContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar open/close state
  const [submittedCount, setSubmittedCount] = useState(0);
  const [newChancesCount, setNewChancesCount] = useState(0);
  const [responseCompanies, setResponseCompanies] = useState(0);
  const [suggestInternships, setSuggestInternships] = useState([]);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  const navigate = useNavigate();

  const goToInternshipPage = () => {
    navigate('/InternshipPage'); // or the route path you defined for InternshipPage
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle state
  };

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  useEffect(() => {
    const getSubmittedApplicationsCount = async () => {
      const response = await axios.post(`${url}/api/student/getSubmitted`, {
        registeredEmail,
      });
      if (response.data.success) {
        setSubmittedCount(response.data.count);
      } else {
        setSubmittedCount(0);
      }
    };
    getSubmittedApplicationsCount();
  }, [token]);

  useEffect(() => {
    const getNewChancesCount = async () => {
      const response = await axios.post(`${url}/api/student/newChances`, {
        registeredEmail,
      });
      if (response.data.success) {
        setNewChancesCount(response.data.data);
      } else {
        setNewChancesCount(0);
      }
    };
    getNewChancesCount();
  }, [token]);

  useEffect(() => {
    const responseCompanies = async () => {
      const response = await axios.post(`${url}/api/student/getResponseCompaniesController`, {
        userEmail: registeredEmail,
      });


      if (response.data.success) {
        setResponseCompanies(response.data.responseCount); // <-- use the correct key
      } else {
        setResponseCompanies(0);
      }
    };
    responseCompanies();
  }, [token]);

  useEffect(() => {
    const getSuggestInternships = async () => {
      const response = await axios.post(`${url}/api/student/getMatchingInternshipsController`, {
        registeredEmail,
      });
      if (response.data.success) {
        const sorted = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const latestFour = sorted.slice(0, 4);
        setSuggestInternships(latestFour);
      } else {
        console.log(response.data.message);
      }
    };
    getSuggestInternships();
  }, [registeredEmail]);

  useEffect(() => {
    const getAcceptedRejectedCount = async () => {
      try {
        const response = await axios.post(`${url}/api/student/respinseCompaniesRejectOrAccept`, {
          userEmail: registeredEmail,
        });

        if (response.data.success) {
          setAcceptedCount(response.data.acceptedCount);
          setRejectedCount(response.data.rejectedCount);
        } else {
          setAcceptedCount(0);
          setRejectedCount(0);
        }
      } catch (error) {
        console.error("Error fetching accepted/rejected counts:", error);
      }
    };

    getAcceptedRejectedCount();
  }, [registeredEmail]);





  return (
    <div className="flex flex-col flex-1 p-6 transition-all duration-300 py-16">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-[#45A29E]">
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={application_img} alt="" className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">
            {submittedCount ? <>{submittedCount}</> : <>0</>}
          </h3>
          <p className="pl-2 font-bold text-sm pt-3">Submitted Applications</p>
        </div>


        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={company_img} alt="" className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">
            {responseCompanies ? <>{responseCompanies}</> : <>0</>}
          </h3>
          <p className="pl-2 font-bold text-sm pt-3">Response Companies</p>
        </div>


        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={chance_img} alt="" className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">
            {newChancesCount ? <>{newChancesCount}</> : <>0</>}
          </h3>
          <p className="pl-2 font-bold text-sm pt-3">New Chances</p>
        </div>
      </div>

      {/* Separate Wrapper for Recommendations and Invitations Section */}
      <div className="mt-6">
        {/* Internship Recommendations and Interview Invitations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Internship Recommendations */}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h4 className="text-lg text-[#1E1E1EAD] font-semibold mb-3">
              Internship Recommendations
            </h4>
            <ul className="space-y-2">
              {suggestInternships.length > 0 ? (
                suggestInternships.map((internship, index) => (
                  <li key={index} className="flex justify-between bg-gray-200 p-2 rounded-md">
                    <span>{internship.companyName}</span>
                    <button onClick={goToInternshipPage} className="text-green-600">→</button>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No recommendations yet.</li>
              )}
            </ul>

          </div>

          {/* Interview Invitation */}
          <div className="bg-[#66FCF1] p-4 rounded-lg shadow-lg">
            <h4 className="text-lg text-[#1E1E1EAD] font-semibold mb-3">
              Response Companies
            </h4>
            <div className="grid grid-cols-2 gap-3 ">

              <div className="bg-[#C5C6C7] p-4 rounded-lg shadow-md">
                <FaCheckCircle size={32} color="green" className="ml-2" />
                <h3 className="text-3xl font-bold pl-2 text-[#155E75]">
                </h3>
                <div className=" mt-4 ml-2 font-bold text-3xl">{acceptedCount}</div>
                <p className="pl-2 font-bold text-sm pt-3 ">Accept</p>
              </div>

              <div className="bg-[#C5C6C7] p-4 rounded-lg shadow-md">
                <FaTimesCircle size={32} color="red" className="ml-2" />
                <h3 className="text-3xl font-bold pl-2 text-[#155E75]">
                </h3>
                <div className=" mt-4 ml-2 font-bold text-3xl">{rejectedCount}</div>
                <p className="pl-2 font-bold text-sm pt-3">Reject</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
