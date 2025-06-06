import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginSignUp from "./Components/LoginSingup.js";
import { ToastContainer } from "react-toastify";
import { ReportProvider } from "./Context/ReportContext.js";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./Components/ResetPassword.js";
import Profile from "./Pages/Student/Profile.js";
import InternshipPage from "./Pages/Student/InternshipPage.js";
import DashboardPage from "./Pages/Student/DashboardPage.js";
import InternshipDetailsPage from "./Pages/Student/InternshipDetailsPage.js";
import ApplicationPage from "./Pages/Student/ApplicationPage.js";
import StudentDocumentPage from "./Pages/Student/StudentDocumentPage.js";

import InternshipDetailsView from "./Pages/Company/InternshipDetailsViewPage.js";
import CalendarPage from "./Pages/Student/CalendarPage.js";
import ChatbotPage from "./Pages/Student/ChatbotPage.js";
import ComDashboardPage from "./Pages/Company/ComDashboardPage.js";
import CompanyProfilePage from "./Pages/Company/CompanyProfilePage.js";
import CompanyInternshipPage from "./Pages/Company/CompanyInternshipPage.js";
import CompanyCalendarPage from "./Pages/Company/CompanyCalendarPage.js";
import CompanyApplicationPage from "./Pages/Company/CompanyApplicationPage.js";

import InternshipDetailsViewAdmin from "./Pages/Admin/InternshipDetailsViewPage.js";
import AdminDashboard from "./Pages/Admin/DashboardPage.js";
import AdminInternshipPage from "./Pages/Admin/InternshipPage.js";
import AdminProfilePage from "./Pages/Admin/ProfilesPage.js";
import AdminCalenderPage from "./Pages/Admin/CalenderPage.js";
import AdminDocumentPage from "./Pages/Admin/DocumentPage.js";
import AdminAnalyticsPage from "./Pages/Admin/AdminAnalyticsPage.js";


import MentorDashboard from "./Pages/Mentor/DashboardPage.js";
import MentorProfile from "./Pages/Mentor/ProfilePage.js";
import MentorDocument from "./Pages/Mentor/DocumentPage.js";
import MentorStudent from "./Pages/Mentor/StudentPage.js";
import MentorCalender from "./Pages/Mentor/CalenderPage.js";
import MentorCreateMonthlyDoc from "./Components/Mentor/MentorCreateMonthlyDoc.js";
import MentorDocMonthly from "./Components/Mentor/MentorDocMonthly.js";
import MentorCreateMOnthlyReportPage from "./Pages/Mentor/MonthlyReports/MentorCreateMOnthlyReportPage.js";
import MentorMonthlyReportViewPage from "./Pages/Mentor/MonthlyReports/MentorMonthlyReportViewPage.js";
import CompanyMentorsPage from "./Pages/Company/CompanyMentorsPage.js";
import InternEmployees from "./Pages/Company/InternEmployees.js";

function App() {
  return (
    <div>
      <ReportProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        {/* Students routes */}
        <Route path="/STDashboard" element={<DashboardPage />}></Route>
        <Route path="/SProfile" element={<Profile />} />
        <Route path="/InternshipPage" element={<InternshipPage />} />
        <Route path="/CalendarPage" element={<CalendarPage />}></Route>
        <Route
          path="/InternshipDetailsPage"
          element={<InternshipDetailsPage />}
        ></Route>
        <Route path="/ChatbotPage" element={<ChatbotPage />}></Route>
        <Route path="/ApplicationPage" element={<ApplicationPage />}></Route>
        <Route path="/DocumentPage" element={<StudentDocumentPage />}></Route>
        {/* company routes */}
        <Route path="/ComDashboard" element={<ComDashboardPage />}></Route>
        <Route path="/CompanyProfile" element={<CompanyProfilePage />}></Route>
        <Route
          path="/CompanyInternshipPage"
          element={<CompanyInternshipPage />}
        ></Route>
        <Route
          path="/CompanyCalendar"
          element={<CompanyCalendarPage />}
        ></Route>
        <Route
          path="/CompanyApplicationPage"
          element={<CompanyApplicationPage />}
        ></Route>
        <Route
          path="/InternEmployees"
          element={<InternEmployees />}
        ></Route>
        <Route
          path="/InternshipDetailsView"
          element={<InternshipDetailsView />}
        ></Route>

        {/* Admin routes */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/AdminProfiles" element={<AdminProfilePage />} />
        <Route path="/AdminInternships" element={<AdminInternshipPage />} />
        <Route path="/AdminCalender" element={<AdminCalenderPage />} />
        <Route path="/AdminDocument" element={<AdminDocumentPage />} />
        <Route path="/AdminAnalyticsPage" element={<AdminAnalyticsPage/>}></Route>
        <Route
          path="/InternshipDetailsViewAdmin"
          element={<InternshipDetailsViewAdmin />}
        ></Route>

        {/* Mentor routes */}
        <Route path="/MDashboard" element={<MentorDashboard />} />
        <Route path="/MProfile" element={<MentorProfile />} />
        <Route path="/MDocument" element={<MentorDocument />} />
        <Route path="/MStudent" element={<MentorStudent />} />
        <Route path="/MCalender" element={<MentorCalender />} />
        <Route path="/MDocMonthly" element={<MentorDocMonthly/>}></Route>
        <Route path="/MCreateMonthlyDocPage" element={<MentorCreateMOnthlyReportPage/>}></Route>
        <Route path="/MMonthlyDocViewPage" element={<MentorMonthlyReportViewPage/>}></Route>
        <Route path="/CreateMentor" element={<CompanyMentorsPage/>}></Route>
      </Routes>
      </ReportProvider>
    </div>
  );
}

export default App;
