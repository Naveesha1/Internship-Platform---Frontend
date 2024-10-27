// ViewRemindersPopup.js
import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const ViewRemindersPopup = ({ date, reminders, onClose, onUpdateReminder, onDeleteReminder }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Function to handle the reminder update action
  const updateReminder = (reminder) => {
    onUpdateReminder(reminder); // Call the update function passed as a prop
  };

  // Function to handle the reminder delete action
  const deleteReminder = (reminderId) => {
    onDeleteReminder(reminderId); // Call the delete function passed as a prop
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Reminders for {formattedDate}</h3>
          <div className="max-h-64 overflow-y-auto mb-4">
            {reminders.map((reminder, index) => (
              <div key={index} className="p-3 mb-2 rounded bg-cyan-700 text-gray-100">
                <p>{reminder.text}</p>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => updateReminder(reminder)}
                    className="mr-2 px-3 py-1 text-white"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="px-3 py-1 text-white"
                  >
                   <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 border border-gray-400 drop-shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRemindersPopup;
