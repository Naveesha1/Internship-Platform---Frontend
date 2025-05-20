import React, { useState, useContext } from "react";
import loginIMG from "../Images/login.png";
import signupIMG from "../Images/signup.png";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { StoreContext } from "../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
import { jwtDecode } from "jwt-decode";

const LoginSignUp = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState("Sign in");
  // object to hold sign in or sign up data
  const [data, setData] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false); // state variable to hold forget password box opening function

  // Handle input changes for all fields
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "role") {
      setHide(true);
    }
  };

  // Toggle the state of password
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  // login and registering function
  const onLogin = async (e) => {
    e.preventDefault();
    let newURL = url;
    // if user trying to sign in, set backend path to sign in
    if (currentState === "Sign in") {
      newURL += "/api/user/login";
      const response = await axios.post(newURL, data);
      const userData = response.data.userData;
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        const token = localStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);

        let redirectPath;
        // send user to relevant paths
        if (userData.role === "Student") {
          redirectPath = `/STDashboard?${decodedToken._id}`;
        } else if (userData.role === "Company") {
          redirectPath = `/ComDashboard?${decodedToken._id}`;
        } else if (userData.role === "Admin") {
          redirectPath = `/AdminDashboard?${decodedToken._id}`;
        } else {
          redirectPath = `/MDashboard`;
        }
        navigate(redirectPath);
      } else {
        toast.error(response.data.message);
      }
    }
    // if user trying to sign up, set backend path to sign up
    else {
      newURL += "/api/user/register";
      const response = await axios.post(newURL, data);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    }
  };

  // forget password button function
  const handleForgetPassword = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 ">
      {/* left-side-div */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-lg mx-auto w-full max-w-[800px] h-auto sm:h-[600px] transition-transform duration-500 ${
          currentState === "Sign Up" ? "sm:flex-row-reverse" : ""
        }`}
      >
        <div className="w-full sm:w-1/2 text-center p-6">
          <form className="login-container" onSubmit={onLogin}>
            <div className="mb-4">
              <h2 className="text-[#45A29E] mt-0 mb-2 text-[24px] sm:text-[28px] font-bold">
                {currentState}
              </h2>
            </div>
            <div className="login-input">
              {/* checking current state whether sign in or sign up */}
              {currentState === "Sign in" ? null : (
                <>
                  <input
                    name="name"
                    onChange={onChangeHandler}
                    value={data.name}
                    type="text"
                    placeholder="Full Name"
                    required
                    className="rounded-full w-full sm:w-[273px] h-[40px] border-2 border-[#45A29E] bg-[#D9D9D9] mb-2 pl-4 focus:outline-none"
                  />
                  <select
                    name="role"
                    onChange={onChangeHandler} // Use the same onChange handler
                    value={data.role}
                    className={`rounded-full w-full sm:w-[273px] h-[40px] border-2 border-[#45A29E] bg-[#D9D9D9] focus:outline-none mb-2 pl-4 ${
                      hide ? "text-black-500" : "text-gray-400"
                    }`}
                  >
                    {hide ? "" : <option>Type</option>}
                    <option value="Student">Student</option>
                    <option value="Company">Company</option>
                  </select>
                </>
              )}
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Email"
                required
                className="rounded-full w-full sm:w-[273px] h-[40px] border-2 border-[#45A29E] bg-[#D9D9D9] mb-2 pl-4 focus:outline-none"
              />

              {/* Password input with eye icon */}
              <div className="relative">
                <input
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  type={passwordVisible ? "text" : "password"} // Toggle between text and password
                  placeholder="Password"
                  required
                  className="rounded-full w-full sm:w-[273px] h-[40px] border-2 border-[#45A29E] bg-[#D9D9D9] mb-2 pl-4 pr-10 focus:outline-none"
                />
                <span
                  className="absolute right-2 top-3 cursor-pointer text-gray-600 pr-2 md:pr-12"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEye /> : <FaEyeSlash />}{" "}
                  {/* Show the eye icon based on state */}
                </span>
              </div>
              <button
              type="submit"
              className="mt-4 w-full sm:w-[117px] h-[39px] hover:bg-[#358179] font-bold hover:text-gray rounded-full text-white bg-[#45A29E]"
            >
              {/* checking current state whether sign in or sign up */}
              {currentState === "Sign Up" ? "Sign up" : "Sign in"}
            </button>
              {currentState === "Sign in" ? (
                <button
                  className="text-center mt-2 w-full underline"
                  onClick={handleForgetPassword}
                >
                  Forget Password
                </button>
              ) : (
                ""
              )}
            </div>
            
            {/* <p className="mt-2">or</p> */}
          </form>
          {/* <div className="flex justify-center">
            <button className="flex items-center justify-center mt-2 w-full sm:w-[273px] h-[40px] border-2 border-[#45A29E] rounded-full bg-white text-gray-600">
              <FcGoogle className="mr-2" size={20} />
              <p>Continue with Google</p>
            </button>
          </div> */}
        </div>

        {/* right-side-div */}
        <div className="w-full sm:w-1/2 h-full rounded-lg text-center bg-[#45A29E] py-6 px-4 sm:pt-[7rem] text-white">
          {currentState === "Sign in" ? (
            <>
              <p className="font-bold text-[18px] sm:text-[20px] pb-2 pt-10">
                New to InternshipNexus?
              </p>
              <p className="font-light text-sm sm:text-base">
                Sign up now to discover internships that match your skills and
                career goals
              </p>
              <button
                onClick={() => setCurrentState("Sign Up")}
                className="mt-6 border-2 border-[#45A29E] rounded-full w-full sm:w-[117px] h-[39px] bg-[#80FFF6]"
              >
                Sign Up
              </button>
              <div className="flex justify-center mt-4">
                <img
                  src={signupIMG}
                  alt="Sign Up"
                  className="w-[170px] sm:w-[200px] h-[130px] sm:h-[170px]"
                />
              </div>
            </>
          ) : (
            <>
              <p className="font-bold text-[18px] sm:text-[20px] pb-2 pt-10">
                Member of InternshipNexus?
              </p>
              <p className="font-light text-sm sm:text-base">
                Log in to continue exploring your personalized internship
                opportunities
              </p>
              <button
                onClick={() => setCurrentState("Sign in")}
                className="mt-6 border-2 border-[#45A29E] rounded-full w-full sm:w-[117px] h-[39px] bg-[#80FFF6]"
              >
                Sign In
              </button>
              <div className="flex justify-center mt-4">
                <img
                  src={loginIMG}
                  alt="Log In"
                  className="w-[170px] sm:w-[200px] h-[130px] sm:h-[170px]"
                />
              </div>
            </>
          )}
        </div>
      </div>
      {/* Conditionally render ForgetPassword popup */}
      {open && <ForgetPassword open={open} onClose={() => setOpen(false)} />}
    </div>
  );
};

export default LoginSignUp;
