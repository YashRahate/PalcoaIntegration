// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { packages } from '../Data/package';
// import { services } from '../Data/service';
// import LogoutWarning from '@/Components/LogoutWarning';
// import { jwtDecode } from 'jwt-decode';

// const PackageForm = () => {
//   const { id } = useParams();  
//   const navigate = useNavigate();
//   const [packageData, setPackageData] = useState({
//     name: '',
//     price: '',
//     time: '',
//     category: '',
//     services: [],
//   });
//   const [token, setToken] = useState({
//     token: "",
//     user_data:{}
//   });
//   useEffect(() => {
//     if (id) {
//       const existingPackage = packages.find((pkg) => pkg.id === parseInt(id));
//       if (existingPackage) {
//         setPackageData(existingPackage);
//       }
//     }
//     setToken(JSON.parse(localStorage.getItem("auth_data")));
//     console.log(token.token);
//     try {
//       const decoded = jwtDecode(token.token)
//       const currentTime = Date.now() / 1000;
//       if (decoded.exp < currentTime) {
//         localStorage.removeItem("auth_data");
//         setToken({ token: null, user_data: {} });
//       }
//     } catch (error) {
//       console.log(error);      
//     }
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPackageData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleServiceChange = (e) => {
//     const { value, checked } = e.target;
//     setPackageData((prevState) => ({
//       ...prevState,
//       services: checked
//         ? [...prevState.services, value]
//         : prevState.services.filter((service) => service !== value),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(packageData);
//     navigate('/package-master');
//   };

//   return (
//     <>
//     {token ? (
//       <>
//       <div className="p-4">
//       <h1 className="text-3xl mb-4">{id ? 'Edit Package' : 'Add Package'}</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block mb-2">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={packageData.name}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded px-2 py-1 w-full"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Price</label>
//           <input
//             type="text"
//             name="price"
//             value={packageData.price}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded px-2 py-1 w-full"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Time</label>
//           <input
//             type="text"
//             name="time"
//             value={packageData.time}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded px-2 py-1 w-full"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Category</label>
//           <input
//             type="text"
//             name="category"
//             value={packageData.category}
//             onChange={handleInputChange}
//             className="border border-gray-300 rounded px-2 py-1 w-full"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-2">Services</label>
//           {services.map((service) => (
//             <div key={service.id}>
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   value={service.name}
//                   checked={packageData.services.includes(service.name)}
//                   onChange={handleServiceChange}
//                   className="form-checkbox"
//                 />
//                 <span className="ml-2">{service.name}</span>
//               </label>
//             </div>
//           ))}
//         </div>

//         <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
//           Save
//         </button>
//       </form>
//     </div>
//       </>
//     ):(
//       <LogoutWarning/>
//     )}
//     </>
//   );
// };

// export default PackageForm;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  // To make API requests
import Select from 'react-select';  // For dynamic search dropdown
import LogoutWarning from '@/Components/LogoutWarning';
import {jwtDecode} from 'jwt-decode';  // Corrected import

const PackageForm = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  
  // State for package data
  const [packageData, setPackageData] = useState({
    package_name: '', 
    price: '',
    estimated_time: '',  
    category: '',
    services: [],
  });
  
  // State for fetching available services
  const [availableServices, setAvailableServices] = useState([]);
  
  // State for token management
  const [token, setToken] = useState({
    token: "",
    user_data: {}
  });

  // Fetch available services and package data if editing
  useEffect(() => {
    // Fetch available services
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services');
        console.log("redposnse",response)
        // Map services for react-select (label, value format)
        const servicesOptions = response.data.map(service => ({
          label: service.service_name,
          value: service._id,
        }));
        console.log(servicesOptions)
        setAvailableServices(servicesOptions);  // Set the available services
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();

    // If editing an existing package, fetch the package data
    // if (id) {
    //   const fetchPackage = async () => {
    //     const existingPackage = await axios.get(`http://localhost:5000/api/packages/${id}`);
    //     console.log("existingPackage",existingPackage.data)
    //     if (existingPackage) {
    //       setPackageData(existingPackage.data);
    //     }
    //   };
    //   fetchPackage();
    // }
    if (id) {
      const fetchPackage = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/packages/${id}`);
          const existingPackage = response.data;

          // Set package data, including selected services
          setPackageData({
            ...existingPackage,
            services: existingPackage.services.map(service => service._id),  // Set services to an array of IDs
          });
        } catch (error) {
          console.error('Error fetching package:', error);
        }
      };
      fetchPackage();
    }

    // Check for token expiration
    const storedToken = JSON.parse(localStorage.getItem("auth_data"));
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwtDecode(storedToken.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("auth_data");
          setToken({ token: null, user_data: {} });
        }
      } catch (error) {
        console.log(error);      
      }
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle service selection using react-select
  const handleServiceChange = (selectedOptions) => {
    // Get selected services' IDs
    const selectedServices = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setPackageData((prevState) => ({
      ...prevState,
      services: selectedServices,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Update existing package
        await axios.put(`http://localhost:5000/api/packages/${id}`, packageData);
      } else {
        // Create new package
        await axios.post('http://localhost:5000/api/packages', packageData);
      }
      navigate('/package-master');  // Redirect after submission
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  return (
    <>
      {token ? (
        <div className="p-4">
          <h1 className="text-3xl mb-4">{id ? 'Edit Package' : 'Add Package'}</h1>
          <form onSubmit={handleSubmit}>
            {/* Package Name */}
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="package_name"
                value={packageData.package_name}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Package Price */}
            <div className="mb-4">
              <label className="block mb-2">Price</label>
              <input
                type="text"
                name="price"
                value={packageData.price}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Package Time */}
            <div className="mb-4">
              <label className="block mb-2">Time</label>
              <input
                type="text"
                name="estimated_time"
                value={packageData.estimated_time}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Package Category */}
            <div className="mb-4">
              <label className="block mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={packageData.category}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
            </div>

            {/* Services Selection (Using react-select) */}
            <div className="mb-4">
              <label className="block mb-2">Services</label>
              <Select
                isMulti
                options={availableServices}  // Available services fetched from API
                value={availableServices.filter(service => 
                  packageData.services.includes(service.value))} // Pre-select services
                onChange={handleServiceChange}
                placeholder="Select services..."
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </form>
        </div>
      ) : (
        <LogoutWarning />
      )}
    </>
  );
};

export default PackageForm;
