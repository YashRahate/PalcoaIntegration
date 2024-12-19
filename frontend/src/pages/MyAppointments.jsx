// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   ToggleButton,
//   ToggleButtonGroup,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   DialogContentText,
//   TextField,
// } from "@mui/material";
// import { format } from "date-fns";
// import { NavLink } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { handleError, handleSuccess } from "../utils";

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import "./MyAppointments.css";

// const MyAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [displayedAppointments, setDisplayedAppointments] = useState([]);
//   const [appointmentType, setAppointmentType] = useState("upcoming");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
//   const [confirmationAction, setConfirmationAction] = useState(null);
//   const [rescheduleData, setRescheduleData] = useState({
//     id: "",
//     newDate: "",
//     newTime: "",
//     newOutlet: "",
//   });

//   const fetchAppointments = () => {
//     const loggedInEmail = localStorage.getItem("loggedInEmail");
//     axios
//       .get(`http://localhost:3000/appointments?email=${loggedInEmail}`)
//       .then((response) => {
//         const fetchedAppointments = response.data;
//         const currentDateTime = new Date();
//         const upcoming = fetchedAppointments.filter(
//           (appointment) => new Date(appointment.a_date) > currentDateTime
//         );
//         const previous = fetchedAppointments.filter(
//           (appointment) => new Date(appointment.a_date) <= currentDateTime
//         );
//         setAppointments({ upcoming, previous });
//         setDisplayedAppointments(upcoming);
//       })
//       .catch((error) => {
//         console.error("Error fetching appointments:", error);
//       });
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

  // const navigate = useNavigate();
  // const handleLogout = (e) => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("loggedInUser");
  //   localStorage.removeItem("loggedInEmail");
  //   handleSuccess("User Logged out");
  //   setTimeout(() => {
  //     navigate("/home");
  //   }, 2000);
  // };


//   const handleToggle = (event, newType) => {
//     setAppointmentType(newType);
//     setDisplayedAppointments(
//       newType === "upcoming" ? appointments.upcoming : appointments.previous
//     );
//   };

//   const openConfirmationDialog = (action, appointment) => {
//     setConfirmationAction({ action, appointment });
//     setConfirmationDialogOpen(true);
//   };

//   const handleConfirmation = () => {
//     const { action, appointment } = confirmationAction;
//     setConfirmationDialogOpen(false);
//     if (action === "cancel") {
//       handleCancelAppointment(appointment._id);
//     } else if (action === "reschedule") {
//       openRescheduleDialog(appointment._id);
//     } else if (action === "repeat") {
//       handleRepeatAppointment(appointment);
//     }
//   };

//   const handleCancelAppointment = (id) => {
//     axios
//       .delete(`http://localhost:3000/appointments/cancel/${id}`)
//       .then((response) => {
//         console.log("Appointment canceled:", response.data);
//         setDisplayedAppointments(
//           displayedAppointments.filter((appt) => appt._id !== id)
//         );
//       })
//       .catch((error) => {
//         console.error("Error canceling appointment:", error);
//       });
//   };

//   const openRescheduleDialog = (id) => {
//     setRescheduleData((prevData) => ({ ...prevData, id }));
//     setOpenDialog(true);
//   };

//   const handleRescheduleAppointment = () => {
//     const { id, newDate, newTime, newOutlet } = rescheduleData;
//     axios
//       .put(`http://localhost:3000/appointments/reschedule/${id}`, {
//         a_date: newDate,
//         a_timeslot: newTime,
//         a_outlet: newOutlet,
//       })
//       .then((response) => {
//         console.log("Appointment rescheduled:", response.data);
//         setOpenDialog(false);
//         fetchAppointments();
//       })
//       .catch((error) => {
//         console.error("Error rescheduling appointment:", error);
//       });
//   };

//   const handleRepeatAppointment = (appointment) => {
//     // Use the navigate function from react-router-dom to navigate to the appointment page
//     navigate("/appointment", {
//       state: {
//         appointment, // Passing the appointment object as state
//       },
//     });
//   };
  

