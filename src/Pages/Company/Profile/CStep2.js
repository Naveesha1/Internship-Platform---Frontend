import React from "react";

const Step2 = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4 items-center">
        <label className="block text-gray-700 mb-4 w-48">
          Upload Company Logo
        </label>
        <input
          type="file"
          name="compa"
          accept="image/*"
          onChange={handleChange}
          className="w-full border border-gray-300 p-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
        />
      </div>
      <div className="mb-4 items-center">
  <label className="block text-gray-700 mb-3 w-48 mt-6">
    Company Recognize Document
  </label>
  <div className="flex flex-col">
    {/* Single Document Upload */}
    <label className="block text-gray-700 mb-2 w-48"></label>
    <input
      type="file"
      name="companyDocument"
      accept=".pdf,.doc,.docx,image/*"
      onChange={handleChange}
      className="w-full border border-gray-300 p-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
    />
  </div>
</div>

    </>
  );
};

export default Step2;
