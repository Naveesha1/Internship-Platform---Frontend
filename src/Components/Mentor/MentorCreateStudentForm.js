import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { StoreContext } from "../../Context/StoreContext.js";

const MentorCreateStudentForm = ({
  newStudent,
  handleChange,
  handleAddStudent,
  closeModal,
}) => {
  const { url } = useContext(StoreContext);
  const [registeredIds, setRegisteredIds] = useState([]);
  const [filteredIds, setFilteredIds] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const getStudentRegisteredId = async () => {
      try {
        const response = await axios.get(
          `${url}/api/student/getStudentRegisteredId`
        );
        if (response.data.success) {
          setRegisteredIds(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStudentRegisteredId();
  }, []);

  // Handle typing and filtering IDs
  const handleIdChange = (e) => {
    handleChange(e); // update parent state
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

  // Handle clicking suggestion
  const handleSelectId = (id) => {
    handleChange({ target: { name: "id", value: id } }); // update parent state
    setShowSuggestions(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full mx-4">
        <h2 className="text-lg font-bold mb-4">Add New Student</h2>

        {/* Searchable Input */}
        <div className="relative w-full mb-2">
          <input
            type="text"
            name="id"
            placeholder="Index Number"
            value={newStudent.id}
            onChange={handleIdChange}
            onFocus={() => {
              if (newStudent.id !== "") setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            className="w-full p-2 border rounded"
          />
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

        {/* Other fields */}
        <div className="relative w-full mb-2">
          <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="date"
            name="startDate"
            value={newStudent.startDate}
            onChange={handleChange}
            className="w-full pl-10 p-2 border rounded"
          />
        </div>

        <div className="relative w-full mb-2">
          <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="date"
            name="endDate"
            value={newStudent.endDate}
            onChange={handleChange}
            className="w-full pl-10 p-2 border rounded"
          />
        </div>

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={newStudent.position}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />

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
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorCreateStudentForm;
