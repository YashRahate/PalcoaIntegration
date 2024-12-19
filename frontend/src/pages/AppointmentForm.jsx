import {useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AppointmentForm.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppointmentForm = () => {
  const [allServices, setAllServices] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [outlets, setOutlets] = useState([]);

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const [time, setTime] = useState("");
  const [remark, setRemark] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  // const [partialPrice, setPartialPrice] = useState(0);

  const [errors, setErrors] = useState({});
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
  

  useEffect(() => {
    const fetchServicesAndPackages = async () => {
      try {
        const servicesResponse = await axios.get("http://localhost:5000/api/services");
        const packagesResponse = await axios.get("http://localhost:5000/api/packages");
        const outletsResponse = await axios.get("http://localhost:5000/customer/outlets");

        const servicesOptions = servicesResponse.data.map((service) => ({
          label: `${service.service_name} - $${service.price}`,
          value: service._id,
          price: service.price,
        }));

        const packagesOptions = packagesResponse.data.map((pkg) => ({
          label: `${pkg.package_name} - $${pkg.price}`,
          value: pkg._id,
          price: pkg.price,
        }));

        setAllServices(servicesOptions);
        setAllPackages(packagesOptions);
        setOutlets(outletsResponse.data);
      } catch (error) {
        console.error("Error fetching services, packages, or outlets:", error);
      }
    };

    fetchServicesAndPackages();

    const loggedInEmail = localStorage.getItem("loggedInEmail");
    if (loggedInEmail) {
      axios
        .get("http://localhost:5000/customer/get-customer", { params: { email: loggedInEmail } })
        .then((response) => setCustomerData(response.data))
        .catch(() => toast.error("Error fetching customer data"));
    }
  }, []);

  useEffect(() => {
    const servicesTotal = selectedServices.reduce((sum, service) => {
      const serviceObj = allServices.find((s) => s.value === service.value);
      return sum + (serviceObj?.price || 0);
    }, 0);

    const packagesTotal = selectedPackages.reduce((sum, pkg) => {
      const packageObj = allPackages.find((p) => p.value === pkg.value);
      return sum + (packageObj?.price || 0);
    }, 0);

    const total = servicesTotal + packagesTotal;
    setTotalPrice(total);
    // setPartialPrice(total * 0.25);
  }, [selectedServices, selectedPackages, allServices, allPackages]);

  const validateForm = () => {
    const newErrors = {};

    if (!customerData.name || !customerData.contact || !customerData.email) {
      newErrors.customer = "LOGIN require !";
    }
    if (selectedServices.length === 0 && selectedPackages.length === 0) {
      newErrors.services = "Please select at least one service or package.";
    }
    if (!selectedOutlet) {
      newErrors.outlet = "Please select an outlet.";
    }
    if (!time || new Date(time) < new Date()) {
      newErrors.time = "Please select a valid time in the future.";
    }

    setErrors(newErrors);

    // Display errors via Toastify
    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((error) => toast.error(error));
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const appointmentData = {
      customer_name: customerData.name,
      customer_email: customerData.email,
      customer_mobile_phone: customerData.contact,
      status: "pending",
      time,
      outlet_id: selectedOutlet?.value,
      services: selectedServices.map((service) => service.value),
      packages: selectedPackages.map((pkg) => pkg.value),
      remark,
    };

    try {
      await axios.post("http://localhost:5000/api/add-appointment-staff", appointmentData);
      toast.success("Appointment booked successfully!");

      // Clear all fields after successful booking
      setSelectedServices([]);
      setSelectedPackages([]);
      setSelectedOutlet(null);
      setTime("");
      setTotalPrice(0);
      // setPartialPrice(0);
      setRemark('');
    } catch (error) {
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <>
    <Navbar handleLogout={handleLogout} />
    <h2 className="appointment-form-heading">
             Get Your Salon Appointment Now!
    </h2>
      <form className="cusAppointment-form" onSubmit={handleSubmit}>
        <div>
          <label className="cusAppointment-label">Name</label>
          <input className="cusAppointment-input" type="text" value={customerData.name} readOnly />
          {errors.customer && <p className="cusAppointment-error">{errors.customer}</p>}
        </div>
        <div>
          <label className="cusAppointment-label">Email</label>
          <input className="cusAppointment-input" type="email" value={customerData.email} readOnly />
        </div>
        <div>
          <label className="cusAppointment-label">Contact</label>
          <input className="cusAppointment-input" type="text" value={customerData.contact} readOnly />
        </div>
        <div>
          <label className="cusAppointment-label">Services</label>
          <Select
            className="cusAppointment-react-select-container"
            options={allServices}
            isMulti
            onChange={setSelectedServices}
            placeholder="Select services"
            value={selectedServices}
          />
          {errors.services && <p className="cusAppointment-error">{errors.services}</p>}
        </div>
        <div>
          <label className="cusAppointment-label">Packages</label>
          <Select
            className="cusAppointment-react-select-container"
            options={allPackages}
            isMulti
            onChange={setSelectedPackages}
            placeholder="Select packages"
            value={selectedPackages}
          />
        </div>
        <div>
          <label className="cusAppointment-label">Outlet</label>
          <Select
            className="cusAppointment-react-select-container"
            options={outlets.map((outlet) => ({
              value: outlet._id,
              label: `${outlet.outlet_name} - ${outlet.address}`,
            }))}
            onChange={setSelectedOutlet}
            placeholder="Select outlet"
            value={selectedOutlet}
          />
          {errors.outlet && <p className="cusAppointment-error">{errors.outlet}</p>}
        </div>
        <div>
          <label className="cusAppointment-label">Time</label>
          <input
            className="cusAppointment-input"
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          {errors.time && <p className="cusAppointment-error">{errors.time}</p>}
        </div>
        <div>
          <label className="cusAppointment-label">Total Price</label>
          <input className="cusAppointment-input" type="text" value={`₹ ${totalPrice}`} readOnly />
        </div>
        {/* <div>
          <label className="cusAppointment-label">25% Price</label>
          <input className="cusAppointment-input" type="text" value={`$${partialPrice}`} readOnly />
        </div> */}
          <div>
          <label className="cusAppointment-label">Remark</label>
          <input
            className="cusAppointment-input"
            type="text"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Special Request"
          />
        </div>
        <button className="cusAppointment-button" type="submit">Book Appointment</button>
      </form>
      <ToastContainer />
      <Footer />
    </>
  );

};

export default AppointmentForm;
