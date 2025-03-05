import React, { useState } from "react";

const CStep1 = ({ formData, handleChange }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);
      if (name === "sign") setPreview(previewURL);

      handleChange(e);
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">
          Name with initials
        </label>
        <input
          type="text"
          name="mentorName"
          value={formData.mentorName}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder="Place your company name here"
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder="Place your rating level out of 5"
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder="Place your industry here"
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Personal email</label>
        <input
          type="email"
          name="personalEmail"
          value={formData.personalEmail}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder="Place your company email here"
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
          placeholder="Place your company contact number here"
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mb-4 w-48">
          Upload Your Digital Signature
        </label>
        <input
          type="file"
          name="sign"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full ml-4 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
        />
      </div>
      {preview && (
        <img
          src={preview}
          alt="Sign Preview"
          className="mt-1 ml-40 w-32 h-32 object-cover rounded-md border"
        />
      )}
    </>
  );
};

export default CStep1;
