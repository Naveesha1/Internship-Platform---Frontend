import React, { useState,useContext } from 'react';
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext.js';

const CreateInternship = () => {

  const { url } = useContext(StoreContext);  

  const [position, setPosition] = useState('');
  const [jobType, setJobType] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [requirements, setRequirements] = useState('');
  const [keywords, setKeywords] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [aboutIntern, setAboutIntern] = useState('');

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newInternship = {
      registeredEmail:registeredEmail,
      position,
      jobType,
      responsibilities,
      requirements,
      keywords,
      workMode,
      aboutIntern,
    };
    console.log(newInternship);
    try {
      const response = await axios.post(`${url}/api/company/createIntern`,newInternship);
      if(response.data.success) {
        console.log(response.data.message);
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const resetForm = () => {
    setPosition('');
    setJobType('');
    setResponsibilities('');
    setRequirements('');
    setKeywords('');
    setAboutIntern('');
    setWorkMode('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-4 mt-12 ml-10 ">
      <div className="mb-4">
        <label htmlFor="position" className="block font-medium text-gray-700 mb-2">
          Position
        </label>
        <input
          type="text"
          id="position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
          placeholder='Internship position'
        />
      </div>

      <div className="mb-4 ">
        <label htmlFor="timePeriod" className="block font-medium text-gray-700 mb-2">
          Time Period
        </label>
        <div className=' flex'>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="6months"
            checked={jobType === '6 Months'}
            onChange={() => setJobType((prevType) => (prevType === '6 Months' ? '' : '6 Months'))}
            className="mr-2"
          />
          <label htmlFor="timePeriod" className="text-gray-700">
            6 Months
          </label>
        </div>
        <div className="flex items-center ml-16">
          <input
            type="checkbox"
            id="1year"
            checked={jobType === '1 Year'}
            onChange={() => setJobType((prevType) => (prevType === '1 Year' ? '' : '1 Year'))}
            className="mr-2"
          />
          <label htmlFor="fullTime" className="text-gray-700">
          1 Year
          </label>
        </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="aboutInternship" className="block font-medium text-gray-700 mb-2">
          About Internship
        </label>
        <textarea
          id="aboutInternship"
          value={aboutIntern}
          onChange={(e) => setAboutIntern(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
          placeholder='Add details about internship'
        ></textarea>
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
          placeholder='separate each by "," responsibilities'
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
          placeholder='separate each by "," requirements'
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="keyWords" className="block font-medium text-gray-700 mb-2">
          Keywords
        </label>
        <input
          type="text"
          id="keyWords"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          placeholder='separate each by "," keywords'
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block font-medium text-gray-700 mb-2">
          Work Mode
        </label>
        <input
          type="text"
          id="workMode"
          value={workMode}
          onChange={(e) => setWorkMode(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
          placeholder='Online or Physical'
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
