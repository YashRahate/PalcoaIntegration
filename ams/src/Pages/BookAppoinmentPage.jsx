// import React, { useState ,useEffect} from "react";
// import { useNavigate } from "react-router-dom";
// import AppointmentForm from "../Components/AppoinmentForm";
// import LogoutWarning from "@/Components/LogoutWarning";
// import { jwtDecode } from "jwt-decode";

// const BookAppointmentPage = () => {
//   const navigate = useNavigate();


//   const handleSaveAppointment = (formData) => {
//     console.log("New appointment:", formData);
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
//     {token ?(
//       <div className="p-4">
//       <h1 className="text-3xl mb-4">Book Appointment</h1>
//       <AppointmentForm
//         onSave={handleSaveAppointment}
//         onCancel={() => navigate("/appointments")}
//         allServices={allServices}
//         allPackages={allPackages}
//       />
//     </div>
//     ):(
//       <LogoutWarning/>
//     )}
//     </>
//   );
// };

// export default BookAppointmentPage;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentForm from "../Components/AppoinmentForm";
import axios from "axios";
import LogoutWarning from "@/Components/LogoutWarning";
import {jwtDecode} from "jwt-decode";

const BookAppointmentPage = () => {
  
  const navigate = useNavigate();

  const handleSaveAppointment = async (formData) => {
    try {
      console.log(formData); // Add this line to check the data being sent

      const response = await axios.post("http://localhost:5000/api/add-appointment-staff", formData, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      console.log("New appointment:", response.data);
      navigate("/appointments");
    } catch (error) {
      console.error("Error saving appointment:", error);
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
          <h1 className="text-3xl mb-4">Book Appointment</h1>
          <AppointmentForm
            onSave={handleSaveAppointment}
            onCancel={() => navigate("/appointments")}
          />
        </div>
      ) : (
        <LogoutWarning />
      )}
    </>
  );
};

export default BookAppointmentPage;
