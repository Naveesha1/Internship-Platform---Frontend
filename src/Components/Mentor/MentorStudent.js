import React, { useState, useEffect, useContext } from "react";
import { FaUserGraduate, FaCalendarAlt, FaFileAlt, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import MentorCreateStudentForm from "./MentorCreateStudentForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { MdEmail } from "react-icons/md";


// Main StudentList component
const MentorStudent = () => {
  const { url } = useContext(StoreContext);
  const [students, setStudents] = useState([
    {
      id: "215036R",
      name: "Ekanayake HGNK",
      position: "Software Engineer",
      startDate: "01/03/2025",
      endDate: "30/09/2025",
      image: "/path/to/image1.jpg",
      email: "ekanayake@gmail.com",
      phone: "+94 77 123 4567",
      address: "Kandy, Sri Lanka"
    },
    {
      id: "215036R",
      name: "Heelibathdeniya HNB",
      position: "Business Analysis",
      startDate: "01/03/2025",
      endDate: "30/09/2025",
      image: "/path/to/image2.jpg",
      email: "ekanayake@gmail.com",
      phone: "+94 77 123 4567",
      address: "Kandy, Sri Lanka"
    },
    {
      id: "215036R",
      name: "Aruna AMK",
      position: "Software Engineer",
      startDate: "01/03/2025",
      endDate: "30/09/2025",
      image: "/path/to/image3.jpg",
      email: "ekanayake@gmail.com",
      phone: "+94 77 123 4567",
      address: "Kandy, Sri Lanka"
    },
    {
      id: "215036R",
      name: "Ekanayake HGNK",
      position: "Software Engineer",
      startDate: "01/03/2025",
      endDate: "30/09/2025",
      image: "/path/to/image4.jpg",
      email: "ekanayake@gmail.com",
      phone: "+94 77 123 4567",
      address: "Kandy, Sri Lanka"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    position: "",
    startDate: "",
    endDate: "",
    email: "",
    phone: "",
    address: "",
  });

  const filteredStudents = students.filter(
    (student) =>
      // student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = () => {
    // Validate form
    if (
      !newStudent.id ||
      !newStudent.startDate ||
      !newStudent.endDate ||
      !newStudent.position ||
      !newStudent.email ||
      !newStudent.phone ||
      !newStudent.address
    ) {
      alert("Please fill all required fields");
      return;
    }

    // Format dates to DD/MM/YYYY
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const formattedStudent = {
      ...newStudent,
      startDate: formatDate(newStudent.startDate),
      endDate: formatDate(newStudent.endDate),
      image: newStudent.image,
    };

    // Add new student
    setStudents([...students, formattedStudent]);

    // Reset form and close modal
    setNewStudent({
      id: "",
      position: "",
      startDate: "",
      endDate: "",
      email: "",
      phone: "",
      address: "",
    });
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //Get student details
  useEffect(() => {
    const studentId = newStudent.id;
    const getStudent = async () => {
      const response = await axios.post(`${url}/api/student/getStudentName`, {
        studentId,
      });
      if (response.data.success) {
        setNewStudent((prevState) => ({
          ...prevState,
          name: response.data.data,
        }));
      }
    };
    getStudent();
  }, [newStudent.id.length == 7]);

  return (
    <div className="p-4 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 mt-8">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 pl-4 pr-10 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-3 top-2.5 text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <button
          onClick={openModal}
          className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out flex items-center"
        >
          Add Student
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student, index) => (
          <StudentCard key={index} student={student} />
        ))}
      </div>

      {showModal && (
        <MentorCreateStudentForm
          newStudent={newStudent}
          handleChange={handleChange}
          handleAddStudent={handleAddStudent}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
const StudentCard = ({ student }) => {
  const [isMonthlyReportActive, setIsMonthlyReportActive] = useState(false);
  const [availableMonths, setAvailableMonths] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkMonthlyReportAvailability();
    generateAvailableMonthsList();
    const timer = setInterval(() => {
      checkMonthlyReportAvailability();
      generateAvailableMonthsList();
    }, 86400000);
    return () => clearInterval(timer);
  }, []);

  const checkMonthlyReportAvailability = () => {
    const today = new Date();
    const startDate = new Date(convertToDateFormat(student.startDate));
    const oneMonthLater = new Date(startDate);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    setIsMonthlyReportActive(today >= oneMonthLater);
  };

  const generateAvailableMonthsList = () => {
    const months = [];
    const today = new Date();
    const startDate = new Date(convertToDateFormat(student.startDate));
    const endDate = new Date(convertToDateFormat(student.endDate));
    let currentDate = new Date(startDate);
    currentDate.setMonth(currentDate.getMonth() + 1);
    while (currentDate <= today && currentDate <= endDate) {
      months.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    setAvailableMonths(months);
  };

  const convertToDateFormat = (dateString) => {
    const parts = dateString.split("/");
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  const handleReportClick = () => {
    if (!isMonthlyReportActive) {
      alert("Monthly reports will be available one month after the start date");
      return;
    }
    if (availableMonths.length === 0) {
      alert("No monthly reports available yet");
      return;
    }
    
    // Instead of just navigating to the page, pass the student data as state
    navigate("/MCreateMonthlyDocPage", {
      state: {
        student: student,
        availableMonths: availableMonths
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4 flex items-center">
        <div className="h-14 w-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <img
            src={student.image}
            alt={student.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = student.name.charAt(0);
            }}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
          <p className="text-sm text-gray-600">{student.id}</p>
        </div>
      </div>

      <div className="px-4 pb-2 text-sm text-gray-700">
        <p className="text-teal-600 font-medium">{student.position}</p>
        <div className="mt-2">
          <div className="flex justify-between">
            <span>Start</span>
            <span>{student.startDate}</span>
          </div>
          <div className="flex justify-between">
            <span>End</span>
            <span>{student.endDate}</span>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2 text-gray-700">
            <MdEmail className="text-lg text-teal-600" />
            <span>{student.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaPhoneAlt className="text-sm text-teal-600" />
            <span>{student.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-lg text-teal-600" />
            <span>{student.address}</span>
          </div>
        </div>
      </div>

      <div className="p-4 pt-2">
        <button
          onClick={handleReportClick}
          className={`w-full py-2 px-4 rounded-md transition duration-300 ease-in-out ${isMonthlyReportActive
              ? "bg-teal-600 hover:bg-teal-700 text-white"
              : "bg-gray-400 cursor-not-allowed text-white"
            }`}
        >
          Monthly Report
        </button>
      </div>
    </div>
  );
};


export default MentorStudent;
