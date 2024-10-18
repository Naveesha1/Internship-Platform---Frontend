import React from "react";
import { Route, Routes } from 'react-router-dom';
import LoginSignUp from "./Components/LoginSingup.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import STDashboard from "./Pages/Student/Dashboard.js";
import CMDashboard from "./Pages/Company/Dashboard.js";
import ResetPassword from "./Components/ResetPassword.js";
import Profile from "./Pages/Student/Profile.js";
import Internship from "./Pages/Student/Internship.js";
import Application from "./Pages/Student/Application.js";
import Chatbot from "./Pages/Student/Chatbot.js";
import Calender from "./Pages/Student/Calender.js";


function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LoginSignUp/>} />
        <Route path='/resetPassword' element={<ResetPassword/>} />
        {/* Students routes */}
        <Route path='/SDashboard' element={<STDashboard/>} />
        <Route path='/SProfile' element={<Profile/>} />
        <Route path='/Internship' element={<Internship/>} />
        <Route path='/Application' element={<Application/>} />
        <Route path='/ChatBot' element={<Chatbot/>} />
        <Route path='/Calender' element={<Calender/>} />
        {/* company routes */}
        <Route path='/CmDashboard' element={<CMDashboard/>} />
      </Routes>
      
    </div>
  );
}

export default App;
