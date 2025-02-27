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

const CompanyProfilePage = () => {
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  const { url } = useContext(StoreContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar open/close state
  const [step, setStep] = useState(1); // Step state to control the stepper
  const [loading, setLoading] = useState(false); // For handling loading state
  const [success, setSuccess] = useState(false); // For handling success status
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
    registeredEmail: registeredEmail,
  });

  const [file, setFiles] = useState({
    logo: "",
    document: "",
  });

  // for toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // for handle the change in inputs
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFiles({ ...file, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // for submitted form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 2) {
      setLoading(true);
      setSuccess(true);
      setStepperVisibility(true);
      try {
        // upload each file into the firebase bucket
        const uploadedUrls = {};
        try {
          for (const key in file) {
            if (file[key]) {
              const fileRef = ref(storage, `${key}/${file[key].name}`);
              await uploadBytes(fileRef, file[key]);
              const url = await getDownloadURL(fileRef);
              uploadedUrls[key] = url;
            }
          }
        } catch (error) {
          console.error("Error uploading files:", error);
        }

        // update state variable values with access links to files
        const updatedFormData = {
          ...formData,
          companyLogo: uploadedUrls.logo,
          companyDocument: uploadedUrls.document,
        };

        // api call for saving gathered data
        const response = await axios.post(
          `${url}/api/company/createprofile`,
          updatedFormData
        );
        if (response.data.success) {
          console.log(response.data.message);
          setSubmitted(true);
        } else {
          setError(response.data.message);
        }
        console.log(response.data.message);
      } catch (error) {
        console.error("Error submitting form", error);
      }
    } else {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    // for checking availability of company details
    const getCompany = async () => {
      if (registeredEmail) {
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
          {/* Stepper */}
          {stepperVisibility ? (
            <></>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <div className="flex items-center">
                  {/* Step 1 */}
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
                  <div
                    className={`w-24 h-1 ${
                      step >= 2 ? "bg-[#45A29E]" : "bg-gray-300"
                    }`}
                  ></div>

                  {/* Step 2 */}
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
            </>
          )}

          {/* Form Card */}
          {!success && !availability ? (
            <>
              <div className="bg-[#D9D9D947] p-6 rounded-lg shadow-md w-full max-w-3xl">
                <form onSubmit={handleSubmit}>
                  {/* Render Step Components */}
                  {step === 1 && (
                    <Step1 formData={formData} handleChange={handleChange} />
                  )}
                  {step === 2 && (
                    <Step2 formData={formData} handleChange={handleChange} />
                  )}

                  {/* Next/Submit Button */}
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
                      <ProfileContent companyDetails={company} />
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

export default CompanyProfilePage;
