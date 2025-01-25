import React, { useState } from "react";

const Step3 = ({ formData, handleChange,setName }) => {
  const [cvPreview, setCvPreview] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file && name === "cv") {
      setName(file.name);
      setCvPreview(file.name); // Store the file name for preview
      handleChange(e); // Pass the file data to the parent
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Technical Skills</label>
        <input
          type="text"
          name="skills"
          value={formData.skills || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
        />
      </div>

      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Preferred Intern Position</label>
        <input
          type="text"
          name="position"
          value={formData.position || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
        />
      </div>

      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Soft Skills</label>
        <input
          type="text"
          name="qualification"
          value={formData.qualification || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
        />
      </div>

      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Certifications</label>
        <input
          type="text"
          name="certifications"
          value={formData.certifications || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
        />
      </div>

      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Add Your CV</label>
        <input
          type="file"
          name="cv"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
        />
        {/* {cvPreview && (
          <div className="mt-2">
            <p className="text-sm text-gray-700">Uploaded File: {cvPreview}</p>
          </div>
        )} */}
      </div>

      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Position for CV</label>
        <input
          type="text"
          name="cvPosition"
          value={formData.cvPosition || ""}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
        />
      </div>

    </>
  );
};

export default Step3;
