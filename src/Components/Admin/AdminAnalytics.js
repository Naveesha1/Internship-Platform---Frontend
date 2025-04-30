import React, { useState, useEffect, useContext } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';

// Dashboard component that contains all analytics graphs
  const AdminAnalytics = () => {

  // State for storing data from API
  const [skillDemandData, setSkillDemandData] = useState([]);
  const [gpaDistributionData, setGpaDistributionData] = useState([]);
  const [monthlyRegistrationData, setMonthlyRegistrationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add loading state for skill demand data
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState(null);
  
  // Add loading state for report data
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState(null);
  const [itInternshipData, setItInternshipData] = useState([]);
  const [itmInternshipData, setItmInternshipData] = useState([]);
  const [aiInternshipData, setAiInternshipData] = useState([]);
  const [allInternshipData, setAllInternshipData] = useState([]);

    // State for company and position statistics
    const [topCompanies, setTopCompanies] = useState([]);
    const [allPositions, setAllPositions] = useState([]);

    // Internship secure status through the recent 4 months
    const [monthlyInternships, setMonthlyInternships] = useState([]);

  

  const { url } = useContext(StoreContext);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  const LINE_COLORS = {
    IT: '#0088FE',
    ITM: '#00C49F',
    AI: '#FFBB28'
  };

  // Fetch data from APIs on component mount
  useEffect(() => {
    fetchSkillDemandData();
    fetchGpaDistributionData();
    fetchMonthlyRegistrations();
    fetchInternshipStatistics();
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

  const fetchInternshipStatistics = async () => {
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
    const response = await axios.get(`${url}/api/admin/getInternshipStatistics`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (response.data.success) {
      
      if (response.data.data.itInternship) {
        setItInternshipData(response.data.data.itInternship);
      }
      if (response.data.data.itmInternship) {
        setItmInternshipData(response.data.data.itmInternship);
      }
      if (response.data.data.aiInternship) {
        setAiInternshipData(response.data.data.aiInternship);
      }
      if (response.data.data.allInternship) {
        setAllInternshipData(response.data.data.allInternship);
      }
      
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

  // Secure Internship chart with loading state
  const renderInternshipCharts =() => {
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
  
    // Colors for pie charts
    const COLORS = ['#1E90FF', '#00CED1', '#20B2AA', '#4682B4', '#2E8B57', '#5F9EA0'];
  
    return (
      <div>
  
        {/* New internship charts - first row */}
        <div className="flex mb-8">
          <div className="w-1/2">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={itInternshipData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={60}
                  label
                >
                  {itInternshipData.map((entry, index) => (
                    <Cell key={`cell-it-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <h3 className="text-center font-medium text-sm mb-2 text-gray-600">IT Students Internship Status</h3>
          </div>
  
          <div className="w-1/2">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={itmInternshipData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={60}
                  label
                >
                  {itmInternshipData.map((entry, index) => (
                    <Cell key={`cell-itm-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <h3 className="text-center font-medium text-sm mb-2 text-gray-600">ITM Students Internship Status</h3>
          </div>
        </div>
        <div className='flex'>
          <div className="w-1/2">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={aiInternshipData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={60}
                  label
                >
                  {aiInternshipData.map((entry, index) => (
                    <Cell key={`cell-ai-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <h3 className="text-center font-medium text-sm mb-2 text-gray-600">AI Students Internship Status</h3>
          </div>
  
          <div className="w-1/2">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={allInternshipData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={60}
                  label
                >
                  {allInternshipData.map((entry, index) => (
                    <Cell key={`cell-all-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <h3 className="text-center font-medium text-sm mb-2 text-gray-600">All Students Internship Status</h3>
          </div>
        </div>
      </div>
   
    );
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("authToken");

        if (!token) {
          setSkillsError('Authentication token not found');
          setSkillsLoading(false);
          return;
        }
        const [selectionsResponse, internshipsResponse] = await Promise.all([
          axios.get(`${url}/api/admin/getSelectionStatistics`),
          axios.get(`${url}/api/admin/getMonthlyInternshipsByDegree`)
        ]);
        
        if (selectionsResponse.data.success) {
          setTopCompanies(selectionsResponse.data.data.topCompanies);
          setAllPositions(selectionsResponse.data.data.allPositions);
        } else {
          throw new Error(selectionsResponse.data.message || 'Failed to fetch selection statistics');
        }

        if (internshipsResponse.data.success) {
          setMonthlyInternships(internshipsResponse.data.data);
        } else {
          throw new Error(internshipsResponse.data.message || 'Failed to fetch internship statistics');
        }
      } catch (err) {
        console.error("Error fetching statistics:", err);
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Render charts with loading state
  const renderStatisticsCharts = () => {
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
    
    return (
      <div className="flex flex-col space-y-8">

        
        {/* Top Companies Chart Section */}
        <div className="flex">
          {/* Company Names Legend */}
          <div className="w-1/3 pr-4">
            <h3 className="font-medium text-gray-700 mb-4">Companies</h3>
            <div className="space-y-2">
              {topCompanies.map((company, index) => (
                <div key={`company-${index}`} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm truncate" title={company.name}>
                    {company.name}
                  </span>
                  <span className="ml-auto text-sm text-gray-500">{company.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Company Doughnut Chart */}
          <div className="w-2/3">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={topCompanies}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                >
                  {topCompanies.map((entry, index) => (
                    <Cell key={`company-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} selections`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* All Positions Chart Section */}
        <div className="flex">
          {/* Position Names Legend */}
          <div className="w-1/3 pr-4">
            <h3 className="font-medium text-gray-700 mb-4">Positions</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {allPositions.map((position, index) => (
                <div key={`position-${index}`} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[(index + 2) % COLORS.length] }}
                  />
                  <span className="text-sm truncate" title={position.name}>
                    {position.name}
                  </span>
                  <span className="ml-auto text-sm text-gray-500">{position.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Position Doughnut Chart */}
          <div className="w-2/3">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={allPositions}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                >
                  {allPositions.map((entry, index) => (
                    <Cell key={`position-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} selections`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
                {/* Monthly Internships Line Chart */}
                <div className="w-full">
          <h3 className="font-medium text-gray-600 mb-4">Monthly Internships by Degree</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyInternships}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`${value} students`, name]} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="IT" 
                stroke={LINE_COLORS.IT} 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="ITM" 
                stroke={LINE_COLORS.ITM} 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="AI" 
                stroke={LINE_COLORS.AI} 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };




  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* Middle Row - Main charts */}

      {/* Registration Trends Over Time */}
      <div className="col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">System's Registration Trends</h2>
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

      {/* Skills in Demand */}
      <div className="col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">IT Skills in Demand</h2>
        {renderSkillsChart()}
      </div>

      <div className="col-span-1 row-span-2 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Most Selected</h2>
        {renderStatisticsCharts()}
      </div>

      <div className="col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Internship Secure Status</h2>
        {renderInternshipCharts()}
      </div>

    </div>
  );
};



export default AdminAnalytics;