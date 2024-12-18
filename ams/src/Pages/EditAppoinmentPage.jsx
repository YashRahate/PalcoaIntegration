
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import AppointmentForm from "../Components/AppoinmentForm";
// import LogoutWarning from "@/Components/LogoutWarning";
// import { jwtDecode } from "jwt-decode";

// const EditAppointmentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { appointment } = location.state || {};

//   const allServices = [
//     { id: 1, name: 'Haircut' },
//     { id: 2, name: 'Manicure' },
//     { id: 3, name: 'Massage' },
//     // Add more services as needed
//   ];

//   const allPackages = [
//     { id: 1, name: 'Basic ' },
//     { id: 2, name: 'Deluxe ' },
//     { id: 3, name: 'Premium ' },
//     // Add more packages as needed
//   ];

//   const handleSave = (formData) => {
//     console.log("Updated appointment:", formData);
//     navigate("/appointments");
//   };

//   const [token, setToken] = useState({
//     token: "",
//     user_data:{}
//   });
//   useEffect(() => {
//     setToken(JSON.parse(localStorage.getItem("auth_data")));
//     console.log(token.token);
//     try {
//       const decoded = jwtDecode(token.token)
//       const currentTime = Date.now() / 1000;
//       if (decoded.exp < currentTime) {
//         localStorage.removeItem("auth_data");
//         setToken({ token: "", user_data: {} });
//       }
//     } catch (error) {
//       console.log(error);      
//     }
//   }, [])

//   return (
//     <>
//       {token ? (
//         <div className="p-4">
//           <h1 className="text-3xl mb-4">Edit Appointment</h1>
//           <AppointmentForm
//             appointment={appointment}
//             onSave={handleSave}
//             onCancel={() => navigate("/appointments")}
//             allServices={allServices}
//             allPackages={allPackages}
//           />
//         </div>
//       ) : (
//         <LogoutWarning />
//       )}
//     </>
//   );
// };

// export default EditAppointmentPage;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppointmentForm from "../Components/AppoinmentForm";
import axios from "axios";
import LogoutWarning from "@/Components/LogoutWarning";
import {jwtDecode} from "jwt-decode";

const EditAppointmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { appointment } = location.state || {};

  const handleSave = async (formData) => {
    console.log("formData",formData,"Appointment",appointment);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/update-appointment-staff/${appointment._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_data")?.token}`,
          },
        }
      );
      console.log("Updated appointment:", response.data);
      navigate("/appointments");
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const [token, setToken] = useState({
    token: "",
    user_data: {}
  });

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth_data"));
    if (authData) {
      setToken(authData);
      try {
        const decoded = jwtDecode(authData.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem("auth_data");
          setToken({ token: "", user_data: {} });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <>
      {token ? (
        <div className="p-4">
          <h1 className="text-3xl mb-4">Edit Appointment</h1>
          <AppointmentForm
            appointment={appointment}
            onSave={handleSave}
            onCancel={() => navigate("/appointments")}
          />
        </div>
      ) : (
        <LogoutWarning />
      )}
    </>
  );
};

export default EditAppointmentPage;
