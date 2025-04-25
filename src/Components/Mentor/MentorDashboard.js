import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext.js";
import company from "../../Images/AdminDashboard/Business Building.png";
import student from "../../Images/AdminDashboard/graduatewhite.png";
import employee from "../../Images/AdminDashboard/Payroll.png";
import document from "../../Images/sidebar/Document.png";
import pendingDocument from "../../Images/AdminDashboard/Document.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const AdminDashboard = () => {
  const { url } = useContext(StoreContext);
  const [counts, setCounts] = useState({
    weeklyCount: 0,
    monthlyCount: 0,
    studentCount: 0,
  });


  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.post(`${url}/api/mentor/countStudentWeeklyMonthly`, {
          registeredEmail,
        });

        if (response.data.success) {
          setCounts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching mentor data counts", error);
      }
    };

    fetchCounts();
  }, [registeredEmail]);

  

  return (
    <div className="flex flex-col flex-1 p-6 transition-all duration-300 py-16">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-[#45A29E]">
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={document} alt="" className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">
            {counts.weeklyCount}
          </h3>
          <p className="pl-2 font-bold text-sm pt-3">All Weekly Reports</p>
        </div>
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={document} alt="" className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">
            {counts.monthlyCount}
          </h3>
          <p className="pl-2 font-bold text-sm pt-3">All Monthly Reports</p>
        </div>
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={student} alt="" className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">
            {counts.studentCount}
          </h3>
          <p className="pl-2 font-bold text-sm pt-3">All Students</p>
        </div>
      </div>


      <div className="mt-6">
        {/* Internship Recommendations and Interview Invitations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Interview Invitation */}
          <div className="bg-[#66FCF1] p-4 rounded-lg shadow-lg ">
            <h4 className="text-lg text-[#6B7280] font-bold mb-4">
              Pending Approvel
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#C5C6C7] p-4 rounded-lg shadow-md">
                <img src={pendingDocument} alt="" className="pt-2 pb-5" />
                <h3 className="text-3xl font-bold pl-2 text-[#155E75]">
                  {}
                </h3>
                <p className="pl-2 font-bold text-sm pt-3 ">Weekly Reports</p>
              </div>
              
              <div className="bg-[#C5C6C7] p-4 rounded-lg shadow-md">
                <img src={pendingDocument} alt="" className="pt-2 pb-5" />
                <h3 className="text-3xl font-bold pl-2 text-[#155E75]">
                  {}
                </h3>
                <p className="pl-2 font-bold text-sm pt-3">Monthly Reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
