import React, { useEffect, useContext, useState } from "react";
import Sidebar from "../../Components/Company/CSidebar.js";
import Navbar from "../../Components/Navbar/Navbar";
import Step1 from "../../Components/Company/Profile/CStep1.js";
import Step2 from "../../Components/Company/Profile/CStep2.js";
import { StoreContext } from "../../Context/StoreContext.js";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";
import { jwtDecode } from "jwt-decode";
import done_icon from "../../Images/done.png";
import ProfileContent from "../../Components/Company/Profile/CompanyProfile.js";
import { useNavigate } from "react-router-dom";

const CompanyProfilePage = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const [userReady, setUserReady] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [company, setCompany] = useState({});
  const [availability, setAvailability] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [stepperVisibility, setStepperVisibility] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    rating: "",
    industry: "",
    companyEmail: "",
    contactNumber: "",
    location: "",
    aboutUs: "",
    vision: "",
    mission: "",
    companyLogo: "",
    companyDocument: "",
    positions: "",
    verify: null,
    registeredEmail: "",
  });

  const [file, setFiles] = useState({
    logo: "",
    document: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setRegisteredEmail(decoded.email);
      setFormData((prev) => ({ ...prev, registeredEmail: decoded.email }));
      setUserReady(true);
    } catch (err) {
      localStorage.removeItem("authToken");
      navigate("/");
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFiles({ ...file, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 2) {
      setLoading(true);
      setSuccess(true);
      setStepperVisibility(true);
      try {
        const uploadedUrls = {};
        for (const key in file) {
          if (file[key]) {
            const fileRef = ref(storage, `${key}/${file[key].name}`);
            await uploadBytes(fileRef, file[key]);
            const url = await getDownloadURL(fileRef);
            uploadedUrls[key] = url;
          }
        }

        const updatedFormData = {
          ...formData,
          companyLogo: uploadedUrls.logo,
          companyDocument: uploadedUrls.document,
        };

        const response = await axios.post(`${url}/api/company/createprofile`, updatedFormData);

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
    } else {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    if (!userReady || !registeredEmail) return;

    const getCompany = async () => {
      try {
        const response = await axios.post(`${url}/api/company/getCompany`, {
          registeredEmail,
        });
        if (response.data.success) {
          setCompany(response.data.data);
          setSuccess(true);
          setAvailability(true);
          setSubmitted(false);
          setStepperVisibility(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCompany();
  }, [userReady, registeredEmail, url]);

  if (!userReady) return null; // Prevents rendering before auth check

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className={`transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"} bg-[#45A29E]`}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        <div className="flex-1 p-6 transition-all duration-300 flex flex-col justify-center items-center">
          {stepperVisibility ? null : (
            <div className="flex justify-center mb-4">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    step > 1
                      ? "bg-green-500 text-white"
                      : step === 1
                      ? "bg-[#45A29E] text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step > 1 ? <FaCheck /> : "1"}
                </div>
                <div className={`w-24 h-1 ${step >= 2 ? "bg-[#45A29E]" : "bg-gray-300"}`}></div>
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${
                    success
                      ? "bg-green-500 text-white"
                      : step === 2
                      ? "bg-[#45A29E] text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {success ? <FaCheck /> : "2"}
                </div>
              </div>
            </div>
          )}

          {!success && !availability ? (
            <div className="bg-[#D9D9D947] p-6 rounded-lg shadow-md w-full max-w-3xl">
              <form onSubmit={handleSubmit}>
                {step === 1 && <Step1 formData={formData} handleChange={handleChange} />}
                {step === 2 && <Step2 formData={formData} handleChange={handleChange} />}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`bg-[#45A29E] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#3C9C89] focus:outline-none focus:ring-2 focus:ring-[#45A29E] ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : step < 2 ? "Next" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              {availability && <ProfileContent companyDetails={company} />}
              {submitted && (
                <>
                  <img src={done_icon} alt="Success" />
                  <p className="text-[#0C7075] font-bold text-2xl">Profile Created Successfully</p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