//   return (
//     <>
//       <Navbar />
//       <div
//         className="my-appointments"
//         style={{ padding: "20px", backgroundColor: "#fce4ec" }}
//       >
//         <Typography
//           variant="h4"
//           align="center"
//           gutterBottom
//           style={{ color: "#57111B" }}
//         >
//           My Appointments
//         </Typography>

//         <ToggleButtonGroup
//           value={appointmentType}
//           exclusive
//           onChange={handleToggle}
//           aria-label="appointment type"
//           style={{ marginBottom: "20px" }}
//         >
//           <ToggleButton
//             value="upcoming"
//             style={{ color: "#e91e63", borderColor: "#e91e63" }}
//           >
//             Upcoming
//           </ToggleButton>
//           <ToggleButton
//             value="previous"
//             style={{ color: "#e91e63", borderColor: "#e91e63" }}
//           >
//             Previous
//           </ToggleButton>
//         </ToggleButtonGroup>

//         {displayedAppointments.length === 0 ? (
//           <Typography
//             variant="h6"
//             align="center"
//             style={{ color: "#57111B", marginBottom: "20px" }}
//           >
//             You don't have any appointments yet!
//             <br />
//             <Button
//               variant="contained"
//               color="secondary"
//               component={NavLink}
//               to="/appointment"
//               style={{ backgroundColor: "#e91e63", color: "#fff" }}
//             >
//               Book Your First Appointment
//             </Button>
//           </Typography>
//         ) : (
//           <Grid container spacing={3}>
//             {displayedAppointments.map((appointment) => (
//               <Grid item xs={12} md={6} key={appointment._id}>
//                 <Card
//                   style={{
//                     border: "2px solid #e91e63",
//                     margin: "10px",
//                     backgroundColor: "#fff",
//                   }}
//                 >
//                   <CardContent>
//                     <Typography
//                       variant="h5"
//                       gutterBottom
//                       style={{ color: "#57111B" }}
//                     >
//                       💈 {appointment.a_service.join(", ")}{" "}
//                       {/* Join service names with a comma */}
//                     </Typography>
//                     <Typography variant="body1" style={{ color: "#57111B" }}>
//                       Outlet Location: {appointment.a_outlet}
//                     </Typography>
//                     <Typography variant="body2" style={{ color: "#57111B" }}>
//                       📅 {format(new Date(appointment.a_date), "yyyy-MM-dd")} at{" "}
//                       {appointment.a_timeslot}
//                     </Typography>
//                     <Typography variant="body2" style={{ color: "#57111B" }}>
//                       ✨ Special Request:{" "}
//                       {appointment.a_specialrequest || "None"}
//                     </Typography>
//                     <Typography variant="body2" style={{ color: "#57111B" }}>
//                       💰 Price: ₹{appointment.total_price}{" "}
//                       {/* Display total price */}
//                     </Typography>
//                     <Typography variant="body2" style={{ color: "#57111B" }}>
//                       📦 Booking Price: ₹{appointment.booking_price}{" "}
//                       {/* Display booking price */}
//                     </Typography>
//                   </CardContent>
//                   <div
//                     style={{
//                       padding: "16px",
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     {appointmentType === "upcoming" ? (
//                       <>
//                         <Button
//                           variant="contained"
//                           style={{ backgroundColor: "#e91e63", color: "#fff" }}
//                           onClick={() =>
//                             openConfirmationDialog("cancel", appointment)
//                           }
//                           disabled={appointment.status === "Cancelled"}
//                         >
//                           Cancel
//                         </Button>
//                         <Button
//                           variant="contained"
//                           style={{ backgroundColor: "#57111B", color: "#fff" }}
//                           onClick={() =>
//                             openConfirmationDialog("reschedule", appointment)
//                           }
//                         >
//                           Reschedule
//                         </Button>
//                       </>
//                     ) : (
//                       <Button
//                         variant="contained"
//                         style={{ backgroundColor: "#e91e63", color: "#fff" }}
//                         onClick={() =>
//                           openConfirmationDialog("repeat", appointment)
//                         }
//                       >
//                         Repeat Appointment
//                       </Button>
//                     )}
//                   </div>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </div>
//       <Footer />

//       {/* Reschedule Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//         <DialogTitle>Reschedule Appointment</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please select a new date, time slot, and outlet for your
//             appointment.
//           </DialogContentText>
//           <TextField
//             margin="dense"
//             label="New Date"
//             type="date"
//             fullWidth
//             value={rescheduleData.newDate}
//             onChange={(e) =>
//               setRescheduleData({ ...rescheduleData, newDate: e.target.value })
//             }
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />

//           {/* Time Slot Selection */}
//           <TextField
//             margin="dense"
//             label="Select Time Slot"
//             select
//             fullWidth
//             value={rescheduleData.newTime}
//             onChange={(e) =>
//               setRescheduleData({ ...rescheduleData, newTime: e.target.value })
//             }
//             SelectProps={{
//               native: true,
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           >
//             <option value="" disabled>
//               Select Time Slot
//             </option>
//             <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
//             <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
//             <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
//             <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
//             <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
//             <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
//             <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
//             <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
//             <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
//           </TextField>

//           {/* Outlet Selection */}
//           <TextField
//             margin="dense"
//             label="New Outlet"
//             type="text"
//             fullWidth
//             value={rescheduleData.newOutlet}
//             onChange={(e) =>
//               setRescheduleData({
//                 ...rescheduleData,
//                 newOutlet: e.target.value,
//               })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleRescheduleAppointment} color="primary">
//             Reschedule
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Confirmation Dialog */}
//       <Dialog
//         open={confirmationDialogOpen}
//         onClose={() => setConfirmationDialogOpen(false)}
//       >
//         <DialogTitle>Confirmation</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to {confirmationAction?.action} this
//             appointment?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={() => setConfirmationDialogOpen(false)}
//             color="primary"
//           >
//             No
//           </Button>
//           <Button onClick={handleConfirmation} color="primary">
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <ToastContainer />
//     </>
//   );
// };

// export default MyAppointments;
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { format } from "date-fns";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MyAppointments.css";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState({ upcoming: [], previous: [] });
  const [displayedAppointments, setDisplayedAppointments] = useState([]);
  const [appointmentType, setAppointmentType] = useState("upcoming");
  const [openDialog, setOpenDialog] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    id: "",
    newDate: "",
    newTime: "",
    newOutlet: "",
  });
  const [outlets, setOutlets] = useState([]); // Store list of outlets

  const fetchAppointments = () => {
    const email = localStorage.getItem("loggedInEmail");
    axios
      .get(`http://localhost:5000/myappointments?email=${email}`)
      .then((response) => {
        const { upcoming, previous } = response.data;
        setAppointments({ upcoming, previous });
        setDisplayedAppointments(upcoming);
      })
      .catch((error) => handleError("Error fetching appointments: " + error));
  };

  const fetchOutlets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/customer/outlets");
      setOutlets(response.data);
    } catch (error) {
      handleError("Error fetching outlets: " + error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchOutlets(); // Fetch outlets when the component loads
  }, []);

  const handleToggle = (event, newType) => {
    setAppointmentType(newType);
    setDisplayedAppointments(
      newType === "upcoming" ? appointments.upcoming : appointments.previous
    );
  };

  const openRescheduleDialog = (id) => {
    setRescheduleData((prevData) => ({ ...prevData, id }));
    setOpenDialog(true);
  };

  const handleRescheduleAppointment = () => {
    const { id, newDate, newTime, newOutlet } = rescheduleData;

    axios
      .put(`http://localhost:5000/myappointments/reschedule/${id}`, {
        newDate,
        newTime,
        newOutlet,
      })
      .then(() => {
        handleSuccess("Appointment rescheduled successfully");
        setRescheduleData({ id: "", newDate: "", newTime: "", newOutlet: "" }); // Clear fields
        setOpenDialog(false);
        fetchAppointments();
      })
      .catch((error) => handleError("Select all the FIELDS "));
  };

  const handleCancelAppointment = (id) => {
    axios
      .delete(`http://localhost:5000/myappointments/cancel/${id}`)
      .then(() => {
        handleSuccess("Appointment cancelled successfully");
        fetchAppointments();
      })
      .catch((error) => handleError("Error cancelling appointment: " + error));
  };
  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInEmail");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };


  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <div className="my-appointments" style={{ padding: "20px", backgroundColor: "#fce4ec", margin: "5px" }}>
        <Typography variant="h4" align="center" gutterBottom style={{ color: "#57111B" }}>
          My Appointments
        </Typography>

        <ToggleButtonGroup
          value={appointmentType}
          exclusive
          onChange={handleToggle}
          aria-label="appointment type"
          style={{ marginBottom: "20px" }}
        >
          <ToggleButton value="upcoming" style={{ color: "#e91e63" }}>
            Upcoming
          </ToggleButton>
          <ToggleButton value="previous" style={{ color: "#e91e63" }}>
            Previous
          </ToggleButton>
        </ToggleButtonGroup>

        <Grid container spacing={3}>
          {displayedAppointments.map((appointment) => {
            // Find the matching outlet for each appointment
            const outlet = outlets.find(
              (outlet) => outlet._id === appointment.outlet_id?._id
            );

            return (
              <Grid item xs={12} md={6} key={appointment._id}>
                <Card style={{ border: "2px solid #e91e63", backgroundColor: "#fff" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      👥 {appointment.customer_name}
                    </Typography>
                    <Typography>📧 Email: {appointment.customer_email} </Typography>
                    <Typography>📱 Phone: {appointment.customer_mobile_phone} </Typography>
                    <Typography>🟢 Status: {appointment.status} </Typography>
                    <Typography>
                      ⏰ Time: {format(new Date(appointment.time), "yyyy-MM-dd HH:mm")}
                    </Typography>
                    <Typography>
                      💆 Services:{" "}
                      {appointment.service_id.map((service) => service.service_name).join(", ")}
                    </Typography>
                    <Typography>
                      🎁 Packages:{" "}
                      {appointment.package_id.map((packageData) => packageData.package_name).join(", ")}
                    </Typography>
                    <Typography>🏢 Outlet: {appointment.outlet_id?.outlet_name} </Typography>
                    <Typography>🏠 Address: {appointment.outlet_id?.address} </Typography>
                    <Typography>📝 Remark: {appointment.remark || "None"} </Typography>
                    {outlet && <Typography>📞 Outlet Contact: {outlet.telephone_number}</Typography>}
                  </CardContent>
                  {appointmentType === "upcoming" && (
                    <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                      {appointment.status.trim().toLowerCase() === "pending" && (
                        <Button
                          variant="contained"
                          onClick={() => openRescheduleDialog(appointment._id)}
                          style={{ backgroundColor: "#e91e63", color: "#fff", margin: "10px" }}
                        >
                          Reschedule 🔄
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        onClick={() => handleCancelAppointment(appointment._id)}
                        style={{
                          backgroundColor: "#c62828",
                          color: "#fff",
                          margin: "10px",
                          pointerEvents:
                            appointment.status.trim().toLowerCase() === "cancelled" ? "none" : "auto",
                          opacity: appointment.status.trim().toLowerCase() === "cancelled" ? 0.5 : 1,
                        }}
                      >
                        Cancel 🚫
                      </Button>
                    </div>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <Footer />

      {/* Reschedule Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Reschedule Appointment</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="New Date"
            type="date"
            value={rescheduleData.newDate}
            onChange={(e) =>
              setRescheduleData((prevData) => ({ ...prevData, newDate: e.target.value }))
            }
            style={{ marginBottom: "15px" }}
          />
          <TextField
            fullWidth
            label="New Time"
            type="time"
            value={rescheduleData.newTime}
            onChange={(e) =>
              setRescheduleData((prevData) => ({ ...prevData, newTime: e.target.value }))
            }
            style={{ marginBottom: "15px" }}
          />
          <Select
            fullWidth
            value={rescheduleData.newOutlet}
            onChange={(e) =>
              setRescheduleData((prevData) => ({ ...prevData, newOutlet: e.target.value }))
            }
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Outlet
            </MenuItem>
            {outlets.map((outlet) => (
              <MenuItem key={outlet._id} value={outlet._id}>
                {outlet.outlet_name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleRescheduleAppointment} style={{ color: "#e91e63" }}>
            Confirm ✅
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default MyAppointments;
