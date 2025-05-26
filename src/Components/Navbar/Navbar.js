import React, { useState, useEffect, useContext } from 'react';
import logo from '../../Images/logo.png';
import doorbell from '../../Images/Doorbell.png';
import profile from '../../Images/Profile.png';
import { jwtDecode } from 'jwt-decode';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [userReady, setUserReady] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [role, setRole] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [checkedNotifications, setCheckedNotifications] = useState({});

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setRegisteredEmail(decoded.email);
      setRole(decoded.role);
      setUserReady(true);
    } catch (error) {
      localStorage.removeItem("authToken");
      navigate("/");
    }
  }, []);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      let response;

      if (role === "Admin") {
        const data = { registeredEmail,role };
        response = await axios.post(`${url}/api/notification/getAdminNotifications`, data);
      } else if (role === "Student") {
        const data = { registeredEmail,role };
        response = await axios.post(`${url}/api/notification/getStudentNotifications`, data);
      } else if (role === "Company") {
        const data = { registeredEmail,role };
        response = await axios.post(`${url}/api/notification/getCompanyNotifications`, data);
      } else {
        const mentor = "Mentor";
        const data = { registeredEmail, mentor };
        response = await axios.post(`${url}/api/notification/getMentorNotifications`, data);
      }

      if (response?.data.success) {
        setNotifications(response.data.data);
      } else {
        console.log(response?.data.message);
      }
    } catch (error) {
      console.log("An error occurred while fetching notifications:", error);
    }
  };

  // Fetch notifications when user is ready
  useEffect(() => {
    if (userReady) {
      fetchNotifications();
    }
  }, [userReady]);

  const toggleCheck = async (notificationId) => {
    try {
      const response = await axios.post(`${url}/api/notification/changeNotificationStatus`, { notificationId });
      if (response.data.success) {
        toast.success(response.data.message);
        setCheckedNotifications((prev) => ({
          ...prev,
          [notificationId]: true
        }));
        fetchNotifications(); // Refresh notifications
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating notification status");
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadIds = notifications.filter(n => !n.isRead).map(n => n._id);
      if (unreadIds.length === 0) return;

      const response = await axios.post(`${url}/api/notification/markAllAsRead`, { notificationIds: unreadIds });
      if (response.data.success) {
        toast.success("All notifications marked as read");
        fetchNotifications();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while marking all as read");
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!userReady) return null;

  return (
    <div className="bg-white shadow-custom relative">
      <nav className="flex justify-between items-center px-6 py-0">
        <img src={logo} alt="Logo" className="h-20" />
        <div className="flex items-center space-x-6 relative">
          <div className="relative cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
            <img src={doorbell} alt="Doorbell" className="h-6" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          {/* <img src={profile} alt="Profile" className="h-6 cursor-pointer" /> */}
        </div>
      </nav>

      {showDropdown && (
        <div className="absolute right-6 mt-2 w-60 max-h-96 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg z-50">
          {notifications.length === 0 ? (
            <p className="p-4 text-center text-gray-500">No notifications</p>
          ) : (
            <>
              {unreadCount > 0 && (
                <div className="flex justify-end px-3 py-2 border-b bg-gray-50">
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
              )}
              {[...notifications]
                .sort((a, b) => a.isRead - b.isRead)
                .map((notification) => {
                  const isRead = notification.isRead;
                  return (
                    <div
                      key={notification._id}
                      className={`flex items-center justify-between p-3 border-b last:border-b-0 ${
                        isRead ? 'bg-gray-100' : 'bg-white'
                      }`}
                    >
                      <p className={`text-sm ${isRead ? 'text-gray-500' : 'text-gray-700'}`}>
                        {notification.message}
                      </p>
                      <button
                        onClick={() => !isRead && toggleCheck(notification._id)}
                        className={`w-3 h-3 rounded-full border-2 transition-colors
                          ${checkedNotifications[notification._id] || isRead
                            ? 'bg-green-300 border-green-600'
                            : 'bg-gray-300 border-gray-600'}`}
                        disabled={isRead}
                        aria-label="Mark notification as read"
                        title={isRead ? "Already read" : "Mark as read"}
                      />
                    </div>
                  );
                })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
