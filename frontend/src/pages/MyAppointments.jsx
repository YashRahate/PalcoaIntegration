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
      .get(`https://palcoaintegration-backend.onrender.com/myappointments?email=${email}`)
      .then((response) => {
        const { upcoming, previous } = response.data;
        setAppointments({ upcoming, previous });
        setDisplayedAppointments(upcoming);
      })
      .catch((error) => handleError("Error fetching appointments: " + error));
  };

  const fetchOutlets = async () => {
    try {
      const response = await axios.get("https://palcoaintegration-backend.onrender.com/customer/outlets");
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
      .put(`https://palcoaintegration-backend.onrender.com/myappointments/reschedule/${id}`, {
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
      .delete(`https://palcoaintegration-backend.onrender.com/myappointments/cancel/${id}`)
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
