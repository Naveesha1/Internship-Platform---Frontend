import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext.js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CvSelectionModal = ({ isOpen, setIsOpen, onSubmit }) => {
  const { selectedInternship, cvDetails, url, setCvDetails } =
    useContext(StoreContext);

  const [selectedCv, setSelectedCv] = useState("");

  const handleSubmit = () => {
    if (!selectedCv) {
      alert("Please select a CV");
      return;
    }
    onSubmit(selectedCv);
    setSelectedCv("");
  };

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  useEffect(() => {
    const getCvDetails = async () => {
      const response = await axios.post(`${url}/api/student/getCvDetails`, {
        registeredEmail,
      });

      if (response.data.success) {
        setCvDetails(response.data.data);
      } else {
        console.log(response.data.message);
      }
    };
    getCvDetails();
  }, [registeredEmail]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-200 rounded-lg p-8 w-[500px] relative">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Modal content */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {selectedInternship.position}
          </h2>

          <div className="space-y-4">
            <h3 className="text-gray-700">Select CV</h3>
            <select
              value={selectedCv}
              onChange={(e) => setSelectedCv(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded bg-white"
            >
              <option value="">Choose a CV</option>
              {/* <option value="cv1">CV 1</option>
              <option value="cv2">CV 2</option>
              <option value="cv3">CV 3</option> */}

              {cvDetails ? (
                <>
                  {cvDetails.map((cv, index) => (
                    <option key={index} value={cv.cvUrl}>
                      {cv.fileName}
                    </option>
                  ))}
                </>
              ) : (
                <></>
              )}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-teal-500 text-white px-12 py-2 rounded-full hover:bg-teal-600"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvSelectionModal;
