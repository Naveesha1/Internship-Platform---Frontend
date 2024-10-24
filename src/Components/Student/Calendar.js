import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Eye } from 'lucide-react';

// Color palette for reminder dates
const REMINDER_COLORS = [
  'bg-teal-500',   // Teal
  'bg-purple-500', // Purple
  'bg-pink-500',   // Pink
  'bg-blue-500',   // Blue
  'bg-orange-500'  // Orange
];

// Add Reminder Component
const AddReminderPopup = ({ selectedDate, onClose, onSave }) => {
  const [reminderText, setReminderText] = useState('');
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reminderText.trim()) {
      onSave(reminderText);
      setReminderText('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Add Reminder</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Date
              </label>
              <input
                type="text"
                value={formattedDate}
                disabled
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Add the Event
              </label>
              <input
                type="text"
                value={reminderText}
                onChange={(e) => setReminderText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                placeholder="Enter your reminder"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// View Reminders Component
const ViewRemindersPopup = ({ date, reminders, onClose }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Reminders for {formattedDate}</h3>
          <div className="max-h-64 overflow-y-auto mb-4">
            {reminders.map((reminder, index) => (
              <div
                key={index}
                className={`p-3 mb-2 rounded ${REMINDER_COLORS[index % REMINDER_COLORS.length]} text-white`}
              >
                {reminder}
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Calendar Component
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [reminders, setReminders] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Previous month days
    for (let i = 0; i < firstDay; i++) {
      const prevMonthDays = getDaysInMonth(currentMonth - 1, currentYear);
      days.push({
        day: prevMonthDays - firstDay + i + 1,
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false
      });
    }

    return days;
  };

  const handleDateClick = (day, hasReminders) => {
    if (!day.isCurrentMonth) return;
    
    const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.day.toString().padStart(2, '0')}`;
    setSelectedDate(dateString);
    
    if (hasReminders) {
      setShowViewPopup(true);
    } else {
      setShowAddPopup(true);
    }
  };

  const handleAddReminder = (reminderText) => {
    setReminders(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), reminderText]
    }));
    setShowAddPopup(false);
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
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

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => navigateMonth('prev')}
            className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            ←
          </button>
          <button 
            onClick={() => navigateMonth('next')}
            className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            →
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center py-2 font-semibold text-gray-600">
            {day}
          </div>
        ))}
        
        {generateCalendarDays().map((day, index) => {
          const dateString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.day.toString().padStart(2, '0')}`;
          const hasReminders = reminders[dateString]?.length > 0;
          const reminderColor = hasReminders ? REMINDER_COLORS[(reminders[dateString].length - 1) % REMINDER_COLORS.length] : '';
          
          return (
            <div
              key={index}
              onClick={() => day.isCurrentMonth && handleDateClick(day, hasReminders)}
              className={`
                p-2 text-center cursor-pointer relative
                ${day.isCurrentMonth ? 'hover:bg-gray-100' : 'text-gray-400'}
                ${reminderColor ? `${reminderColor} text-white` : 'bg-white'}
                border border-gray-200
              `}
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

      {/* Popups */}
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
          reminders={reminders[selectedDate] || []}
          onClose={() => setShowViewPopup(false)}
        />
      )}
    </div>
  );
};

export default Calendar;