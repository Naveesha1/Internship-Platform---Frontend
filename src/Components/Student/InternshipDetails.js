import React, { useState, useContext, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdShoppingBag } from "react-icons/md";
import CvSelectionModal from "../../Components/Student/CVSelectionModal";
import { StoreContext } from "../../Context/StoreContext.js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { formatDistanceToNow } from 'date-fns';

const InternshipDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [gpa, setGpa] = useState("");

  const { selectedInternship, url, setSelectedInternship } = useContext(StoreContext);
  const formattedDate = formatDistanceToNow(new Date(selectedInternship.date), { addSuffix: true });

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;
  const role = decodedToken.role;

  const handleApplySubmit = async (selectedCvId) => {
    try {
      const applicationDetails = {
        userEmail: registeredEmail,
        userName: decodedToken.name,
        userCv: selectedCvId,
        userGpa: gpa,
        position: selectedInternship.position,
        companyName: selectedInternship.companyName,
        companyEmail: selectedInternship.companyEmail,
        companyRegisteredEmail: selectedInternship.registeredEmail,
        internshipId: selectedInternship._id,
      };
      const response = await axios.post(
        `${url}/api/student/applications`,
        applicationDetails
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    const getStudentProfile = async () => {
      const response = await axios.post(`${url}/api/student/getprofile`, {
        registeredEmail,
      });
      if (response.data.success) {
        setGpa(response.data.data.gpa);
      } else {
        setGpa("Not Added");
      }
    };
    getStudentProfile();
  }, [registeredEmail]);

  useEffect(() => {
    if (selectedInternship) {
      localStorage.setItem(
        "selectedInternship",
        JSON.stringify(selectedInternship)
      );
    }
  }, [selectedInternship]);

  useEffect(() => {
    const storedInternship = localStorage.getItem("selectedInternship");
    if (!selectedInternship && storedInternship) {
      setSelectedInternship(JSON.parse(storedInternship));
    }
  }, [selectedInternship]);
  return (
    <div className="flex justify-center items-center min-h-screen m-4">
      {selectedInternship ? (
        <>
          <div className="box-border w-full max-w-[900px] h-auto p-6 border rounded-sm shadow-md bg-slate-100">
            {/* Card content */}
            <div className="flex items-center mb-4">
              <img
                src={selectedInternship.companyLogo}
                alt="Company Logo"
                className="h-16 w-18 mr-4 border-2 border-slate-200 bg-white"
              />
              <h2 className="font-serif text-xl text-cyan-600">
                {selectedInternship.companyName}
              </h2>
            </div>
            <div className="">
              <h1 className="font-serif text-2xl  font-semibold mb-2">
                {selectedInternship.position}
              </h1>
              {/* <p className="text-sm text-slate-500">
                <span className="text-cyan-600">{formattedDate}</span>{" "}
                &nbsp; • &nbsp; 50 Applications
              </p> */}
            </div>

            <div className="text-gray-600 mb-4 mt-4">
              <p className="flex items-center">
                <span className="mr-2">
                  <MdShoppingBag />
                </span>
                {selectedInternship.workMode}
              </p>
              <p className="flex items-center">
                <span className="mr-2">
                  <IoLocationSharp />
                </span>
                {selectedInternship.location}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-gray-700">About Internship</h3>
              <p className="text-gray-600 text-sm">
                {selectedInternship.aboutIntern}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-gray-700">Responsibilities</h3>
              <ul className="text-gray-600 text-sm list-disc ml-5">
                {selectedInternship.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-gray-700">Requirements</h3>
              <ul className="text-gray-600 text-sm list-disc ml-5">
                {selectedInternship.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end">
              {role === "Admin" ? (
                <></>
              ) : (
                <>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="bg-teal-600 text-white px-12 py-2 rounded-full shadow-md hover:bg-teal-700"
                  >
                    Apply
                  </button>
                </>
              )}
            </div>

            <CvSelectionModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onSubmit={handleApplySubmit}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InternshipDetails;
