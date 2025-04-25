import React, { useEffect, useState, useContext } from "react";
import CreateMentorForm from "./CreateMentorForm";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import ConfirmDeleteButton from "../Helpers/ConfirmDeleteButton";

const CompanyMentorProfile = () => {
  const { url, mentorsData, setMentorsData } = useContext(StoreContext);

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;
  const name = decodedToken.name;

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [newMentor, setNewMentor] = useState({
    name: "",
    position: "",
    email: "",
    password: "",
  });

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMentor((prev) => ({ ...prev, [name]: value }));
  };

// Function to add a new mentor
const handleAddMentor = async () => {
  if(newMentor.password.length < 8){
      toast.error("Password should be at least 8 characters long");
      return;
  }
  if (
    newMentor.name &&
    newMentor.position &&
    newMentor.email &&
    newMentor.password
  ) {
    // Add company email to the mentor data
    const mentorWithCompany = {
      ...newMentor,
      registeredEmail: registeredEmail 
    };
        
    const response = await axios.post(
      `${url}/api/mentor/createMentor`,
      mentorWithCompany
    );
    
    if (response.data.success) {
      toast.success(response.data.message);
      setMentorsData((previousData) => [...previousData, newMentor]);
      setNewMentor({ name: "", position: "", email: "", password: "" });
    } else {
      toast.error(response.data.message);
    }

    setIsModalOpen(false);
  }
};


  const deleteMentor = async (email) => {
    const response = await axios.post(`${url}/api/mentor/deleteMentor`, {
      email,
      registeredEmail:registeredEmail
    });
    if (response.data.success) {
      setMentorsData((prevItems) =>
        prevItems.filter((item) => item.email !== email)
      );
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };



  useEffect(() => {
    const fetchCompanyMentors = async () => {
      const response = await axios.post(`${url}/api/mentor/getCompanyMentorsController`, {
        registeredEmail: registeredEmail
      });
      
      if (response.data.success) {
        setMentorsData(response.data.mentors);
      } else {
        toast.error("Failed to fetch mentors");
      }
    };
    fetchCompanyMentors();
  }, [registeredEmail]);



  return (
    <div className="p-2 overflow-x-auto">
      {/* Add New Admin Button */}
      <div className="mt-2 mb-4 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#45A29E] text-white px-4 py-2 rounded-lg hover:bg-[#367c79] transition-colors duration-300 position-fixed"
        >
            Create Mentor
        </button>
      </div>

      {/* Admin Table */}
      <div className="bg-gray-100 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Position</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Remove</th>
            </tr>
          </thead>
          <tbody>
            {mentorsData && mentorsData.map((mentor, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b">{mentor.mentorName || mentor.name}</td>
                <td className="py-2 px-4 border-b">{mentor.mentorPosition || mentor.position}</td>
                <td className="py-2 px-4 border-b">{mentor.mentorEmail || mentor.email}</td>
                <td className="py-2 px-4 border-b">
                  <ConfirmDeleteButton
                    onConfirm={() => deleteMentor(mentor.mentorEmail || mentor.email)}
                    icon={<FaTrash className="text-red-500 hover:text-red-700 cursor-pointer" />}
                    confirmText="Are you sure you want to delete this mentor?"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show the Add Admin Form when modal is open */}
      {isModalOpen && (
        <CreateMentorForm
          newMentor={newMentor}
          handleChange={handleChange}
          handleAddMentor={handleAddMentor}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CompanyMentorProfile;
