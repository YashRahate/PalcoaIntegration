
import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManagerForm = () => {
  const [formData, setFormData] = useState({
    staff_name: "",
    email: "",
    category: "manager",
    password: "",
    staff_mobile_number: "",
    outlet_id: "", // Assuming outlet_id is also a part of the manager data
  });
  const [isUserFound, setIsUserFound] = useState(true); 
  const navigate = useNavigate();


const fetchMobileNumbers = async (inputValue) => {
    if (!inputValue) return [];
    try {
      const response = await axios.get(
        `http://localhost:5000/api/get-users-staff?staff_mobile_number=${inputValue}`
      );
      const users = response.data;
  
      if (users.length > 0) {
        setIsUserFound(true);
        return users.map((user) => ({
          label: `${user.staff_name} (${user.staff_mobile_number})`,
          value: user.staff_mobile_number,
          userData: user,
        }));
      } else {
        setIsUserFound(false);
        return [];
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsUserFound(false);
      return [];
    }
  };
  
  // Custom message when no options are available
  const noOptionsMessage = () => (
    <button
      type="button"
      className="p-2 bg-green-500 text-white rounded-md w-full text-center"
      onClick={handleAddUser}
    >
      Add New User
    </button>
  );
// Navigate to Add User page
const handleAddUser = () => {
    navigate("/add-user");
  };

  // Handle change when a mobile number is selected
  const handleMobileChange = (selectedOption) => {
    if (selectedOption?.userData) {
      setFormData({
        ...formData,
        staff_name: selectedOption.userData.staff_name,
        email: selectedOption.userData.email || "",
        staff_mobile_number: selectedOption.userData.staff_mobile_number,
        outlet_id: selectedOption.userData.outlet_id || "", 
      });
    } else {
      setFormData({
        ...formData,
        staff_mobile_number: selectedOption?.value || "",
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send request to update user to manager and set the password
      await axios.post("http://localhost:5000/api/update-to-manager", {
        staff_mobile_number: formData.staff_mobile_number,
        password: formData.password, // Update password for the user
      });
      alert("Manager updated successfully");
      navigate("/success"); // Navigate to a success page after submission
    } catch (error) {
      console.error("Error updating manager", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-200 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Manager</h2>

      <div className="relative">
        <AsyncSelect
          cacheOptions
          loadOptions={fetchMobileNumbers}
          onChange={handleMobileChange}
          placeholder="Staff Mobile Phone"
          isClearable
          noOptionsMessage={noOptionsMessage}
          value={
            formData.staff_mobile_number
              ? { label: formData.staff_mobile_number, value: formData.staff_mobile_number }
              : null
          }
        />
      </div>

      {/* Name, email, and password input */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
          value={formData.staff_name}
          readOnly
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
          value={formData.email}
          readOnly
        />
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>

      {/* Optional: outlet_id display */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Outlet ID</label>
        <input
          type="text"
          name="outlet_id"
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm"
          value={formData.outlet_id}
          readOnly
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default ManagerForm;
