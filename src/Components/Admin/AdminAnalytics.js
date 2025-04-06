import React, { useState, useEffect, useContext } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from 'recharts';
import { Calendar, Clock, Activity, Users, Briefcase, Award, TrendingUp } from 'lucide-react';
import axios from 'axios'; // Make sure you have axios installed
import { StoreContext } from '../../Context/StoreContext';

// Dashboard component that contains all analytics graphs
const AdminAnalytics = () => {
  // State for storing data from API
  const [internshipData, setInternshipData] = useState(null);
  const [applicationStats, setApplicationStats] = useState(null);
  const [userActivityData, setUserActivityData] = useState(null);
  const [skillDemandData, setSkillDemandData] = useState(null);
  const [gpaDistributionData, setGpaDistributionData] = useState([]);
  const [monthlyRegistrationData, setMonthlyRegistrationData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { url } = useContext(StoreContext);
  

  // Fetch data from APIs on component mount
  useEffect(() => {
    // In a real implementation, these would be actual API calls
    fetchInternshipData();
    fetchApplicationStats();
    fetchUserActivityData();
    fetchSkillDemandData();
    fetchGpaDistributionData();
    fetchMonthlyRegistrations();
  }, []);

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

  const fetchInternshipData = async () => {
    try {
      // API endpoint: /api/internships/status
      const response = await fetch('https://your-backend-api.com/api/internships/status');
      const data = await response.json();
      setInternshipData(data);
    } catch (error) {
      console.error("Error fetching internship data:", error);
    }
  };

  const fetchApplicationStats = async () => {
    try {
      // API endpoint: /api/applications/stats
      const response = await fetch('https://your-backend-api.com/api/applications/stats');
      const data = await response.json();
      setApplicationStats(data);
    } catch (error) {
      console.error("Error fetching application stats:", error);
    }
  };

  const fetchUserActivityData = async () => {
    try {
      // API endpoint: /api/users/activity
      const response = await fetch('https://your-backend-api.com/api/users/activity');
      const data = await response.json();
      setUserActivityData(data);
    } catch (error) {
      console.error("Error fetching user activity data:", error);
    }
  };

  const fetchSkillDemandData = async () => {
    try {
      // API endpoint: /api/skills/demand
      const response = await fetch('https://your-backend-api.com/api/skills/demand');
      const data = await response.json();
      setSkillDemandData(data);
    } catch (error) {
      console.error("Error fetching skill demand data:", error);
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

  // Sample data only for other charts
  const sampleSkillDemandData = [
    { name: 'React', value: 60 },
    { name: 'Python', value: 45 },
    { name: 'Java', value: 30 },
    { name: 'Node.js', value: 25 },
    { name: 'SQL', value: 40 }
  ];

  const sampleApplicationTrendData = [
    { month: 'Jan', applications: 120, placements: 32 },
    { month: 'Feb', applications: 150, placements: 40 },
    { month: 'Mar', applications: 180, placements: 52 },
    { month: 'Apr', applications: 170, placements: 48 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

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
        <h2 className="text-lg font-semibold mb-4">Skills in Demand</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            layout="vertical"
            data={sampleSkillDemandData}
            margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6">
              {sampleSkillDemandData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>




      {/* Real-time User Activity */}
      <div className="col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Real-time Platform Activity</h2>
        <div className="flex flex-col space-y-4">
          <ActivityMetric title="Active Users" value="126" icon={<Users size={18} />} />
          <ActivityMetric title="Applications Today" value="42" icon={<Briefcase size={18} />} />
          <ActivityMetric title="Interviews Today" value="18" icon={<Clock size={18} />} />
          <ActivityMetric title="New Registrations" value="24" icon={<Activity size={18} />} />
          <ActivityMetric title="Conversion Rate" value="34%" icon={<TrendingUp size={18} />} />
        </div>
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