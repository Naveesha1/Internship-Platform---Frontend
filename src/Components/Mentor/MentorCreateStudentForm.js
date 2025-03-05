import React from "react";
import { FaRegCalendarAlt } from 'react-icons/fa';

const MentorCreateStudentForm = ({ newStudent, handleChange, handleAddStudent, closeModal }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-full mx-4">
                <h2 className="text-lg font-bold mb-4">Add New Student</h2>
                <input
                    type="text"
                    name="id"
                    placeholder="Index Number"
                    value={newStudent.id}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newStudent.name}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                />
                <div className="relative w-full mb-2">
                    <FaRegCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="date"
                        name="startDate"
                        placeholder="Start Date"
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
                        placeholder="End Date"
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
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL (optional)"
                    value={newStudent.image}
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