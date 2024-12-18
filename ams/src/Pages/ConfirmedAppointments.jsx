
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import edit from "../assets/edit _button.svg";

// Define time slots
const timeSlots = [
  { label: "9:00 AM - 10:00 AM", start: "09:00", end: "10:00" },
  { label: "10:00 AM - 11:00 AM", start: "10:00", end: "11:00" },
  { label: "11:00 AM - 12:00 PM", start: "11:00", end: "12:00" },
  { label: "12:00 PM - 1:00 PM", start: "12:00", end: "13:00" },
  { label: "1:00 PM - 2:00 PM", start: "13:00", end: "14:00" },
  { label: "2:00 PM - 3:00 PM", start: "14:00", end: "15:00" },
  { label: "3:00 PM - 4:00 PM", start: "15:00", end: "16:00" },
  { label: "4:00 PM - 5:00 PM", start: "16:00", end: "17:00" },
  // Add more time slots as needed
];

// Filter function
const filterconfirmAppointments = (confirmappointments, filter, timeSlot) => {
    const now = new Date();
    let filteredconfirmAppointments = confirmappointments;
  
    switch (filter) {
      case "Today":
        filteredconfirmAppointments = filteredconfirmAppointments.filter((appointment) => {
          const inTime = new Date(appointment.time);
          return inTime.toDateString() === now.toDateString();
        });
        break;
      case "Last Week":
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        filteredconfirmAppointments = filteredconfirmAppointments.filter((appointment) => {
          const inTime = new Date(appointment.time);
          return inTime > oneWeekAgo && inTime <= now;
        });
        break;
      case "Last Month":
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        filteredconfirmAppointments = filteredconfirmAppointments.filter((appointment) => {
          const inTime = new Date(appointment.time);
          return inTime > oneMonthAgo && inTime <= now;
        });
        break;
      default:
        break;
    }
  
    if (timeSlot) {
      const [startHour, startMinute] = timeSlot.start.split(":");
      const [endHour, endMinute] = timeSlot.end.split(":");
  
      filteredconfirmAppointments = filteredconfirmAppointments.filter((appointment) => {
        const appointmentTime = new Date(appointment.time);
        const appointmentHours = appointmentTime.getHours();
        const appointmentMinutes = appointmentTime.getMinutes();
  
        const startTimeInMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
        const endTimeInMinutes = parseInt(endHour) * 60 + parseInt(endMinute);
        const appointmentTimeInMinutes = appointmentHours * 60 + appointmentMinutes;
  
        return (
          appointmentTimeInMinutes >= startTimeInMinutes &&
          appointmentTimeInMinutes < endTimeInMinutes
        );
      });
    }
  
    return filteredconfirmAppointments;
  };
  
  const ConfirmedAppointments = ({ confirmappointments, onconfirmRefresh }) => {
    const [filter, setFilter] = useState("Today");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  
    const handleDelete = async (id) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this appointment?"
      );
      if (confirmDelete) {
        try {
          const response = await axios.delete(
            `http://localhost:5000/api/delete-appointment-staff/${id}`
          );
          console.log(response.data.message);
          onRefresh(); // Callback to refresh appointments
        } catch (error) {
          console.error("Error deleting appointment:", error);
        }
      }
    };
  
    const filteredconfirmAppointments = filterconfirmAppointments(
      confirmappointments,
      filter,
      selectedTimeSlot
    );
  
    return (
      <div className="p-4">
        <h1 className="text-2xl mb-4">Confirmed Appointments</h1>
        <div className="flex justify-between mb-4 flex-col lg:flex-row">
          <div className="pt-2">
            <label className="mr-2">Sort by:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="Today">Today</option>
              <option value="Last Week">Last Week</option>
              <option value="Last Month">Last Month</option>
            </select>
          </div>
          <div className="pt-2">
            <label className="mr-2">Time Slot:</label>
            <select
              value={selectedTimeSlot ? selectedTimeSlot.label : ""}
              onChange={(e) => {
                const selectedOption = timeSlots.find(
                  (slot) => slot.label === e.target.value
                );
                setSelectedTimeSlot(selectedOption);
              }}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Select Time Slot</option>
              {timeSlots.map((slot, index) => (
                <option key={index} value={slot.label}>
                  {slot.label}
                </option>
              ))}
            </select>
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b text-center">Name</th>
                <th className="px-4 py-2 border-b text-center">Services</th>
                <th className="px-4 py-2 border-b text-center">Packages</th>
                <th className="px-4 py-2 border-b text-center">Time</th>
                <th className="px-4 py-2 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredconfirmAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b text-center">
                    {appointment.customer_name}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {appointment.service_id.map((service, index) => (
                      <div key={index}>{service.service_name}</div>
                    ))}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {appointment.package_id.map((pkg, index) => (
                      <div key={index}>{pkg.package_name}</div>
                    ))}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    {new Date(appointment.time).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 border-b text-center flex justify-center items-center">
                    <button
                      className="text-red-500 px-3 py-1 rounded m-1"
                      onClick={() => handleDelete(appointment._id)}
                    >
                      Cancel
                    </button>
                    <div className="flex justify-center items-center">
                      <Link
                        to={`/edit-appointment/${appointment._id}`}
                        state={{
                          appointment: {
                            ...appointment,
                            services: appointment.service_id,
                            packages: appointment.package_id,
                            time: appointment.time,
                          },
                        }}
                        className="px-3 py-1 rounded m-1 w-20"
                      >
                        <img src={edit} alt="edit" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default ConfirmedAppointments;