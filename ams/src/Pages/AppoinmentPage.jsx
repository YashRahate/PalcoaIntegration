// import React, { useEffect, useState } from "react";
// import Appointments from "../Components/Appoinments";
// import initialAppointments from "../Data/initialAppointment";
// import LogoutWarning from "@/Components/LogoutWarning";
// import { jwtDecode } from "jwt-decode";

// const AppointmentPage = () => {

//   const [token, setToken] = useState({
//     token: "",
//     user_data:{}
//   });
//   const [appointments, setAppointments] = useState(initialAppointments);

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

//   const handleConfirm = (id) => {
//     // Confirm logic here
//   };

//   const handleCancel = (id) => {
//     // Cancel logic here
//   };

//   return (
//     <>
//       {token ? (
//         <Appointments
//           appointments={appointments}
//           onConfirm={handleConfirm}
//           onCancel={handleCancel}
//         />
//       ) : (
//         <LogoutWarning />
//       )}
//     </>
//   );
// };

// export default AppointmentPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointments from "../Components/Appoinments";
import ConfirmedAppointments from "../Pages/ConfirmedAppointments";
import LogoutWarning from "@/Components/LogoutWarning";
import {jwtDecode} from "jwt-decode";

const AppointmentPage = () => {
  const [token, setToken] = useState({
    token: "",
    user_data: {}
  });
  const [appointments, setAppointments] = useState([]);
  const [Confirmed, setConfirmed] = useState([]);

  
    const fetchAppointments = async () => {
      try {
    //     const userData = JSON.parse(localStorage.getItem("auth_data"));
    // const outletId = userData ? userData.user_data.outlet_id : null;
    //    // Replace with actual outlet ID
    //     const response = await axios.get(`http://localhost:5000/api/get-all-appointments-staff/${outletId}`, {
      const response = await axios.get("http://localhost:5000/api/get-all-appointments-staff", {
          // headers: {
          //   Authorization: `Bearer ${token.token}`,
          // },
        });
        console.log("All service appointments",response.data.service_appointments)
        setAppointments(response.data.service_appointments);
        // console.log(appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    const fetchConfirmedAppointments = async () => {
      try {
    
      const response = await axios.get("http://localhost:5000/api/get-all-appointments-staff-confirm", {
          // headers: {
          //   Authorization: `Bearer ${token.token}`,
          // },
        });
        console.log("All service appointments",response.data.service_appointments)
        setConfirmed(response.data.service_appointments);
        console.log(Confirmed);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
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
    fetchAppointments();
    fetchConfirmedAppointments();
  }, []);

  

  return (
    <>
      {token ? (
       <div className="p-6 space-y-6">
       <div className="bg-white shadow-md rounded-md p-4 h-96 overflow-auto">
         <Appointments
           appointments={appointments}
           onRefresh={fetchAppointments}
         />
       </div>
       <div className="bg-white shadow-md rounded-md p-4 h-96 overflow-auto">
         <ConfirmedAppointments
           confirmappointments={Confirmed}
           onconfirmRefresh={fetchConfirmedAppointments}
         />
       </div>
     </div>
      ) : (
        <LogoutWarning />
      )}
    </>
  );
};

export default AppointmentPage;
