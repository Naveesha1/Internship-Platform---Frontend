import React, { useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext"; // Import StoreContext
import { toast } from "react-toastify"; // import toast notification

const ForgetPassword = ({ open, onClose }) => {
  const [email, setEmail] = useState(""); // state for hold user's email
  const { url } = useContext(StoreContext); // destructure the url from store context

  // function for handle the reset password
  const handleReset = async () => {
    let newURL = url;
    newURL += "/api/user/forgetPassword";
    const response = await axios.post(newURL, { email });
    if (response.data.success) {
      toast.success(response.data.message);
      setEmail(""); // set input fields empty once email is sent
    } else {
      toast.error(response.data.message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <h2 className="text-xl text-[#45A29E] font-bold mb-4">
          Forgot Password
        </h2>
        <p className="mb-4 text-gray-600">
          Enter your email to reset your password.
        </p>
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => {
            e.preventDefault();
            setEmail(e.target.value);
          }}
        />
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            className="bg-[#45A29E] text-white px-4 py-2 rounded"
            onClick={handleReset}
          >
            Send Reset Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
