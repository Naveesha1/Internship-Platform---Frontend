import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const MentorCreateMonthlyDoc = () => {
  const [formData, setFormData] = useState({
    work: "Excellent",
    conduct: "Excellent",
    attendance: "Excellent",
    authorisedLeave: "",
    unauthorisedLeave: "",
    trainingStage: "",
    comments: "",
  });

  const [showDropdown, setShowDropdown] = useState(false);

  const handleRadioChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTrainingStageSelect = (value) => {
    setFormData({
      ...formData,
      trainingStage: value,
    });
    setShowDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Monthly report submitted successfully!");
  };

  return (
    <div className="p-4 w-full">
      <div className="flex items-center mb-6">
        <h1 className="text-xl font-semibold">Monthly Report</h1>
        <FaChevronDown className="ml-2 text-gray-500" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-gray-100 p-6 rounded-md">
          <h2 className="text-lg font-medium text-teal-700 mb-6">
            Details on Undergraduate's
          </h2>

          {/* 1. Work */}
          <div className="mb-6">
            <p className="mb-2 font-medium">1. Work</p>
            <div className="flex flex-wrap gap-x-16 gap-y-2">
              <label className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.work === "Excellent"
                      ? "border-teal-700"
                      : "border-gray-400"
                  }`}
                >
                  {formData.work === "Excellent" && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="work"
                  value="Excellent"
                  checked={formData.work === "Excellent"}
                  onChange={() => handleRadioChange("work", "Excellent")}
                  className="sr-only"
                />
                <span className="ml-2">Excellent</span>
              </label>

              <label className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.work === "Good"
                      ? "border-teal-700"
                      : "border-gray-400"
                  }`}
                >
                  {formData.work === "Good" && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="work"
                  value="Good"
                  checked={formData.work === "Good"}
                  onChange={() => handleRadioChange("work", "Good")}
                  className="sr-only"
                />
                <span className="ml-2">Good</span>
              </label>

              <label className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.work === "Satisfactory"
                      ? "border-teal-700"
                      : "border-gray-400"
                  }`}
                >
                  {formData.work === "Satisfactory" && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="work"
                  value="Satisfactory"
                  checked={formData.work === "Satisfactory"}
                  onChange={() => handleRadioChange("work", "Satisfactory")}
                  className="sr-only"
                />
                <span className="ml-2">Satisfactory</span>
              </label>

              <label className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.work === "Poor"
                      ? "border-teal-700"
                      : "border-gray-400"
                  }`}
                >
                  {formData.work === "Poor" && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="work"
                  value="Poor"
                  checked={formData.work === "Poor"}
                  onChange={() => handleRadioChange("work", "Poor")}
                  className="sr-only"
                />
                <span className="ml-2">Poor</span>
              </label>
            </div>
          </div>

          {/* 2. Conduct */}
          <div className="mb-6">
            <p className="mb-2 font-medium">2. Conduct</p>
            <div className="flex flex-wrap gap-x-16 gap-y-2">
              <label className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.conduct === "Excellent"
                      ? "border-teal-700"
                      : "border-gray-400"
                  }`}
                >
                  {formData.conduct === "Excellent" && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="conduct"
                  value="Excellent"
                  checked={formData.conduct === "Excellent"}
                  onChange={() => handleRadioChange("conduct", "Excellent")}
                  className="sr-only"
                />
                <span className="ml-2">Excellent</span>
              </label>

              <label className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.conduct === "Good"
                      ? "border-teal-700"
                      : "border-gray-400"
                  }`}
                >
                  {formData.conduct === "Good" && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="conduct"
                  value="Good"
                  checked={formData.conduct === "Good"}
                  onChange={() => handleRadioChange("conduct", "Good")}
                  className="sr-only"
                />
                <span className="ml-2">Good</span>
              </label>

              <label className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.conduct === "Satisfactory"
                      ? "border-teal-700"
                      : "border-gray-400"
                  }`}
                >
                  {formData.conduct === "Satisfactory" && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="conduct"
                  value="Satisfactory"
                  checked={formData.conduct === "Satisfactory"}
                  onChange={() => handleRadioChange("conduct", "Satisfactory")}
                  className="sr-only"
                />
                <span className="ml-2">Satisfactory</span>
              </label>

              <label className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.conduct === "Poor"
                      ? "border-teal-700"
                      : "border-gray-400"
                  }`}
                >
                  {formData.conduct === "Poor" && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="conduct"
                  value="Poor"
                  checked={formData.conduct === "Poor"}
                  onChange={() => handleRadioChange("conduct", "Poor")}
                  className="sr-only"
                />
                <span className="ml-2">Poor</span>
              </label>
            </div>
          </div>

          {/* 3. Attendance */}
          <div className="mb-6">
            <p className="mb-2 font-medium">3. Attendance</p>
            <div className="flex flex-wrap gap-x-16 gap-y-2">
              <label className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.attendance === "Excellent"
                      ? "border-teal-700"
                      : "border-gray-400"
                  }`}
                >
                  {formData.attendance === "Excellent" && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="attendance"
                  value="Excellent"
                  checked={formData.attendance === "Excellent"}
                  onChange={() => handleRadioChange("attendance", "Excellent")}
                  className="sr-only"
                />
                <span className="ml-2">Excellent</span>
              </label>

              <label className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.attendance === "Good"
                      ? "border-teal-700"
                      : "border-gray-400"
                  }`}
                >
                  {formData.attendance === "Good" && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="attendance"
                  value="Good"
                  checked={formData.attendance === "Good"}
                  onChange={() => handleRadioChange("attendance", "Good")}
                  className="sr-only"
                />
                <span className="ml-2">Good</span>
              </label>

              <label className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.attendance === "Satisfactory"
                      ? "border-teal-700"
                      : "border-gray-400"
                  }`}
                >
                  {formData.attendance === "Satisfactory" && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="attendance"
                  value="Satisfactory"
                  checked={formData.attendance === "Satisfactory"}
                  onChange={() =>
                    handleRadioChange("attendance", "Satisfactory")
                  }
                  className="sr-only"
                />
                <span className="ml-2">Satisfactory</span>
              </label>

              <label className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    formData.attendance === "Poor"
                      ? "border-teal-700"
                      : "border-gray-400"
                  }`}
                >
                  {formData.attendance === "Poor" && (
                    <div className="w-3 h-3 rounded-full bg-black"></div>
                  )}
                </div>
                <input
                  type="radio"
                  name="attendance"
                  value="Poor"
                  checked={formData.attendance === "Poor"}
                  onChange={() => handleRadioChange("attendance", "Poor")}
                  className="sr-only"
                />
                <span className="ml-2">Poor</span>
              </label>
            </div>
          </div>

          {/* 4. Days of leave */}
          <div className="mb-6">
            <p className="mb-2 font-medium">4. Days of leave during month</p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <p className="mr-2 min-w-24">Authorised</p>
                <input
                  type="text"
                  name="authorisedLeave"
                  value={formData.authorisedLeave}
                  onChange={handleInputChange}
                  className="border rounded-md py-1 px-2 w-28"
                />
              </div>

              <div className="flex items-center">
                <p className="mr-2 min-w-28">Unauthorised</p>
                <input
                  type="text"
                  name="unauthorisedLeave"
                  value={formData.unauthorisedLeave}
                  onChange={handleInputChange}
                  className="border rounded-md py-1 px-2 w-28"
                />
              </div>
            </div>
          </div>

          {/* 5. Training Stage */}
          <div className="mb-6">
            <p className="mb-2 font-medium">5. Training Stage</p>
            <div className="relative">
              <div
                className="border rounded-md py-2 px-3 flex justify-between items-center cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <span>{formData.trainingStage || "Select Training Stage"}</span>
                <FaChevronDown className="text-gray-500" />
              </div>

              {showDropdown && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md mt-1 z-10 shadow-md">
                  <div
                    className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleTrainingStageSelect("Level 3")}
                  >
                    Level 3
                  </div>
                  <div
                    className="py-2 px-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleTrainingStageSelect("Repeat")}
                  >
                    Repeat
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 6. Comments */}
          <div className="mb-6">
            <p className="mb-2 font-medium">
              6. Comments by Engineer / Officer in charge of Undergraduate
            </p>
            <textarea
              name="comments"
              rows="4"
              value={formData.comments}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 resize-none"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-teal-700 hover:bg-teal-800 text-white py-2 px-6 rounded-md transition duration-300"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default MentorCreateMonthlyDoc;
