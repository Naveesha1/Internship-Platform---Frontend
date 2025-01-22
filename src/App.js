import React from "react";
import { Route, Routes } from 'react-router-dom';
import LoginSignUp from "./Components/LoginSingup.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from "./Components/ResetPassword.js";
import Profile from "./Pages/Student/Profile.js";
import InternshipPage from "./Pages/Student/InternshipPage.js";
import DashboardPage from "./Pages/Student/DashboardPage.js";
import InternshipDetailsPage from "./Pages/Student/InternshipDetailsPage.js";
import ApplicationPage from "./Pages/Student/ApplicationPage.js";
import CalendarPage from "./Pages/Student/CalendarPage.js";
import ChatbotPage from "./Pages/Student/ChatbotPage.js";
import ComDashboardPage from "./Pages/Company/ComDashboardPage.js";
import CompanyProfilePage from "./Pages/Company/CompanyProfilePage.js";
import CompanyInternshipPage from "./Pages/Company/CompanyInternshipPage.js";
import CompanyCalendarPage from "./Pages/Company/CompanyCalendarPage.js";
import CompanyApplicationPage from "./Pages/Company/CompanyApplicationPage.js";

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
        <Route path='/ComDashboard' element={<ComDashboardPage/>}></Route>
        <Route path="/ApplicationPage" element={<ApplicationPage/>}></Route>
        <Route path='/CompanyProfile' element={<CompanyProfilePage/>}></Route>
        <Route path='/CompanyInternshipPage' element={<CompanyInternshipPage/>}></Route>
        <Route path='/CompanyCalendar' element={<CompanyCalendarPage/>}></Route>
        <Route path='/CompanyApplicationPage' element={<CompanyApplicationPage/>}></Route>
      </Routes>  
    </div>
  );
}

export default App;
