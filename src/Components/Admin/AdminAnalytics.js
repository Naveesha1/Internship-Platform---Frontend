import React, { useState, useEffect, useContext } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';
import axios from 'axios'; // Make sure you have axios installed
import { StoreContext } from '../../Context/StoreContext';

// Dashboard component that contains all analytics graphs
const AdminAnalytics = () => {
  // State for storing data from API
  const [skillDemandData, setSkillDemandData] = useState([]);
  const [gpaDistributionData, setGpaDistributionData] = useState([]);
  const [monthlyRegistrationData, setMonthlyRegistrationData] = useState([]);
  
  // State for report statistics
  const [weekly, setWeekly] = useState([
    { name: 'Submitted', value: 0 },
    { name: 'Not Submitted', value: 0 }
  ]);
  
  const [monthly, setMonthly] = useState([
    { name: 'Submitted', value: 0 },
    { name: 'Not Submitted', value: 0 }
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add loading state for skill demand data
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState(null);
  
  // Add loading state for report data
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState(null);

  const { url } = useContext(StoreContext);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Fetch data from APIs on component mount
  useEffect(() => {
    // In a real implementation, these would be actual API calls
    fetchSkillDemandData();
    fetchGpaDistributionData();
    fetchMonthlyRegistrations();
    fetchReportStatistics();
  }, []);

  // Fetch report statistics
  const fetchReportStatistics = async () => {
    try {
      setReportsLoading(true);
      setReportsError(null);
      
      // Get token from localStorage
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        setReportsError('Authentication token not found');
        setReportsLoading(false);
        return;
      }
      
      // Make API call to get report statistics
      const response = await axios.get(`${url}/api/mentor/getReportStaus`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        setWeekly(response.data.data.weekly);
        setMonthly(response.data.data.monthly);
      } else {
        setReportsError(response.data.message || 'Failed to fetch report statistics');
      }
      
      setReportsLoading(false);
    } catch (error) {
      console.error("Error fetching report statistics:", error);
      setReportsError('An error occurred while fetching report statistics');
      setReportsLoading(false);
    }
  };

  const fetchMonthlyRegistrations = async () => {
    try {
      const response = await fetch(`${url}/api/admin/monthlyRegistrationStatus`);
      const result = await response.json();

      if (result.success && result.data) {
        const transformedData = Object.keys(result.data).map((key) => {
          const [year, month] = key.split("-");
          const monthName = new Date(`${year}-${month}`).toLocaleString('default', { month: 'short' });

          return {
            month: monthName, // e.g. Jan, Feb, Mar
            student: result.data[key].studentCount, // or use your own field
            company: result.data[key].companyCount, // or use your own field
          };
        });

        // Get current month and year
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // 0-indexed (0 = Jan, 11 = Dec)
        const currentYear = currentDate.getFullYear();

        // Generate the last 4 months
        const last4Months = [];
        for (let i = 0; i < 4; i++) {
          const month = (currentMonth - i + 12) % 12; // Ensure wrapping around to previous year
          const year = currentMonth - i < 0 ? currentYear - 1 : currentYear; // Adjust year if month is negative
          const monthName = new Date(year, month).toLocaleString('default', { month: 'short' }); // Get month name (e.g., 'Jan', 'Feb')
          last4Months.push(monthName);
        }

        // Filter data to include only the last 4 months
        const filteredData = transformedData.filter(item => last4Months.includes(item.month));

        setMonthlyRegistrationData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching registration trends data:", error);
    }
  };

  useEffect(() => {
    console.log(monthlyRegistrationData);
    fetchMonthlyRegistrations();
  }, []);


  const fetchSkillDemandData = async () => {
    try {
      setSkillsLoading(true);
      setSkillsError(null);

      // Get token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        setSkillsError('Authentication token not found');
        setSkillsLoading(false);
        return;
      }

      // Make API call to get skills demand data
      const response = await axios.get(`${url}/api/admin/getSkillDemand`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setSkillDemandData(response.data.data);
      } else {
        setSkillsError(response.data.message || 'Failed to fetch skills demand data');
      }

      setSkillsLoading(false);
    } catch (error) {
      console.error("Error fetching skill demand data:", error);
      setSkillsError('An error occurred while fetching skills demand data');
      setSkillsLoading(false);
    }
  };

  const fetchGpaDistributionData = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError('Authentication token not found');
        setLoading(false);
        return;
      }

      // Make API call with authorization header
      const response = await axios.get(`${url}/api/student/gpa-distribution`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setGpaDistributionData(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch GPA data');
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching GPA distribution data:", error);
      setError('An error occurred while fetching GPA data');
      setLoading(false);
    }
  };

  // GPA chart loading state
  const renderGpaChart = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return <div className="text-red-500 text-center py-8">{error}</div>;
    }

    if (gpaDistributionData.length === 0) {
      return <div className="text-gray-500 text-center py-8">No GPA data available</div>;
    }

    return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={gpaDistributionData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis label={{ value: '', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Students">
            {
              gpaDistributionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // Skills demand chart with loading state
  const renderSkillsChart = () => {
    if (skillsLoading) {
      return (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (skillsError) {
      return <div className="text-red-500 text-center py-8">{skillsError}</div>;
    }

    if (skillDemandData.length === 0) {
      return <div className="text-gray-500 text-center py-8">No skills demand data available</div>;
    }

    return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          layout="vertical"
          data={skillDemandData}
          margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6">
            {skillDemandData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  // Render report charts with loading state
  const renderReportCharts = () => {
    if (reportsLoading) {
      return (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (reportsError) {
      return <div className="text-red-500 text-center py-8">{reportsError}</div>;
    }

    return (
      <div className="flex justify-around">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={weekly}
                dataKey="value"
                nameKey="name"
                outerRadius={60}
                label
              >
                {weekly.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <h3 className="text-center font-medium text-sm mb-2 text-gray-600">Weekly Reports</h3>
        </div>

        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={monthly}
                dataKey="value"
                nameKey="name"
                outerRadius={60}
                label
              >
                {monthly.map((entry, index) => (
                  <Cell key={`cell2-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <h3 className="text-center font-medium text-sm mb-2 text-gray-600">Monthly Reports</h3>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* Middle Row - Main charts */}


      {/* Registration Trends Over Time */}
      <div className="col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Registration Trends</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={monthlyRegistrationData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="student" stroke="#3b82f6" strokeWidth={2} />
            <Line type="monotone" dataKey="company" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* GPA Distribution Chart */}
      <div className="col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Student GPA Distribution</h2>
        {renderGpaChart()}
      </div>

      {/* Bottom Row - Additional insights */}
      {/* Skills in Demand */}
      <div className="col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">IT Skills in Demand</h2>
        {renderSkillsChart()}
      </div>

      <div className="col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Report Submission Status</h2>
        {renderReportCharts()}
      </div>

    </div>
  );
};

// Activity Metric Component
const ActivityMetric = ({ title, value, icon }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="mr-2 text-blue-500">{icon}</div>
        <span className="text-gray-600">{title}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );
};

export default AdminAnalytics;