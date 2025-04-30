import React, { useEffect, useContext, useState } from "react";
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
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  const { url } = useContext(StoreContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar open/close state
  const [step, setStep] = useState(1); // Step state to control the stepper
  const [loading, setLoading] = useState(false); // For handling loading state
  const [success, setSuccess] = useState(false); // For handling success status
  const [mentor, setMentor] = useState({});
  const [availability, setAvailability] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    mentorName: "",
    position: "",
    address: "",
    contactNumber: "",
    company: "",
    registeredEmail: registeredEmail,
  });

  // for toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // for handle the change in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  // for submitted form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      setLoading(true);
      setSuccess(true);
      try {
        // api call for saving gathered data
        const response = await axios.post(
          `${url}/api/mentor/createProfile`,
          formData
        );
        if (response.data.success) {
          setSubmitted(true);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  useEffect(() => {
    // for checking availability of company details
    const getCompany = async () => {
      if (registeredEmail) {
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
          console.log(error);
        }
      }
    };

    getCompany();
  }, [registeredEmail]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Navigation Bar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-20"
          } bg-[#45A29E]`}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 transition-all duration-300 flex flex-col justify-center items-center">
          {/* Form Card */}
          {!success && !availability ? (
            <>
              <div className="bg-[#D9D9D947] p-6 rounded-lg shadow-md w-full max-w-3xl">
                <form onSubmit={handleSubmit}>
                  {/* Render Step1 Component */}
                  <Step1 formData={formData} handleChange={handleChange} />
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className={`bg-[#45A29E] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#3C9C89] focus:outline-none focus:ring-2 focus:ring-[#45A29E]`}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              {error ? (
                <>
                  <p>{error}</p>
                </>
              ) : (
                <>
                  {availability && (
                    <>
                      <ProfileContent mentorDetails={mentor} />
                    </>
                  )}

                  {submitted && (
                    <>
                      <img src={done_icon} alt="Success" />
                      <p className="text-[#0C7075] font-bold text-2xl">
                        Profile Created Successfully
                      </p>
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
