import React, { useState } from "react";
import Select from "react-select";

const Step3 = ({ formData, handleChange, setName }) => {
  const [cvPreview, setCvPreview] = useState(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file && name === "cv") {
      setName(file.name);
      setCvPreview(file.name);
      handleChange(e);
    }
  };

  // === IT Job Positions ===
  const jobOptions = [
    "Front-End Developer", "Back-End Developer", "Full Stack Developer", "Mobile App Developer",
    "Game Developer", "Software Engineer", "Embedded Systems Developer", "Web Designer",
    "Web Developer", "UI/UX Designer", "WordPress Developer", "Data Scientist",
    "Machine Learning Engineer", "AI Engineer", "Data Analyst", "Deep Learning Specialist",
    "NLP Engineer", "DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer",
    "Cloud Architect", "IT Support Specialist", "System Administrator", "Network Administrator",
    "Help Desk Technician", "Technical Support Engineer", "Cybersecurity Analyst",
    "Ethical Hacker", "Security Engineer", "Information Security Analyst", "SOC Analyst",
    "Database Administrator", "Data Engineer", "Big Data Engineer", "SQL Developer",
    "IoT Developer", "Embedded Systems Engineer", "Robotics Engineer", "Firmware Engineer",
    "QA Tester", "Automation Test Engineer", "Performance Tester", "Manual Tester",
    "Business Analyst", "Systems Analyst", "Product Manager", "Project Manager", "Scrum Master",
    "Tech Writer", "IT Consultant", "Blockchain Developer", "CRM Developer", "ERP Consultant",
    "IT Auditor", "Game Tester", "GIS Analyst", "Multimedia Developer", "AR/VR Developer"
  ].map((job) => ({ value: job, label: job }));

  // === Technical Skills ===
  const skillOptions = [
    "Java", "C#", "Python", "JavaScript", "HTML", "CSS", "React", "Angular", "Vue.js",
    ".NET", "Spring Boot", "Node.js", "Django", "Git", "GitHub", "RESTful APIs", "SQL",
    "MongoDB", "PostgreSQL", "MySQL", "Firebase", "JIRA", "Jenkins", "Docker", "Kubernetes",
    "AWS", "Azure", "GCP", "Linux", "Figma", "Power BI", "Tableau", "Selenium", "Postman",
    "JMeter", "Arduino", "Raspberry Pi", "Kali Linux", "Wireshark", "Metasploit", "Burp Suite",
    "TensorFlow", "Keras", "Pandas", "NumPy", "Matplotlib", "Excel", "Bash", "PowerShell",
    "Flutter", "React Native", "Swift", "Kotlin", "R", "OOP", "API", "JSON"
  ].map((skill) => ({ value: skill, label: skill }));

  // === Soft Skills ===
  const softSkillOptions = [
    "Communication", "Teamwork", "Problem Solving", "Critical Thinking", "Adaptability",
    "Time Management", "Creativity", "Leadership", "Attention to Detail", "Work Ethic",
    "Interpersonal Skills", "Empathy", "Decision Making", "Conflict Resolution",
    "Stress Management", "Collaboration", "Active Listening", "Presentation Skills",
    "Self-Motivation", "Accountability"
  ].map(skill => ({ value: skill, label: skill }));

  // Handle select changes
  const handleSelectChange = (selectedOptions, { name }) => {
    const values = selectedOptions.map((option) => option.value);
    console.log(`Selected ${name}:`, values);
    handleChange({
      target: {
        name,
        value: values.join(", "), // send as comma-separated string
      },
    });
  };

  return (
    <>
      {/* Technical Skills */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Technical Skills</label>
        <Select
          isMulti
          name="skills"
          options={skillOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select your technical skills"
          onChange={handleSelectChange}
        />
      </div>

      {/* Preferred Intern Position */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Preferred Intern Position</label>
        <Select
          isMulti
          name="position"
          options={jobOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select preferred intern positions"
          onChange={handleSelectChange}
        />
      </div>

      {/* Soft Skills */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Soft Skills</label>
        <Select
          isMulti
          name="qualification"
          options={softSkillOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select your soft skills"
          onChange={handleSelectChange}
        />
      </div>

      {/* Certifications */}
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

      {/* Add Your CV */}
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 w-48">Add Your CV</label>
        <input
          type="file"
          name="cv"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#45A29E] bg-[#A5D1D53D]"
        />
      </div>

      {/* Position for CV */}
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
