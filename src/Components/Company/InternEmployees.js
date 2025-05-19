import React, { useEffect, useState, useContext } from "react";
import CreateInternEmployee from "./CreateInternEmployee";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import ConfirmDeleteButton from "../Helpers/ConfirmDeleteButton";
import { useNavigate } from 'react-router-dom';


const InternEmployees = (mentor) => {
  const { url } = useContext(StoreContext);

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;
  const name = decodedToken.name;
  const navigate = useNavigate();
  const [newStudent, setNewStudent] = useState({
      registrationNumber: "",
      name: "",
      position: "",
      startDate: "",
      endDate: "",
      email: "",
      phone: "",
      address: "",
    });

  
  // State to control modal visibility
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [position, setPosition] = useState("");
//   const [newMentor, setNewMentor] = useState({
//     name: "",
//     position: "",
//     email: "",
//     password: "",
//   });
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  // Function to handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewMentor((prev) => ({ ...prev, [name]: value }));
//   };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   const openModal = () => {
    setShowModal(true);
  };

   const closeModal = () => {
    setShowModal(false);
  };

  // Function to add a new mentor
//   const handleAddMentor = async () => {
//     if(newMentor.password.length < 8){
//         toast.error("Password should be at least 8 characters long");
//         return;
//     }
//     if (
//       newMentor.name &&
//       newMentor.position &&
//       newMentor.email &&
//       newMentor.password
//     ) {
//       // Add company email to the mentor data
//       const mentorWithCompany = {
//         ...newMentor,
//         registeredEmail: registeredEmail 
//       };

//       const response = await axios.post(
//         `${url}/api/mentor/createMentor`,
//         mentorWithCompany
//       );
      
//       if (response.data.success) {
//         toast.success(response.data.message);
//         setMentorsData((previousData) => [...previousData, newMentor]);
//         setNewMentor({ name: "", position: "", email: "", password: "" });
//       } else {
//         toast.error(response.data.message);
//       }

//       setIsModalOpen(false);
//     }
//   };

  // Function to delete a mentor
  const removeStudent = async (email) => {
    const response = await axios.post(`${url}/api/mentor/removeStudent`, {
      email,
      registeredEmail:mentor.mentor.mentorEmail
    });
    if (response.data.success) {
      setStudents((prevItems) =>
        prevItems.filter((item) => item.email !== email)
      );
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  // Fetch mentors data when the component mounts
//   useEffect(() => {
//     const fetchCompanyMentors = async () => {
//       const response = await axios.post(`${url}/api/mentor/getCompanyMentorsController`, {
//         registeredEmail: registeredEmail
//       });
      
//       if (response.data.success) {
//         setMentorsData(response.data.mentors);
//       } else {
//         toast.error("Failed to fetch mentors");
//       }
//     };
//     fetchCompanyMentors();
//   }, [registeredEmail]);

const fetchStudents = async () => {
    try {
      const response = await axios.post(`${url}/api/mentor/getAllStudent`, {
        registeredEmail: mentor.mentor.mentorEmail
      });
      
      if (response.data.success) {
        setStudents(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch students. Please try again later.");
      console.error("Error fetching students:", err);
    }
  };

const refreshData = () => {
     setNewStudent({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    startDate: '',
    endDate: '',
    position: '',
  });
    fetchStudents();
}

useEffect(() => {
  fetchStudents();
},[token])

  return (
    <div className="p-2 overflow-x-auto">
      {/* Add New Admin Button */}
      <div className="mt-2 mb-4 flex justify-between">
        <div>
        <h2 className="text-md font-semibold text-gray-800 mb-2">
            Mentor Name: <span className="text-blue-600">{mentor.mentor.mentorName}</span>
        </h2>
        <h2 className="text-md text-gray-700">
            Position: <span className="text-green-600 font-medium">{mentor.mentor.mentorPosition}</span>
        </h2>
        </div>

        <button
          onClick={openModal}
          className="bg-[#45A29E] text-white px-4 py-2 rounded-lg hover:bg-[#367c79] transition-colors duration-300 position-fixed"
        >
            Assign Students
        </button>
      </div>

      {/* Admin Table */}
      <div className="bg-gray-100 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left py-3 px-4">University ID</th>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Position</th>
              <th className="text-left py-3 px-4">Remove</th>
            </tr>
          </thead>
          <tbody>
            {students ? students.map((student, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b">{student.registrationNumber}</td>
                <td className="py-2 px-4 border-b">{student.name}</td>
                <td className="py-2 px-4 border-b">{student.email}</td>
                <td className="py-2 px-4 border-b">{student.position}</td>
                <td className="py-2 px-4 border-b">
                  <ConfirmDeleteButton
                    onConfirm={() => removeStudent(student.email)}
                    icon={<FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />}
                    confirmText="Are you sure you want to remove this student?"
                  />
                </td>
              </tr>
            )) : 
            <>
            <tr><td>No students to be found</td></tr>
            </>}
          </tbody>
        </table>
      </div>

      {/* Show the Add Admin Form when modal is open */}
      {showModal && (
        <CreateInternEmployee
          newMentor={mentor.mentor}
          closeModal={closeModal}
          handleChange={handleChange}
          newStudent={newStudent}
          refreshData={refreshData}

        />
      )}
    </div>
  );
};

export default InternEmployees;
