import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext.js";
import company from "../../Images/AdminDashboard/Business Building.png";
import student from "../../Images/AdminDashboard/Graduate.png";
import employee from "../../Images/AdminDashboard/Payroll.png";
import document from "../../Images/sidebar/Document.png";
import axios from "axios";

const AdminDashboard = () => {
  const { url } = useContext(StoreContext);

  const [verifiedCompaniesCount, setVerifiedCompaniesCount] = useState(0);
  const [verifiedStudentsCount, setVerifiedStudentsCount] = useState(0);
  const [pendingStudentsCount, setPendingStudentsCount] = useState(0);
  const [pendingCompaniesCount, setPendingCompaniesCount] = useState(0);
  const [allDocuments, setAllDocuments] = useState(0);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    try {
      if(token){
      const getVerifiedCompanies = async () => {
      const response = await axios.get(`${url}/api/admin/getVerifiedCompanies`);
      if (response.data.success) {
        setVerifiedCompaniesCount(response.data.count);
      } else {
        setVerifiedCompaniesCount(0);
      }
    };
    getVerifiedCompanies();
  } else {
      setVerifiedCompaniesCount(0);
  }
    } catch (error) {
      console.log("Error fetching data",error);
    }
    
  }, [token]);

  useEffect(() => {
  try {
    if(token){
    const getVerifiedStudents = async () => {
      const response = await axios.get(`${url}/api/admin/getVerifiedStudents`);
      if (response.data.success) {
        setVerifiedStudentsCount(response.data.count);
      } else {
        setVerifiedStudentsCount(0);
      }
    };
    getVerifiedStudents();
  } else {
      setVerifiedStudentsCount(0);
  }
  } catch (error) {
    console.log("Error fetching data",error);
  }
    
  }, [token]);

  useEffect(() => {
    try {
      if(token){
      const getPendingStudents = async () => {
      const response = await axios.get(`${url}/api/admin/getPendingStudents`);
      if (response.data.success) {
        setPendingStudentsCount(response.data.count);
      } else {
        setPendingStudentsCount(0);
      }
    };
    getPendingStudents();
  } else {
      setPendingStudentsCount(0);
  }
    } catch (error) {
      console.log("Error fetching data",error);
    }
    
  }, [token]);

  useEffect(() => {
    try {
      if(token){
      const getPendingCompanies = async () => {
      const response = await axios.get(`${url}/api/admin/getPendingCompanies`);
      if (response.data.success) {
        setPendingCompaniesCount(response.data.count);
      } else {
        setPendingCompaniesCount(0);
      }
    };
    getPendingCompanies();
  } else {
      setPendingCompaniesCount(0);
  }
    } catch (error) {
      console.log("Error fetching data",error);
    }
    
  }, [token]);

  useEffect(() => {
    try {
      if(token){
      const getAllDocuments = async () => {
      const response = await axios.get(`${url}/api/admin/getAllDocuments`);
      if (response.data.success) {
        setAllDocuments(response.data.data);
      } else {
        setAllDocuments(0);
      }
    };
    getAllDocuments();
   } else {
      setAllDocuments(0);
   }
    } catch (error) {
      console.log("Error fetching data",error);
    }
  }, [token]);

  return (
    <div className="flex flex-col flex-1 p-6 transition-all duration-300 py-16">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-[#45A29E]">
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={employee} alt="" className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">
            {verifiedCompaniesCount ? <>{verifiedCompaniesCount}</> : <>0</>}
          </h3>
          <p className="pl-2 font-bold text-sm pt-3">Verified Employers</p>
        </div>
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={student} alt="" className="pt-2 pb-5 brightness-0 invert" />
          <h3 className="text-3xl font-bold pl-2">
            {verifiedStudentsCount ? <>{verifiedStudentsCount}</> : <>0</>}
          </h3>
          <p className="pl-2 font-bold text-sm pt-3">Verified Students</p>
        </div>
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={document} alt="" className="pt-2 pb-5" />
          <div className="flex flex-col justify-between">
            <div className="flex flex-row align-center justify-between">
              <p className="pl-2 font-bold text-sm pt-3">Weekly Documents</p>
              <h3 className="text-3xl font-bold pl-2">
                {allDocuments ? <>{allDocuments.weeklyReportCount}</> : <>0</>}
              </h3>
            </div>
            <div className="flex flex-row align-center justify-between">
              <p className="pl-2 font-bold text-sm pt-3">Monthly Documents</p>
              <h3 className="text-3xl font-bold pl-2">
                {allDocuments ? <>{allDocuments.monthlyReportCount}</> : <>0</>}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Separate Wrapper for Recommendations and Invitations Section */}
      <div className="mt-6">
        {/* Internship Recommendations and Interview Invitations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Interview Invitation */}
          <div className="bg-[#66FCF1] p-4 rounded-lg shadow-lg ">
            <h4 className="text-lg text-[#6B7280] font-bold mb-4">
              Pending Verification
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#C5C6C7] p-4 rounded-lg shadow-md">
                <img src={company} alt="" className="pt-2 pb-5" />
                <h3 className="text-3xl font-bold pl-2 text-[#155E75]">
                  {pendingCompaniesCount ? (
                    <>{pendingCompaniesCount}</>
                  ) : (
                    <>0</>
                  )}
                </h3>
                <p className="pl-2 font-bold text-sm pt-3 ">Companies</p>
              </div>
              <div className="bg-[#C5C6C7] p-4 rounded-lg shadow-md">
                <img src={student} alt="" className="pt-2 pb-5" />
                <h3 className="text-3xl font-bold pl-2 text-[#155E75]">
                  {pendingStudentsCount ? <>{pendingStudentsCount}</> : <>0</>}
                </h3>
                <p className="pl-2 font-bold text-sm pt-3">Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
