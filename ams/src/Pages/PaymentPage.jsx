
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '@/Components/Loader';

const PaymentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get-all-appointments-staff-confirm");
        console.log(response.data.service_appointments);
        setAppointments(response.data.service_appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);
  const handleConfirm = async (appointment) => {
    try {
      console.log(appointment);
      
      await axios.put(`http://localhost:5000/api/confirm-payment/${appointment._id}`);
      // Pass appointment data to PaymentForm
      navigate("/payment-form", { state: { appointment } });
    } catch (error) {
      console.error("Error confirming appointment:", error);
    }finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Confirmed Appointments</h1>
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
            {appointments.map((appointment) => (
              <tr key={appointment._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b text-center">{appointment.customer_name}</td>
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
                <td className="px-4 py-2 border-b text-center">
                  <button
                    className="text-green-500 px-3 py-1 rounded m-1"
                    onClick={() => handleConfirm(appointment)}
                  >
                    Confirm for Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentPage;
