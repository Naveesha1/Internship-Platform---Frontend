import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import application from '../../Images/Company/ComApplication.png';
import employee from '../../Images/Company/ComEmployee.png';
import vacancies from '../../Images/Company/ComVacanci.png';
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext.js";
import { jwtDecode } from "jwt-decode";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const [mentorCount, setMentorCount] = useState("");
  const [internCount, setInternCount] = useState("");
  const [applicationCount, setApplicationCount] = useState("");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registeredEmail, setRegisteredEmail] = useState(null);

  // Token handling and redirection
  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/");
      };

      const decodedToken = jwtDecode(token);
      setRegisteredEmail(decodedToken.email);
    } catch (error) {
      navigate("/");
    }
  }, [navigate]);

  // get mentors count
  useEffect(() => {
    const getMentorCount = async () => {
      try {
        const response = await axios.post(`${url}/api/mentor/getMentorCountByCompanyController`, {
          registeredEmail,
        });

        if (response.data.success) {
          setMentorCount(response.data.count);
        } else {
          setMentorCount(0);
        }
      } catch (error) {
        console.error("Error fetching mentor count:", error);
      }
    };

    if (registeredEmail) {
      getMentorCount();
    }
  }, [registeredEmail, url]);

  // get intern employee count
  useEffect(() => {
    const getInternCount = async () => {
      try {
        const response = await axios.post(`${url}/api/mentor/getInternEmployeeCount`, {
          registeredEmail,
        });

        if (response.data.success) {
          setInternCount(response.data.count);
        } else {
          setInternCount(0);
        }
      } catch (error) {
        console.error("Error fetching intern count:", error);
      }
    };

    if (registeredEmail) {
      getInternCount();
    }
  }, [registeredEmail, url]);

  // get application count
  useEffect(() => {
    const getApplicationCount = async () => {
      try {
        const response = await axios.post(`${url}/api/company/getApplicationCountController`, {
          registeredEmail,
        });

        if (response.data.success) {
          setApplicationCount(response.data.count);
        } else {
          setApplicationCount(0);
        }
      } catch (error) {
        console.error("Error fetching application count:", error);
      }
    };

    if (registeredEmail) {
      getApplicationCount();
    }
  }, [registeredEmail, url]);

  // get chart data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${url}/api/company/getPositionStatsController`, {
          registeredEmail,
        });

        if (response.data.success) {
          setChartData(response.data.positionStats);
        } else {
          setChartData();
        }
      } catch (error) {
        console.error("Error fetching position analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (registeredEmail) {
      fetchData();
    }
  }, [registeredEmail, url]);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 mt-8 w-full max-w-3xl flex justify-center items-center h-64">
        <p className="text-gray-400">Loading analytics data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-left mt-12 ml-12 mr-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-[#45A29E]">
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={application} alt='' className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">{applicationCount || 0}</h3>
          <p className="pl-2 font-bold text-sm pt-3">All Applications</p>
        </div>
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={employee} alt='' className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">{internCount || 0}</h3>
          <p className="pl-2 font-bold text-sm pt-3">Intern Employee</p>
        </div>
        <div className="bg-[#1F2833] p-4 rounded-lg shadow-md">
          <img src={vacancies} alt='' className="pt-2 pb-5" />
          <h3 className="text-3xl font-bold pl-2">{mentorCount || 0}</h3>
          <p className="pl-2 font-bold text-sm pt-3">All Mentors</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 mt-8 w-full max-w-3xl mb-4">
        <h3 className="text-2xl font-bold text-teal-500 mb-4">Application Analytics</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-teal-400 rounded-full mr-2"></div>
            <p className="text-gray-400">Position</p>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-cyan-500 rounded-full mr-2"></div>
            <p className="text-gray-400">No. of Applications</p>
          </div>
        </div>

        <div className="w-full h-64 bg-gray-700 rounded-lg mt-4 p-4">
          {chartData.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-400">No application data available</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="position"
                  tick={{ fill: '#9CA3AF', angle: -45, textAnchor: 'end', fontSize: 12 }}
                  axisLine={{ stroke: '#4B5563' }}
                  height={60}
                  tickMargin={10}
                />
                <YAxis
                  tick={{ fill: '#9CA3AF' }}
                  axisLine={{ stroke: '#4B5563' }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '0.5rem' }}
                  labelStyle={{ color: '#ffffff' }}
                  itemStyle={{ color: '#ffffff' }}
                />
                <Bar dataKey="count" name="Applications" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
