import React, { useEffect, useState, useContext } from 'react';
import { Search } from 'lucide-react';
import { FaEdit, FaTrash } from "react-icons/fa";
import ManageCVUpdate from './ManageCVUpdate';
import ManageCVNewAdd from './ManageCVNewAdd';
import { jwtDecode } from 'jwt-decode';
import { StoreContext } from "../../Context/StoreContext.js";
import axios from 'axios';
import { toast } from "react-toastify";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase.js";

const ManageCVView = () => {
   const { url,setCvDetails,cvDetails } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUpdateCVModel, setUpdateCVModel] = useState(false);
  const [showNewCVUpload, setNewCVUpload] = useState(false);
  // const [cvDetails,setCvDetails] = useState(null);
  const [path,setPath] = useState(null);
  const [id,setId] = useState(null);

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  const handleDelete = async(exisitingPath,existingId) => {  

    try {

      const fileRef = ref(storage, exisitingPath);
      await deleteObject(fileRef);

      const cvToBeDeleted = {
        registeredEmail:registeredEmail,
        id:existingId
      };
      
      const response = await axios.put(`${url}/api/student/deleteCv`,cvToBeDeleted);
      if(response.data.success){
        setCvDetails(response.data.data);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    
    const getCvDetails = async() => {      
      const response = await axios.post(`${url}/api/student/getCvDetails`,{registeredEmail});

      if(response.data.success) {
        setCvDetails(response.data.data);
      } else {
        console.log(response.data.message);
      }
    }
    getCvDetails();
    
  },[registeredEmail,cvDetails]);

  return (
    <div className="p-4 bg-white px-6">
      {/* Search and Add New Section */}
      <div className="mt-10 flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search cv"
            className="placeholder-slate-400 pl-10 pr-4 py-2 border-cyan-600 border rounded-md w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700" onClick={() => setNewCVUpload(true)}>
          ADD NEW
        </button>
      </div>

      {/* CV Table */}
      <div className="mt-8">
        <div className="bg-gray-100 rounded-t-lg">
          <div className="grid grid-cols-4 p-4 font-medium text-gray-600">
            {/* <div className="text-left">#</div> */}
            <div className="text-center">CV Title</div>
            <div className="text-center">File Upload</div>
            <div className="text-center">Update</div>
            <div className="text-center">Delete</div>
          </div>
        </div>
        <div className="border-x border-b rounded-b-lg">
          {cvDetails && cvDetails.length > 0 ? <>
          {cvDetails.map((cv,index) => (
            <div 
              key={index} 
              className="grid grid-cols-4 p-4 border-t items-center hover:bg-gray-50"
            >
              {/* <div className="text-gray-600">{cv.number}</div> */}
              <div className="text-fuchsia-800 text-center">{cv.title}</div>
              <div className='text-center text-sky-800'>{cv.fileName}</div>
              <div className='flex justify-center'>
                <button className="text-gray-500" onClick={() => {
                  setPath(`cv/${cv.fileName}`);  
                  setId(cv._id);                
                  setUpdateCVModel(true)}}>
                  <FaEdit /> 
                </button>
              </div>
              <div className='flex justify-center'>
                <button className="text-gray-500" onClick={() => {
                  const exisitingPath = `cv/${cv.fileName}`;
                  const exisitingId = cv._id;
                  handleDelete(exisitingPath,exisitingId);
                }}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          </> : <></>}
        </div>
        {showUpdateCVModel && <ManageCVUpdate onClose={() => setUpdateCVModel(false)} cvPath={path} cvId={id}/>}
        {showNewCVUpload && <ManageCVNewAdd onClose={() => setNewCVUpload(false)} />}
      </div>
    </div>
  );
};

export default ManageCVView;
