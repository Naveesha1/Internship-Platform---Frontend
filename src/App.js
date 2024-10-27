import React from "react";
import { Route, Routes } from 'react-router-dom';
import LoginSignUp from "./Components/LoginSingup.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CMDashboard from "./Pages/Company/Dashboard.js";
import ResetPassword from "./Components/ResetPassword.js";
import Profile from "./Pages/Student/Profile.js";
import InternshipPage from "./Pages/Student/InternshipPage.js";
import DashboardPage from "./Pages/Student/DashboardPage.js";
import InternshipDetailsPage from "./Pages/Student/InternshipDetailsPage.js";
import ApplicationPage from "./Pages/Student/ApplicationPage.js";
import CalendarPage from "./Pages/Student/CalendarPage.js";
import ChatbotPage from "./Pages/Student/ChatbotPage.js";


function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<LoginSignUp/>} />
        <Route path='/resetPassword' element={<ResetPassword/>} />
        {/* Students routes */}
        <Route path='/STDashboard' element={<DashboardPage/>}></Route>
        <Route path='/SProfile' element={<Profile/>} />
        <Route path='/InternshipPage' element={<InternshipPage/>} />
        <Route path='/CalendarPage' element={<CalendarPage/>}></Route>
        <Route path='/InternshipDetailsPage' element={<InternshipDetailsPage/>}></Route>
        <Route path='/ChatbotPage' element={<ChatbotPage/>}></Route>
        {/* company routes */}
        <Route path='/CmDashboard' element={<CMDashboard/>} />
        <Route path="ApplicationPage" element={<ApplicationPage/>}></Route>

      </Routes>
      
    </div>
  );
}

export default App;
