// ViewRemindersPopup.js
import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../Context/StoreContext";

const ViewRemindersPopup = ({ date, reminders, onClose }) => {
  const { url, setAddedEvents } = useContext(StoreContext);
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;
  // Function to handle the reminder update action
  const deleteReminder = async (reminderId) => {
    const response = await axios.put(`${url}/api/calender/updateEvent`, {
      registeredEmail,
      reminderId,
    });
    if (response.data.success) {
      setAddedEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== reminderId)
      );
      toast.success(response.data.message);
      onClose();
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Reminders for {formattedDate}
          </h3>
          <div className="max-h-64 overflow-y-auto mb-4">
            {reminders.map((reminder, index) => (
              <div
                key={index}
                className="p-3 mb-2 rounded bg-cyan-700 text-gray-100"
              >
                <p>{reminder.reminderText}</p>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => deleteReminder(reminder._id)}
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
