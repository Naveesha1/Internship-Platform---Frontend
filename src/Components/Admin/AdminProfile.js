import React, { useEffect, useState, useContext } from "react";
import AddAdminForm from "./CreateAdminForm";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

const AdminProfile = () => {
  const { url, adminsData, setAdminsData } = useContext(StoreContext);

  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const registeredEmail = decodedToken.email;
  const name = decodedToken.name;

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState("");
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    position: "",
    email: "",
    password: "",
  });

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin((prev) => ({ ...prev, [name]: value }));
  };

  // Function to add a new admin
  const handleAddAdmin = async () => {
    if (
      newAdmin.name &&
      newAdmin.position &&
      newAdmin.email &&
      newAdmin.password
    ) {
      const response = await axios.post(
        `${url}/api/admin/addNewAdmin`,
        newAdmin
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setAdminsData((previousData) => [...previousData, newAdmin]);
        setNewAdmin({ name: "", position: "", email: "", password: "" });
      } else {
        toast.error(response.data.message);
      }

      setIsModalOpen(false);
    }
  };

  const handleDelete = async (email) => {
    console.log(email);

    const response = await axios.post(`${url}/api/admin/deleteAdmin`, {
      email,
    });
    if (response.data.success) {
      setAdminsData((prevItems) =>
        prevItems.filter((item) => item.email !== email)
      );
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    const getAdminProfile = async () => {
      const response = await axios.post(`${url}/api/admin/getProfile`, {
        registeredEmail,
      });
      if (response.data.success) {
        setPosition(response.data.data.position);
      }
    };
    getAdminProfile();
  }, [registeredEmail]);

  useEffect(() => {
    const getAllProfiles = async () => {
      const response = await axios.get(`${url}/api/admin/getAllProfiles`);
      if (response.data.success) {
        setAdminsData(response.data.data);
      }
    };
    getAllProfiles();
  }, [token]);
  

  return (
    <div className="p-8">
      {/* Featured Admin Card */}
      <div className="bg-gray-100 rounded-lg p-6 max-w-sm mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-2xl">👤</span>
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-gray-600">{position}</p>
            <p className="text-teal-600 text-sm">{registeredEmail}</p>
          </div>
        </div>
      </div>

      {/* Add New Admin Button */}
      <div className="mt-2 mb-4 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#45A29E] text-white px-4 py-2 rounded-lg hover:bg-[#367c79] transition-colors duration-300"
        >
          Add New Admin
        </button>
      </div>

      {/* Admin Table */}
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Position</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Remove</th>
            </tr>
          </thead>
          <tbody>
            {adminsData.map((admin, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-3 px-4">{admin.name}</td>
                <td className="py-3 px-4">{admin.position}</td>
                <td className="py-3 px-4">{admin.email}</td>
                <td className="py-3 px-4">
                  <button onClick={() => handleDelete(admin.email)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
