import React, { useState ,useEffect} from "react";
import axios from "axios";
import Select from "react-select";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    staff_name: "",
    email: "",
    gender: "",
    category: "staff",  // Fixed as "staff"
    role: "Barber",
    staff_mobile_number: "",
    outlet_id: null, 
  });
  const [outlets, setOutlets] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, outlet_id: selectedOption.value });  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup-staff", formData);
      alert("Employee added successfully");
    } catch (error) {
      console.error("Error adding employee", error);
    }
  };

  // Fetch outlets dynamically from the API
  useEffect(() => {
    const getOutlets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/outlet");
        const outletOptions = response.data.map((outlet) => ({
          value: outlet._id,
          label: outlet.outlet_name,
        }));
        setOutlets(outletOptions);
      } catch (error) {
        console.log("Error while fetching outlets", error);
      }
    };

    getOutlets();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-200 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Add Employee</h2>
      {/* Name */}
      <div className="mb-4">
        <label>Name</label>
        <input
          name="staff_name"
          value={formData.staff_name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      
      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter email"
          required
        />
      </div>
      
      {/* Gender */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      {/* Mobile Number */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
        <input
          type="tel"
          name="staff_mobile_number"
          value={formData.staff_mobile_number}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter mobile number"
          required
        />
      </div>
      
      {/* Outlet Name */}
       <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Outlet Name</label>
        <Select
          name="outletname"
          options={outlets} 
          value={formData.outletname}
          onChange={handleSelectChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Select or search an outlet"
          isSearchable={true}
          required
        />
      </div>

      

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option>Barber</option>
          <option>Hair Stylist</option>
          <option>Nail Technician</option>
          <option>Masseuse</option>
          <option>Facialist</option>
          <option>Receptionist</option>
        </select>
      </div>
      {/* Other inputs */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};

export default EmployeeForm;
