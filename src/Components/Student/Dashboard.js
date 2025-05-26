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
  const [userReady, setUserReady] = useState(false);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [newChancesCount, setNewChancesCount] = useState(0);
  const [responseCompanies, setResponseCompanies] = useState(0);
  const [suggestInternships, setSuggestInternships] = useState([]);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const navigate = useNavigate();

  const [registeredEmail, setRegisteredEmail] = useState("");

  // validate token and get user email
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setRegisteredEmail(decoded.email);
      setUserReady(true);
    } catch (err) {
      localStorage.removeItem("authToken");
      navigate("/");
    }
  }, [navigate]);

  // get submitted application count
  useEffect(() => {
    if (!userReady || !registeredEmail) return;

    const getSubmittedApplicationsCount = async () => {
      try {
      const response = await axios.post(`${url}/api/student/getSubmitted`, {
        registeredEmail,
      });
      setSubmittedCount(response.data.success ? response.data.count : 0);
      } catch (error) {
        console.log(error);
      }
    };
    getSubmittedApplicationsCount();
  }, [userReady, registeredEmail]);

  // get new internship posts
  useEffect(() => {
    if (!userReady || !registeredEmail) return;

    const getNewChancesCount = async () => {
      try {
      const response = await axios.post(`${url}/api/student/newChances`, {
        registeredEmail,
      });
      setNewChancesCount(response.data.success ? response.data.data : 0);
      } catch (error) {
        console.log(error);
      }
    };
    getNewChancesCount();
  }, [userReady, registeredEmail]);

  // get response companies count
  useEffect(() => {
    if (!userReady || !registeredEmail) return;

    const fetchResponseCompanies = async () => {
      try {
      const response = await axios.post(`${url}/api/student/getResponseCompaniesController`, {
        userEmail: registeredEmail,
      });
      setResponseCompanies(response.data.success ? response.data.responseCount : 0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResponseCompanies();
  }, [userReady, registeredEmail]);

  // get internship suggestions
  useEffect(() => {
    if (!userReady || !registeredEmail) return;

    const getSuggestInternships = async () => {
      try {
      const response = await axios.post(`${url}/api/student/getMatchingInternshipsController`, {
        registeredEmail,
      });
      if (response.data.success) {
        const sorted = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setSuggestInternships(sorted.slice(0, 4));
      }
      } catch (error) {
        console.log(error);
      }
    };
    getSuggestInternships();
  }, [userReady, registeredEmail]);

  // get accepted and rejected count
  useEffect(() => {
    if (!userReady || !registeredEmail) return;

    const getAcceptedRejectedCount = async () => {
      try {
      const response = await axios.post(`${url}/api/student/responseCompaniesRejectOrAccept`, {
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
        console.log(error);
      }
    };
    getAcceptedRejectedCount();
  }, [userReady, registeredEmail]);

  const goToInternshipPage = () => {
    navigate('/InternshipPage');
  };

  if (!userReady) return null;

  return (
    <div className="flex flex-col flex-1 p-6 transition-all duration-300 py-16">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-[#45A29E]">
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={application_img} alt="" className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">{submittedCount}</h3>
          <p className="pl-2 font-bold text-sm pt-3">Submitted Applications</p>
        </div>
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={company_img} alt="" className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">{responseCompanies}</h3>
          <p className="pl-2 font-bold text-sm pt-3">Response Companies</p>
        </div>
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={chance_img} alt="" className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">{newChancesCount}</h3>
          <p className="pl-2 font-bold text-sm pt-3">New Chances</p>
        </div>
      </div>

      {/* Internship Recommendations and Invitations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h4 className="text-lg text-[#1E1E1EAD] font-semibold mb-3">Internship Recommendations</h4>
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

        <div className="bg-[#66FCF1] p-4 rounded-lg shadow-lg">
          <h4 className="text-lg text-[#1E1E1EAD] font-semibold mb-3">Response Companies</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#C5C6C7] p-4 rounded-lg shadow-md">
              <FaCheckCircle size={32} color="green" className="ml-2" />
              <div className="mt-4 ml-2 font-bold text-3xl">{acceptedCount}</div>
              <p className="pl-2 font-bold text-sm pt-3">Accept</p>
            </div>
            <div className="bg-[#C5C6C7] p-4 rounded-lg shadow-md">
              <FaTimesCircle size={32} color="red" className="ml-2" />
              <div className="mt-4 ml-2 font-bold text-3xl">{rejectedCount}</div>
              <p className="pl-2 font-bold text-sm pt-3">Reject</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
