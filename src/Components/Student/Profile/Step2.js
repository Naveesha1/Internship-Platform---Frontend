import React, { useState } from "react";

const Step2 = ({ formData, handleChange }) => {
  const [profileImgPreview, setProfileImgPreview] = useState(null);
  const [idFrontPreview, setIdFrontPreview] = useState(null);
  const [idBackPreview, setIdBackPreview] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);

      // Update previews based on the input name
      if (name === "profileImage") setProfileImgPreview(previewURL);
      if (name === "idFrontImage") setIdFrontPreview(previewURL);
      if (name === "idBackImage") setIdBackPreview(previewURL);

      // Pass the file data to the parent component
      handleChange(e);
    }
  };

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
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
        />
        {profileImgPreview && (
          <img
            src={profileImgPreview}
            alt="Profile Preview"
            className="mt-2 w-32 h-32 object-cover rounded-md border"
          />
        )}
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
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
            />
            {idFrontPreview && (
              <img
                src={idFrontPreview}
                alt="ID Front Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2 w-48">Back</label>
            <input
              type="file"
              name="idBackImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
            />
            {idBackPreview && (
              <img
                src={idBackPreview}
                alt="ID Back Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
