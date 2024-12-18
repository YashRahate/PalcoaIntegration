import React from "react";
import Sidebar from "../Components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
// import Home from './Pages/Home';
import AppointmentPage from "../Pages/AppoinmentPage";
import EditAppointmentPage from "../Pages/EditAppoinmentPage";
import BookAppointmentPage from "../Pages/BookAppoinmentPage";
import PaymentPage from "./PaymentPage";
import PaymentForm from "../Components/PaymentForm";

function Home() {
  return (
    <div>
      <BrowserRouter>
        <Routes>        
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          
          <Route path="/appointments" element={<AppointmentPage />} />
          <Route
            path="/edit-appointment/:id"
            element={<EditAppointmentPage />}
          />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/payment-form" element={<PaymentForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Home;
