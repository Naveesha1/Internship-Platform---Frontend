import React, { useState } from "react";
import AddAdminForm from "./CreateAdminForm"; 

const AdminProfile = () => {
  // Sample admin data
  const [adminData, setAdminData] = useState([
    {
      name: "Heelibathdeniya ABCD",
      position: "Senior Lecture",
      email: "Heelibath123@gmail.com",
    },
    {
      name: "Dissanayake HGT",
      position: "Senior Lecture",
      email: "DissanayakeHYT@gmail.com",
    },
  ]);

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", position: "", email: "" });

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  // Function to add a new admin
  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.position && newAdmin.email) {
      setAdminData([...adminData, newAdmin]);
      setNewAdmin({ name: "", position: "", email: "" }); // Reset form
      setIsModalOpen(false); // Close modal
    }
  };

  return (
    <div className="p-8">
      {/* Featured Admin Card */}
      <div className="bg-gray-100 rounded-lg p-6 max-w-sm mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-2xl">👤</span>
          </div>
          <div>
            <h3 className="font-medium">Ekanayake HGNK</h3>
            <p className="text-gray-600">Senior Lecture</p>
            <p className="text-teal-600 text-sm">ekanayakehgnk@uom.lk</p>
          </div>
        </div>
      </div>

      {/* Admin Table */}
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Position</th>
              <th className="text-left py-3 px-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {adminData.map((admin, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-3 px-4">{admin.name}</td>
                <td className="py-3 px-4">{admin.position}</td>
                <td className="py-3 px-4">{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Admin Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#45A29E] text-white px-4 py-2 rounded-lg hover:bg-[#367c79] transition-colors duration-300"
        >
          Add New Admin
        </button>
      </div>

      {/* Show the Add Admin Form when modal is open */}
      {isModalOpen && (
        <AddAdminForm
          newAdmin={newAdmin}
          handleChange={handleChange}
          handleAddAdmin={handleAddAdmin}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminProfile;
