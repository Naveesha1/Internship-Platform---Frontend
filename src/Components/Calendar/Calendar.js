import React, { useState, useContext, useEffect } from "react";
import AddReminderPopup from "./AddReminderPopup";
import ViewRemindersPopup from "./ViewRemindersPopup";
import { jwtDecode } from "jwt-decode";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

// Status-based color mapping
const STATUS_COLORS = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Normal: "bg-green-500",
};

const Calendar = () => {
  const { url, addedEvents, setAddedEvents } = useContext(StoreContext);

  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [reminders, setReminders] = useState({});
  const [event, setEvent] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [registeredEmail, setRegisteredEmail] = useState(null);

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (month, year) =>
    new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      days.push({
        day: prevMonthDays - firstDay + i + 1,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      days.push({
        day: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handleDateClick = (day) => {
    if (!day.isCurrentMonth) return;

    const dateString = `${day.year}-${(day.month + 1)
      .toString()
      .padStart(2, "0")}-${day.day.toString().padStart(2, "0")}`;
    setSelectedDate(dateString);

    const eventsForDate = addedEvents.filter(
      (event) => event.date === dateString
    );
    setEvent(eventsForDate);

    if (eventsForDate.length > 0) {
      setShowViewPopup(true);
    } else {
      setShowAddPopup(true);
    }
  };

  const handleAddReminder = (reminder) => {
    setReminders((prev) => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), reminder],
    }));
    setShowAddPopup(false);
  };

  const getHighestPriorityColor = (dateString) => {
    const dateReminders = addedEvents.filter(
      (event) => event.date === dateString
    );

    if (!dateReminders || dateReminders.length === 0) return "";

    if (dateReminders.some((event) => event.status === "High")) {
      return STATUS_COLORS.High;
    } else if (dateReminders.some((event) => event.status === "Medium")) {
      return STATUS_COLORS.Medium;
    } else {
      return STATUS_COLORS.Normal;
    }
  };

  const navigateMonth = (direction) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Decode token once
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRegisteredEmail(decoded.email);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, []);

  // Fetch events when email is ready
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post(`${url}/api/calender/getEvents`, {
          registeredEmail,
        });
        if (response.data.success) {
          setAddedEvents(response.data.data);
        } else {
          setAddedEvents([]);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    if (registeredEmail) {
      fetchEvents();
    }
  }, [registeredEmail]);

  return (
    <div className="p-4 ml-4 mr-4 mt-20 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigateMonth("prev")}
            className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            ←
          </button>
          <button
            onClick={() => navigateMonth("next")}
            className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            →
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm">High Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm">Medium Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm">Low Priority</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 h-96 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center py-2 font-semibold text-cyan-600"
          >
            {day}
          </div>
        ))}

        {generateCalendarDays().map((day, index) => {
          const dateString = `${day.year}-${(day.month + 1)
            .toString()
            .padStart(2, "0")}-${day.day.toString().padStart(2, "0")}`;
          const hasReminders = reminders[dateString]?.length > 0;
          const priorityColor = getHighestPriorityColor(dateString);

          return (
            <div
              key={index}
              onClick={() => day.isCurrentMonth && handleDateClick(day)}
              className={`p-2 text-center cursor-pointer relative
                ${day.isCurrentMonth ? "hover:bg-blue-200" : "text-gray-400"}
                ${priorityColor ? `${priorityColor} text-black` : "bg-white"}
                border border-gray-200`}
            >
              <span>{day.day}</span>
              {hasReminders && (
                <div className="absolute top-1 right-1">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showAddPopup && (
        <AddReminderPopup
          selectedDate={selectedDate}
          onClose={() => setShowAddPopup(false)}
          onSave={handleAddReminder}
        />
      )}

      {showViewPopup && (
        <ViewRemindersPopup
          date={selectedDate}
          reminders={event || []}
          onClose={() => setShowViewPopup(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
