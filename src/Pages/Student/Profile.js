import React, { useState } from 'react';
import Sidebar from '../../Components/Student/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import Step1 from './Profile/Step1';
import Step2 from './Profile/Step2'; 
import Step3 from './Profile/Step3'; 
import { FaCheck } from 'react-icons/fa';
import done_icon from '../../Images/done.png'


const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manage sidebar open/close state
  const [step, setStep] = useState(1); // Step state to control the stepper
  const [loading, setLoading] = useState(false); // For handling loading state
  const [error, setError] = useState(null); // For handling errors
  const [success, setSuccess] = useState(false); // For handling success status

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  const [formData, setFormData] = useState({
    fullName: '',
    registrationNumber: '',
    degree: '',
    universityMail: '',
    contactNumber: '',
    gpa: '',
    profileImage: null, // Add field for ID image in the form state
    idFrontImage: null,
    idBackImage: null,
    skills: '',
    position: '',
    qualification: '',
    cv: null
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] }); // Handle file upload
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if(step == 3){
    setSuccess(true)
    }
    if (step < 3) {
      setStep(step + 1); // Move to the next step
    } else {
      // When we are at Step 3, submit the form
      setLoading(true); // Show loading spinner or disable button
      try {
        // Prepare data to send
        const formDataToSend = new FormData();
        
        // Append each field to the FormData object
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }

        // Make an API request (replace URL with your actual endpoint)
        const response = await fetch('https://your-api-endpoint.com/submit', {
          method: 'POST',
          body: formDataToSend,
        });

        if (!response.ok) {
          
          throw new Error('Failed to submit data');
        }

        // If successful
       
        console.log('Form submitted successfully');
      } catch (error) {
        setError(error.message); // Handle any errors
        console.error('Error submitting form:', error);
      } finally {
        setLoading(false); // Hide loading spinner
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Navigation Bar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#45A29E]`}
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 transition-all duration-300 flex flex-col justify-center items-center">
          {/* Stepper */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center">
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
          </> : <>
          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Success Message */}
          <img src={done_icon}/>
          <p className="text-[#0C7075] font-bold text-2xl">Details Under Review</p>
          </>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
