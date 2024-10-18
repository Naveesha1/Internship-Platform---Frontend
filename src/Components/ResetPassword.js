import React,{ useState,useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import { StoreContext } from '../Context/StoreContext'; // Import StoreContext 
import { toast } from 'react-toastify';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const token = useLocation()
    .search.slice(0, useLocation().search.length)
    .split("=")
    .pop();

  const { email } = jwtDecode(token);
  console.log(email);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {url} = useContext(StoreContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const resetData = {
      email,
      password,
      confirmPassword,
    };
    console.log(resetData);

    try {
      const response = await axios.post(`${url}/api/user/resetPassword`,resetData);
      if (response.data.success) {
        toast.success("Password reset successful");
        setTimeout(() => {
            navigate("/");
        },1500);
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password");
      console.error("Error:", error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full space-y-6">
      <h2 className="text-2xl font-bold text-center text-[#45A29E] mb-6">
        Reset Your Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-[#45A29E] focus:border-[#45A29E] transition duration-300"
            placeholder="Enter new password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-[#45A29E] focus:border-[#45A29E] transition duration-300"
            placeholder="Confirm your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#45A29E] text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#399586] transition duration-300"
        >
          Reset Password
        </button>
      </form>
    </div>
  </div>
  );
};

export default ResetPassword;
