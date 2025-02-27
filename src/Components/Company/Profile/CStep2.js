import React, { useState } from "react";

const Step2 = ({ formData, handleChange }) => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [documentPreview, setDocumentPreview] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const previewURL = URL.createObjectURL(file);

      // Update previews based on the input name
      if (name === "logo") setLogoPreview(previewURL);
      if (name === "document") setDocumentPreview(previewURL);

      // Pass the file data to the parent component
      handleChange(e);
    }
  };
  return (
    <>
      <div className="mb-4 items-center">
        <label className="block text-gray-700 mb-4 w-48">
          Upload Company Logo
        </label>
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
        />
        {logoPreview && (
          <img
            src={logoPreview}
            alt="Logo Preview"
            className="mt-2 w-32 h-32 object-cover rounded-md border"
          />
        )}
      </div>
      <div className="mb-4 items-center">
        <label className="block text-gray-700 mb-3 w-48 mt-6">
          Company Recognize Document
        </label>
        <div className="flex flex-col">
          <label className="block text-gray-700 mb-2 w-48"></label>
          <input
            type="file"
            name="document"
            accept=".pdf,.doc,.docx,image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
            placeholder="pdf/doc/docx/png will be accepted"
          />
        </div>
      </div>
    </>
  );
};

export default Step2;
