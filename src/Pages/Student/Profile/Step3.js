import React from 'react';

const Step3 = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Add Your Skills</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Prefer Intern Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Qualifications</label>
        <input
          type="text"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
        />
      </div>
      <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-4 w-48">Add Your CV</label>
            <input
              type="file"
              name="cv"
              accept="pdf/*"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
            />
          </div>
    </>
  );
};

export default Step3;
