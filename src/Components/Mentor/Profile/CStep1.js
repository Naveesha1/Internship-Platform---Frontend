import React, { useState } from "react";

const CStep1 = ({ formData, handleChange , details}) => {
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
        <label className="block text-gray-700 mr-4 w-48">
          Company
        </label>
        <input
          type="text"
          name="company"
          value={details.companyName}
          onChange={handleChange}
          className="w-full border text-gray-600 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder="Place your company name here"
          disabled
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Position</label>
        <input
          type="text"
          name="position"
          value={details.position}
          onChange={handleChange}
          className="w-full border text-gray-600 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder="Place your rating level out of 5"
          disabled
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder="Place your industry here"
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
    </>
  );
};

export default CStep1;
