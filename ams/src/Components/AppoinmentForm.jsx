
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select"; // Import react-select for dynamic dropdown
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";

const AppointmentForm = ({ appointment, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_mobile_phone: "",
    status: "pending",
    time: "",
    services: [],
    packages: [],
    staff_id: "",
    outlet_id: "",
  });

  const [allServices, setAllServices] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [mobileOptions, setMobileOptions] = useState([]); // Mobile number options
  const [isUserFound, setIsUserFound] = useState(true); // To track if user found
  const navigate = useNavigate(); // To navigate to Add User page

  // Fetch services and packages when the component mounts
  useEffect(() => {
    const fetchServicesAndPackages = async () => {
      try {
        const servicesResponse = await axios.get(
          "http://localhost:5000/api/services"
        );
        const packagesResponse = await axios.get(
          "http://localhost:5000/api/packages"
        );

        // Map services and packages to the react-select format (label, value)
        const servicesOptions = servicesResponse.data.map((service) => ({
          label: service.service_name,
          value: service._id, // Assuming _id is the correct field for the service ID
          service_price: Number(service.price),
        }));

        const packagesOptions = packagesResponse.data.map((pkg) => ({
          label: pkg.package_name,
          value: pkg._id,
          pkg_price: Number(pkg.price), // Assuming _id is the correct field for the package ID
        }));

        setAllServices(servicesOptions);
        setAllPackages(packagesOptions);
      } catch (error) {
        console.error("Error fetching services or packages:", error);
      }
    };
    fetchServicesAndPackages();
  }, []);

  useEffect(() => {
    // const userData = JSON.parse();
    const userData = JSON.parse(localStorage.getItem("auth_data"));
    const staffId = userData ? userData.user_data._id : null;
    const outlet_id = userData ? userData.user_data.outlet_id : null;

    // console.log(userData);
    // console.log(staffId)
    console.log("List of packages",allPackages, "List of services",allServices);
    console.log(outlet_id);
    if (staffId) {
      setFormData((prevState) => ({
        ...prevState,
        staff_id: staffId,
      }));
    }
  }, [allPackages, allServices]);

  useEffect(() => {
    // const userData = JSON.parse();
    const userData = JSON.parse(localStorage.getItem("auth_data"));
    const outlet = localStorage.getItem("outlet_id");
    // const staffId = userData ? userData.user_data._id : null;
    const outlet_id = outlet ? outlet : null;

    // console.log(userData);
    // console.log(staffId)
    console.log(outlet_id);
    if (outlet_id) {
      setFormData((prevState) => ({
        ...prevState,
        outlet_id: outlet_id,
      }));
    }
  }, []);

  // useEffect(() => {
  //   if (appointment) {
  //     setFormData({
  //       ...appointment,
  //       services: appointment.services?.map((s) => {s._id,s.service_name,s.price}) || [],
  //       packages: appointment.packages?.map((p) => {p._id,p.package_name,p.price}) || [],
  //       time: appointment.time || "",
  //     });
  //   }
  // }, [appointment]);
  useEffect(() => {
    if (appointment) {
      setFormData({
        ...appointment,
        services: appointment.services?.map((s) => ({
          _id: s._id,
          service_name: s.service_name,
          price: s.price
        })) || [],
        packages: appointment.packages?.map((p) => ({
          _id: p._id,
          package_name: p.package_name,
          price: p.price
        })) || [],
        
      });
    }
  }, [appointment]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle service selection using react-select
  const handleServiceChange = (selectedOptions) => {
    const selectedServices = selectedOptions
      ? selectedOptions.map((option) => ({
          _id: option.value,
          name: option.label,
          price: option.service_price,
        }))
      : [];
    setFormData((prevState) => ({
      ...prevState,
      services: selectedServices,
    }));
  };
  
  const handlePackageChange = (selectedOptions) => {
    const selectedPackages = selectedOptions
      ? selectedOptions.map((option) => ({
          _id: option.value,
          name: option.label,
          price: option.pkg_price,
        }))
      : [];
    setFormData((prevState) => ({
      ...prevState,
      packages: selectedPackages,
    }));
  };
  

  // Fetch mobile numbers based on input
  const fetchMobileNumbers = async (inputValue) => {
    if (!inputValue) return [];
    try {
      const response = await axios.get(
        `http://localhost:5000/api/get-users?mobile_phone=${inputValue}`
      );
      const users = response.data;

      if (users.length > 0) {
        setIsUserFound(true);
        return users.map((user) => ({
          label: `${user.full_name} (${user.mobile_phone})`,
          value: user.mobile_phone,
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

  // Handle mobile number selection
  const handleMobileChange = (selectedOption) => {
    if (selectedOption?.userData) {
      setFormData((prevState) => ({
        ...prevState,
        customer_name: selectedOption.userData.full_name,
        customer_email: selectedOption.userData.email || "",
        customer_mobile_phone: selectedOption.userData.mobile_phone,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        customer_mobile_phone: selectedOption?.value || "",
      }));
    }
  };

  // Navigate to Add User page
  const handleAddUser = () => {
    navigate("/add-user");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Pre-select services and packages by matching their IDs
  const selectedServices = allServices.filter((service) =>
    formData.services?.some((selectedService) => selectedService?._id === service.value)
  );
  console.log(selectedServices)
  const selectedPackages = allPackages.filter((pkg) =>
    formData.packages?.some((selectedPackage) => selectedPackage?._id === pkg.value)
  );
  
  

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Appointment Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <input
            type="tel"
            name="customer_mobile_phone"
            value={formData.customer_mobile_phone}
            onChange={handleChange}
            placeholder="Customer Mobile Phone"
            className="p-2 border rounded-md"
            required
          /> */}
          {/* Mobile Phone Field with AsyncSelect */}
          <div className="relative">
            <AsyncSelect
              cacheOptions
              loadOptions={fetchMobileNumbers} // Dynamically fetch mobile numbers
              onChange={handleMobileChange}
              placeholder="Customer Mobile Phone"
              isClearable
              defaultOptions={false}
              noOptionsMessage={noOptionsMessage} // Show "Add New User" button if no match found
              value={
                formData.customer_mobile_phone
                  ? {
                      label: formData.customer_mobile_phone,
                      value: formData.customer_mobile_phone,
                    }
                  : null
              }
            />
          </div>

          <input
            type="text"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            placeholder="Customer Name"
            className="p-2 border rounded-md"
          />
          <input
            type="email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
            placeholder="Customer Email"
            className="p-2 border rounded-md"
          />
          <input
            type="datetime-local"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Time"
            className="p-2 border rounded-md"
          />
        </div>

        <div className="mt-4">
          <h2 className="text-lg mb-2">Status</h2>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
          >
            <option value="">Select Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Services Selection */}
        <div className="mt-4">
          <h2 className="text-lg mb-2">Services</h2>
          <Select
            isMulti
            options={allServices}
            value={selectedServices} // Pre-select services
            onChange={handleServiceChange}
            placeholder="Search and select services"
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        {/* Packages Selection */}
        <div className="mt-4">
          <h2 className="text-lg mb-2">Packages</h2>
          <Select
            isMulti
            options={allPackages}
            value={selectedPackages} // Pre-select packages
            onChange={handlePackageChange}
            placeholder="Search and select packages"
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div className="mt-4 flex justify-between">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Save Appointment
          </button>
          <button
            type="button"
            className="p-2 bg-red-500 text-white rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
