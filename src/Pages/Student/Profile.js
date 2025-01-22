import React, { useState, useContext, useEffect } from 'react';
import Sidebar from '../../Components/Student/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import Step1 from '../../Components/Student/Profile/Step1';
import Step2 from '../../Components/Student/Profile/Step2'; 
import Step3 from '../../Components/Student/Profile/Step3'; 
import { FaCheck } from 'react-icons/fa';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";
import axios from 'axios';
import { StoreContext } from "../../Context/StoreContext.js";
import {jwtDecode} from "jwt-decode";
import ProfileContent from '../../Components/Student/Profile/FullProfile.js';
import done_icon from '../../Images/done.png';


const Profile = () => {

  const { url } = useContext(StoreContext);


  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar open/close state
  const [step, setStep] = useState(1); // Step state to control the stepper
  const [loading, setLoading] = useState(false); // For handling loading state
  const [success, setSuccess] = useState(false); // For handling success status
  const [user, setUser] = useState({});// for save user details
  const [stepperVisibility,setStepperVisibility] = useState(false); // for control steps
  const [profileVisible,setProfileVisible] = useState(false); // for control profile details visibility
  const [submitted,setSubmitted] = useState(false); // for control profile details visibility
  const [error,setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = encodeURIComponent(decodedToken.email);
  const userId = encodeURIComponent(decodedToken._id);

  const [formData, setFormData] = useState({
    fullName: '',
    registrationNumber: '',
    degree: '',
    universityMail: '',
    userEmail: registeredEmail,
    contactNumber: '',
    gpa: '',
    profileImage: '',
    idFrontImage: '',
    idBackImage:'',
    skills: '',
    position: '',
    qualification: '',
    cv: '',
    certifications: '',
  });

  const [file,setFiles] = useState({
    profileImage:'',
    idFrontImage: '',
    idBackImage: '',
    cv: ''
  });

  //function for toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //function for saving details to the state variable
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFiles({...file, [name]: files[0]});
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // function for submit gathered data and move steps
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(step === 3){
    setSuccess(true);
    setStepperVisibility(true);
    setLoading(true);
    }
    if (step < 3) {
      setStep(step + 1);
    } else {

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
          console.log("Uploaded File URLs:", uploadedUrls);
        } catch (error) {
          console.error("Error uploading files:", error);
        }

        // update state variable values with access links to files
        const updatedFormData = {
          ...formData,
          idFrontImage: uploadedUrls.idFrontImage,
          idBackImage: uploadedUrls.idBackImage,
          profileImage: uploadedUrls.profileImage,
          cv: uploadedUrls.cv
        };

        // api call for saving gathered data
        const response = await axios.post(`${url}/api/student/profile`,updatedFormData);
        if(response.data.success){
          setSubmitted(true);
          console.log(response.data.success);
          
        } else {
          setError("An error occured please try again");
        }
        console.log(response.data.message);
        console.log(submitted);
        
        
      } catch (error) {
        console.error('Error submitting form', error);
      } 
    }
  };

  useEffect(()=>{
      // to check if user has sent the data
    const getStudentProfile = async()=> {      
      const response = await axios.post(`${url}/api/student/getprofile`,registeredEmail);
      if(response.data.success){
      setUser(response.data.data);
      setProfileVisible(true);
      setStepperVisibility(true);
      setSubmitted(false);
      setSuccess(true);
      } 
    } 
    getStudentProfile();

  },[userId]);


  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Navigation Bar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#45A29E]`}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 transition-all duration-300 flex flex-col justify-center items-center">

          <div className="flex justify-center mb-4">
            <div className="flex items-center">
              {stepperVisibility ? <></> : <>
              
              {/* Step 1 */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  step > 1 ? 'bg-green-500 text-white' : step === 1 ? 'bg-[#45A29E] text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step > 1 ? <FaCheck /> : '1'}
              </div>
              <div className={`w-24 h-1 ${step >= 2 ? 'bg-[#45A29E]' : 'bg-gray-300'}`}></div>
              
              {/* Step 2 */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  step > 2 ? 'bg-green-500 text-white' : step === 2 ? 'bg-[#45A29E] text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {step > 2 ? <FaCheck /> : '2'}
              </div>
              <div className={`w-24 h-1 ${step >= 3 ? 'bg-[#45A29E]' : 'bg-gray-300'}`}></div>
              
              {/* Step 3 */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  step === 3 ? 'bg-[#45A29E] text-white' : 'bg-gray-300 text-gray-600'
                }`}
              >
                {success ? <div className='w-10 h-10 flex items-center justify-center rounded-full bg-green-500'><FaCheck /></div> : '3'}
              </div>
              </>}
            </div>
          </div>

          {/* Form Card */}
          {!success ? <>
          <div className="bg-[#D9D9D947] p-6 rounded-lg shadow-md w-full max-w-3xl">
            <form onSubmit={handleSubmit}>
              {/* Render Step Components */}
              {step === 1 && <Step1 formData={formData} handleChange={handleChange} />}
              {step === 2 && <Step2 formData={formData} handleChange={handleChange} />}
              {step === 3 && <Step3 formData={formData} handleChange={handleChange}/>}

              

              {/* Next/Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`bg-[#45A29E] text-white px-6 py-2 rounded-md shadow-md hover:bg-[#3C9C89] focus:outline-none focus:ring-2 focus:ring-[#45A29E] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : step < 3 ? 'Next' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
          </> : 
          (
          <>
          {error ? <><p>{error}</p></>:<>
          {submitted && <>
            <img src={done_icon} alt="Success" />
            <p className="text-[#0C7075] font-bold text-2xl">Profile Created Successfully</p>
          </>}
          {profileVisible && <>
          <ProfileContent userDetails={user}/>
          </> }
          </>}
          </>) }
        </div>
      </div>
    </div>
  );
};

export default Profile;

