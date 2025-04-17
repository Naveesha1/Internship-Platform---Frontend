// CreateAdminForm.js
import React from "react";

const CreateMentorForm = ({
  newMentor,
  handleChange,
  handleAddMentor,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Create New Mentor</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newMentor.name}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={newMentor.position}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newMentor.email}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newMentor.password}
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
            onClick={handleAddMentor}
            className="bg-[#45A29E] text-white px-4 py-2 rounded-lg hover:bg-[#367c79] transition-colors"
          >
            Create Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMentorForm;
