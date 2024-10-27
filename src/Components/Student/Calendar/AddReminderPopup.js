// AddReminderPopup.js
import React, { useState } from 'react';

const AddReminderPopup = ({ selectedDate, onClose, onSave }) => {
  const [reminderText, setReminderText] = useState('');
  const [status, setStatus] = useState('Normal');
  const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reminderText.trim()) {
      onSave({ text: reminderText, status });
      setReminderText('');
      setStatus('Normal');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Add Reminder</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Date</label>
              <input
                type="text"
                value={formattedDate}
                disabled
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Add the Event</label>
              <input
                type="text"
                value={reminderText}
                onChange={(e) => setReminderText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                placeholder="Enter your reminder"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Priority Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Normal">Low</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReminderPopup;
