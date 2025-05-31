import React, { useState, useContext, useEffect } from 'react';
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext.js';
import Select from 'react-select';
import { useNavigate } from "react-router-dom";

const CreateInternship = () => {
  const { url } = useContext(StoreContext);

  const [position, setPosition] = useState('');
  const [jobType, setJobType] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [requirements, setRequirements] = useState('');
  const [workMode, setWorkMode] = useState('');
  const [aboutIntern, setAboutIntern] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [registeredEmail, setRegisteredEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Token decoding and redirect handling
    useEffect(() => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/");
        };
  
        const decodedToken = jwtDecode(token);
        setRegisteredEmail(decodedToken.email);
      } catch (error) {
        navigate("/");
      }
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!registeredEmail) {
      toast.error("You must be logged in to create an internship.");
      return;
    }

    const newInternship = {
      registeredEmail,
      position: position.trim(),
      jobType,
      responsibilities: responsibilities.trim(),
      requirements: requirements.trim(),
      keywords: selectedKeywords.map(k => k.value).join(', '),
      workMode,
      aboutIntern: aboutIntern.trim(),
    };

    try {
      setLoading(true);
      const response = await axios.post(`${url}/api/company/createIntern`, newInternship);
      if (response.data.success) {
        toast.success(response.data.message);
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPosition('');
    setJobType('');
    setResponsibilities('');
    setRequirements('');
    setAboutIntern('');
    setWorkMode('');
    setSelectedKeywords([]);
  };

  // Keywords options remain same as yours
  const keywords = [
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue", "Svelte",
    "Node.js", "Express", "Nest.js", "Django", "Flask", "FastAPI",
    "Python", "Java", "C#", "C++", "Ruby", "PHP", "Go", "Rust", "Swift", "Kotlin",
    "MongoDB", "MySQL", "PostgreSQL", "Oracle", "SQL Server", "Redis", "Firebase",
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "GitLab CI", "GitHub Actions",
    "REST API", "GraphQL", "gRPC", "WebSockets", "Microservices", "Serverless",
    "TensorFlow", "PyTorch", "scikit-learn", "Pandas", "NumPy", "Machine Learning", "AI",
    "Blockchain", "Ethereum", "Solidity", "Smart Contracts", "NFT", "Web3",
    "React Native", "Flutter", "iOS", "Android", "Xamarin", "Ionic",
    "Unity", "Unreal Engine", "Game Development", "AR", "VR", "XR",
    "UI/UX", "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator",
    "Git", "GitHub", "BitBucket", "SVN", "Agile", "Scrum", "Kanban", "Jira",
    "DevOps", "CI/CD", "Testing", "QA", "Jest", "Cypress", "Selenium", "Playwright",
    "SEO", "Analytics", "Digital Marketing", "Content Management",
    "Linux", "Unix", "Bash", "PowerShell", "Shell Scripting",
    "IoT", "Embedded Systems", "RTOS", "Firmware", "Hardware Programming",
    "Network Security", "Cybersecurity", "Penetration Testing", "Ethical Hacking", "Cryptography",
    "Hadoop", "Spark", "Big Data", "Data Mining", "Data Science", "ETL",
    ".NET", "ASP.NET", "Spring", "Laravel", "Rails", "Next.js", "Gatsby",
    "SASS", "LESS", "Tailwind CSS", "Bootstrap", "Material UI", "Styled Components",
    "PWA", "SPA", "SSR", "SSG", "JAMstack", "Webpack", "Babel", "Rollup", "Vite"
  ].map(keyword => ({ value: keyword, label: keyword }));

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-4 mt-12 ml-10 max-w-3xl">
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
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2">
          Time Period
        </label>
        <div className='flex space-x-8'>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="jobType"
              value="6 Months"
              checked={jobType === '6 Months'}
              onChange={() => setJobType('6 Months')}
              className="mr-2"
              disabled={loading}
            />
            6 Months
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="jobType"
              value="1 Year"
              checked={jobType === '1 Year'}
              onChange={() => setJobType('1 Year')}
              className="mr-2"
              disabled={loading}
            />
            1 Year
          </label>
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
          disabled={loading}
        />
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
          placeholder='Separate each by ","'
          disabled={loading}
        />
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
          placeholder='Separate each by ","'
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="keyWords" className="block font-medium text-gray-700 mb-2">
          Keywords
        </label>
        <Select
          isMulti
          name="keywords"
          options={keywords}
          value={selectedKeywords}
          onChange={setSelectedKeywords}
          className="border border-gray-300 rounded-md"
          placeholder='Select the matching keywords'
          isDisabled={loading}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="workMode" className="block font-medium text-gray-700 mb-2">
          Work Mode
        </label>
        <select
          id="workMode"
          value={workMode}
          onChange={(e) => setWorkMode(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          required
          disabled={loading}
        >
          <option value="">Select mode</option>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={resetForm}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </form>
  );
};

export default CreateInternship;
