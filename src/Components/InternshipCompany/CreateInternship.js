import React, { useState } from 'react';

const CreateInternship = ({ onCreateInternship }) => {
  const [title, setTitle] = useState('');
  const [partTime, setPartTime] = useState(false);
  const [responsibilities, setResponsibilities] = useState('');
  const [requirements, setRequirements] = useState('');
  const [keyWords, setKeyWords] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInternship = {
      title,
      partTime,
      responsibilities,
      requirements,
      keyWords,
      location,
    };
    onCreateInternship(newInternship);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setPartTime(false);
    setResponsibilities('');
    setRequirements('');
    setKeyWords('');
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-4 mt-12 ml-10 ">
      <div className="mb-4">
        <label htmlFor="title" className="block font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        />
      </div>

      <div className="mb-4 ">
        <label htmlFor="partTime" className="block font-medium text-gray-700 mb-2">
          Part Time / Full Time
        </label>
        <div className=' flex'>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="partTime"
            checked={partTime}
            onChange={(e) => setPartTime(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="partTime" className="text-gray-700">
            Part Time
          </label>
        </div>
        <div className="flex items-center ml-16">
          <input
            type="checkbox"
            id="partTime"
            checked={partTime}
            onChange={(e) => setPartTime(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="partTime" className="text-gray-700">
            Full Time
          </label>
        </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="responsibilities" className="block font-medium text-gray-700 mb-2">
          Responsibilities
        </label>
        <textarea
          id="responsibilities"
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="requirements" className="block font-medium text-gray-700 mb-2">
          Requirements
        </label>
        <textarea
          id="requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="keyWords" className="block font-medium text-gray-700 mb-2">
          Key Words
        </label>
        <input
          type="text"
          id="keyWords"
          value={keyWords}
          onChange={(e) => setKeyWords(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={resetForm}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateInternship;
