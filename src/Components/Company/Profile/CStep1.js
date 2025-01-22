import React from 'react';

const CStep1 = ({ formData, handleChange }) => {
  return (
    <>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Company Name</label>
        <input 
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder='Place your company name here'
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Rating</label>
        <input 
          type="number"
          name="rating"
          value={formData.rating}
          onChange={(e) => {
            const value = Math.max(0, Math.min(5, Number(e.target.value))); // Restrict value between 0 and 5
            handleChange({ target: { name: 'rating', value } });
          }}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder='Place your rating level out of 5'
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Industry</label>
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder='Place your industry here'
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Company Mail</label>
        <input
          type="email"
          name="companyEmail"
          value={formData.companyEmail}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder='Place your company email here'
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
          placeholder='Place your company contact number here'
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder='Place your company address here'
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">About Us</label>
        <input 
          type="text"
          name="aboutUs"
          value={formData.aboutUs}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder='Add about your company'
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">What We Offer</label>
        <input 
          type="text"
          name="positions"
          value={formData.positions}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder='Enter intern positions separate by ","'
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Vision</label>
        <input 
          type="text"
          name="vision"
          value={formData.vision}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder='Your vision'
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Mission</label>
        <input 
          type="text"
          name="mission"
          value={formData.mission}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E]"
          placeholder='Your mission'
        />
      </div>
    </>
  );
};

export default CStep1;
