import React from 'react';

const Step1 = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Full name with initials</label>
        <input 
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          required
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Registration Number</label>
        <input 
          type="text"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          required
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Degree</label>
        <input
          type="text"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          required
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">University Mail</label>
        <input
          type="email"
          name="universityMail"
          value={formData.universityMail}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          required
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Contact Number</label>
        <input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          required
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Average GPA</label>
        <input
          type="number"
          name="gpa"
          value={formData.gpa}
          onChange={(e) => {
            const value = Math.max(2.0, Math.min(4.0, Number(e.target.value))); // Restrict value between 0 and 5
            handleChange({ target: { name: 'gpa', value } });
          }}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          required
        />
      </div>
    </>
  );
};

export default Step1;
