import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import {
  FaRegCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { StoreContext } from "../../Context/StoreContext.js";
import { jwtDecode } from "jwt-decode";

const MentorCreateStudentForm = ({
  newStudent,
  handleChange,
  closeModal,
  setNewStudent,
  refreshData, // optional: to re-fetch students after adding
}) => {
  const { url } = useContext(StoreContext);
  const [registeredIds, setRegisteredIds] = useState([]);
  const [filteredIds, setFilteredIds] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");


  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const userEmail = decodedToken.email;

  useEffect(() => {
    const getStudentRegisteredId = async () => {
      try {
        const response = await axios.get(`${url}/api/student/getStudentRegisteredId`);
        if (response.data.success) {
          setRegisteredIds(response.data.data || []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStudentRegisteredId();
  }, [url]);

  const handleIdChange = (e) => {
    handleChange(e);
    setError("");
    const input = e.target.value;
    if (input.trim() !== "") {
      const filtered = registeredIds.filter((id) =>
        id.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredIds(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredIds([]);
      setShowSuggestions(false);
    }
  };

  const fetchStudentData = async (studentId) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/api/student/getStudentProfileById`, {
        studentId,
      });
      if (response.data.success) {
        const studentData = response.data.data;
        const fields = {
          id: studentId,
          name: studentData.fullName,
          email: studentData.universityMail,
          phone: studentData.contactNumber,
          address: studentData.address || "",
        };
        Object.entries(fields).forEach(([name, value]) => {
          handleChange({ target: { name, value } });
        });
      }
    } catch (error) {
      console.log("Error fetching student data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectId = (id) => {
    handleChange({ target: { name: "id", value: id } });
    fetchStudentData(id);
    setShowSuggestions(false);
  };

  const handleAddStudent = async () => {
    if (!newStudent.id) {
      setError("Index Number is required.");
      return;
    }
    if (!registeredIds.includes(newStudent.id)) {
      setError("Invalid Index Number. Please select a valid one.");
      return;
    }
    setIsSubmitting(true);
    try {
      const studentData = {
        registrationNumber: newStudent.id,
        name: newStudent.name,
        email: newStudent.email,
        phone: newStudent.phone,
        address: newStudent.address,
        startDate: newStudent.startDate,
        endDate: newStudent.endDate,
        position: newStudent.position,
      };

      const response = await axios.post(`${url}/api/mentor/saveStudentData`, {
        registeredEmail: userEmail,
        student: studentData,
      });

      if (response.data.success) {
        alert("Student added successfully!");
        setNewStudent({});
        closeModal();
        if (refreshData) refreshData();
      } else {
        alert("Failed to add student: " + response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full mx-4">
        <h2 className="text-lg font-bold mb-4">Add New Student</h2>

        {/* Student ID Input + Suggestions */}
        <div className="relative w-full mb-2">
          <input
            type="text"
            name="id"
            placeholder="Index Number"
            value={newStudent.id || ""}
            onChange={handleIdChange}
            onFocus={() => newStudent.id && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            className={`w-full p-2 border rounded ${error ? "border-red-500" : ""}`} />
          {showSuggestions && (
            <ul className="absolute z-10 bg-white border w-full max-h-40 overflow-y-auto rounded shadow">
              {filteredIds.length > 0 ? (
                filteredIds.map((id) => (
                  <li
                    key={id}
                    onClick={() => handleSelectId(id)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {id}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No student</li>
              )}
            </ul>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-4">Loading student data...</div>
        ) : (
          <>
            <div className="relative w-full mb-2">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={newStudent.name || ""}
                readOnly
                className="w-full pl-10 p-2 border rounded bg-gray-100"
              />
            </div>

            <div className="relative w-full mb-2">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={newStudent.email || ""}
                readOnly
                className="w-full pl-10 p-2 border rounded bg-gray-100"
              />
            </div>

            <div className="relative w-full mb-2">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={newStudent.phone || ""}
                readOnly
                className="w-full pl-10 p-2 border rounded bg-gray-100"
              />
            </div>

            <div className="relative w-full mb-2">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={newStudent.address || ""}
                readOnly
                className="w-full pl-10 p-2 border rounded bg-gray-100"
              />
            </div>

            <div className="relative w-full mb-2">
              <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="date"
                name="startDate"
                value={newStudent.startDate || ""}
                onChange={handleChange}
                className="w-full pl-10 p-2 border rounded"
              />
            </div>

            <div className="relative w-full mb-2">
              <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="date"
                name="endDate"
                value={newStudent.endDate || ""}
                onChange={handleChange}
                className="w-full pl-10 p-2 border rounded"
              />
            </div>

            <div className="relative w-full mb-2">
              <input
                list="positionOptions"
                type="text"
                name="position"
                placeholder="Position"
                value={newStudent.position || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <datalist id="positionOptions">
                <option value="Front-End Developer" />
                <option value="Back-End Developer" />
                <option value="Full Stack Developer" />
                <option value="Mobile App Developer" />
                <option value="Game Developer" />
                <option value="Software Engineer" />
                <option value="Embedded Systems Developer" />
                <option value="Web Designer" />
                <option value="Web Developer" />
                <option value="UI/UX Designer" />
                <option value="WordPress Developer" />
                <option value="Data Scientist" />
                <option value="Machine Learning Engineer" />
                <option value="AI Engineer" />
                <option value="Data Analyst" />
                <option value="Deep Learning Specialist" />
                <option value="NLP Engineer" />
                <option value="DevOps Engineer" />
                <option value="Cloud Engineer" />
                <option value="Site Reliability Engineer" />
                <option value="Cloud Architect" />
                <option value="IT Support Specialist" />
                <option value="System Administrator" />
                <option value="Network Administrator" />
                <option value="Help Desk Technician" />
                <option value="Technical Support Engineer" />
                <option value="Cybersecurity Analyst" />
                <option value="Ethical Hacker" />
                <option value="Security Engineer" />
                <option value="Information Security Analyst" />
                <option value="SOC Analyst" />
                <option value="Database Administrator" />
                <option value="Data Engineer" />
                <option value="Big Data Engineer" />
                <option value="SQL Developer" />
                <option value="IoT Developer" />
                <option value="Embedded Systems Engineer" />
                <option value="Robotics Engineer" />
                <option value="Firmware Engineer" />
                <option value="QA Tester" />
                <option value="Automation Test Engineer" />
                <option value="Performance Tester" />
                <option value="Manual Tester" />
                <option value="Business Analyst" />
                <option value="Systems Analyst" />
                <option value="Product Manager" />
                <option value="Project Manager" />
                <option value="Scrum Master" />
                <option value="Tech Writer" />
                <option value="IT Consultant" />
                <option value="Blockchain Developer" />
                <option value="CRM Developer" />
                <option value="ERP Consultant" />
                <option value="IT Auditor" />
                <option value="Game Tester" />
                <option value="GIS Analyst" />
                <option value="Multimedia Developer" />
                <option value="AR/VR Developer" />
              </datalist>
            </div>

          </>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={closeModal}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddStudent}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            disabled={isLoading || isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Student"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCreateStudentForm;
