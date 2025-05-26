import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoDocumentOutline } from "react-icons/io5";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";
import axios from 'axios';
import { StoreContext } from "../../Context/StoreContext.js";
import { jwtDecode } from 'jwt-decode';
import { toast } from "react-toastify";

const ManageCVNewAdd = ({ onClose }) => {
  const { url, setCvDetails } = useContext(StoreContext);
  const [cvTitle, setCvTitle] = useState('');
  const [cv, setCV] = useState(null);
  const [file, setFiles] = useState({ cv: '' });
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      setUserEmail(decodedToken.email);
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/");
    }
  }, [navigate]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      if (droppedFile.size <= 2 * 1024 * 1024) {
        setCV(droppedFile);
      } else {
        alert('File size must be less than 2MB');
      }
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const { name, files } = e.target;
    if (selectedFile && selectedFile.type === 'application/pdf') {
      if (selectedFile.size <= 2 * 1024 * 1024) {
        setCV(selectedFile);
        setFiles({ ...file, [name]: files[0] });
      } else {
        alert('File size must be less than 2MB');
      }
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

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

      const cvData = {
        title: cvTitle,
        fileName: cv.name,
        cvUrl: uploadedUrls.cv,
        registeredEmail: userEmail,
      };

      if (uploadedUrls.cv) {
        const response = await axios.put(`${url}/api/student/addNewCvDetails`, cvData);
        if (response.data.success) {
          setCvDetails(response.data.data);
          toast.success(response.data.message);
          onClose();
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Something went wrong during upload.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-4">
        <h2 className="text-xl font-semibold mb-4">Upload Your CV</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">CV Title</label>
            <input
              type="text"
              value={cvTitle}
              onChange={(e) => setCvTitle(e.target.value)}
              placeholder="Enter Name For CV"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-cyan-400 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500 transition-colors"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 text-cyan-700">
                <IoDocumentOutline className='size-12' />
              </div>
              <p className="text-gray-600">Drag and Drop your CV here</p>
              <p className="text-gray-400">OR</p>
              <div>
                <input
                  type="file"
                  name="cv"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="text-cyan-600 hover:text-cyan-700 cursor-pointer font-medium"
                >
                  Browse Files
                </label>
              </div>
              {cv && (
                <p className="text-sky-500 text-xs">Selected: {cv.name}</p>
              )}
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>Select a .PDF format document, and max file size is 2MB</p>
            <p>
              You can compress your PDF file from{' '}
              <a
                href="https://www.ilovepdf.com"
                className="text-cyan-600 hover:text-cyan-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                ilovepdf.com
              </a>
            </p>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={handleUpload}
              className={`px-6 py-2 rounded-md text-white transition-colors ${
                !file || !cvTitle
                  ? 'bg-cyan-600 cursor-not-allowed'
                  : 'bg-cyan-500 hover:bg-cyan-600'
              }`}
              disabled={!file || !cvTitle}
            >
              UPLOAD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCVNewAdd;
