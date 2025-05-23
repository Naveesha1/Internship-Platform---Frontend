import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Mentor/MentorSidebar.js";
import Navbar from "../../Components/Navbar/Navbar";
import Step1 from "../../Components/Mentor/Profile/CStep1.js";
import { StoreContext } from "../../Context/StoreContext.js";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";
import { jwtDecode } from "jwt-decode";
import done_icon from "../../Images/done.png";
import ProfileContent from "../../Components/Mentor/Profile/CompanyProfile.js";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const [token, setToken] = useState(null);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [userReady, setUserReady] = useState(false); // Token verified

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mentor, setMentor] = useState({});
  const [availability, setAvailability] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [positionAndCompany, setPositionAndCompany] = useState({});

  const [formData, setFormData] = useState({
    mentorName: "",
    position: "",
    address: "",
    contactNumber: "",
    company: "",
    registeredEmail: "",
  });

  // Check token and decode email on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(storedToken);
      setToken(storedToken);
      setRegisteredEmail(decoded.email);
      setFormData(prev => ({ ...prev, registeredEmail: decoded.email }));
      setUserReady(true);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("authToken");
      navigate("/");
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalFormData = {
      ...formData,
      position: positionAndCompany.position,
      company: positionAndCompany.companyName,
    };

    if (step === 1) {
      setLoading(true);
      setSuccess(true);
      try {
        const response = await axios.post(`${url}/api/mentor/createProfile`, finalFormData);
        if (response.data.success) {
          setSubmitted(true);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!userReady || !registeredEmail) return;

    const getCompany = async () => {
      try {
        const response = await axios.post(`${url}/api/mentor/getProfile`, {
          registeredEmail,
        });
        if (response.data.success) {
          setMentor(response.data.data);
          setSuccess(true);
          setAvailability(true);
          setSubmitted(false);
        }
      } catch (error) {
        console.error("Error fetching mentor profile:", error);
      }
    };

    const getCompanyAndPosition = async () => {
      try {
        const response = await axios.post(`${url}/api/mentor/getCompanyAndPosition`, {
          registeredEmail,
        });
        setPositionAndCompany(response.data.data);
      } catch (error) {
        console.error("Error fetching company and position:", error);
      }
    };

    getCompany();
    getCompanyAndPosition();
  }, [userReady, registeredEmail, url]);

  if (!userReady) return null; // Prevent render until token is validated

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <div className={`transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} bg-[#45A29E]`}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        <div className="flex-1 p-6 transition-all duration-300 flex flex-col justify-center items-center">
          {!success && !availability ? (
            <div className="bg-[#D9D9D947] p-6 rounded-lg shadow-md w-full max-w-3xl">
              <form onSubmit={handleSubmit}>
                <Step1 formData={formData} handleChange={handleChange} details={positionAndCompany} />
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-[#45A29E] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#3C9C89] focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {error ? (
                <p>{error}</p>
              ) : (
                <>
                  {availability && <ProfileContent mentorDetails={mentor} />}
                  {submitted && (
                    <>
                      <img src={done_icon} alt="Success" />
                      <p className="text-[#0C7075] font-bold text-2xl">Profile Created Successfully</p>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
