import React from "react";

const Step2 = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4 items-center">
        <label className="block text-gray-700 mb-4 w-48">
          Upload Your Profile Photo
        </label>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
        />
      </div>
      <div className="mb-4 items-center">
        <label className="block text-gray-700 mb-3 w-48 mt-6">
          Upload Your University ID
        </label>
        <div className="flex gap-20">
          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2 w-48">Front</label>
            <input
              type="file"
              name="idFrontImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
            />{" "}
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2 w-48">Back</label>
            <input
              type="file"
              name="idBackImage"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
