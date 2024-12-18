import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import ReCAPTCHA from 'react-google-recaptcha';
import './SignupForm.css';
import axios from "axios";

function SignupForm() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    contact: '',
  });

  const [formData, setFormData] = useState({
    full_name: '',
    mobile_phone: '',
    email: '',
  });

  const [confirm, setConfirm] = useState({
    confirmPassword: '',
  });

  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));

    // Automatically update `formData` based on `signupInfo`
    if (name === 'name') {
      setFormData((prev) => ({ ...prev, full_name: value }));
    } else if (name === 'contact') {
      setFormData((prev) => ({ ...prev, mobile_phone: value }));
    } else if (name === 'email') {
      setFormData((prev) => ({ ...prev, email: value }));
    }
  };

  const handleChangeconfirm = (e) => {
    const { name, value } = e.target;
    setConfirm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaptcha = (value) => {
    setCaptchaCompleted(!!value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password, gender, contact } = signupInfo;

    if (!name || !email || !password || !contact || !gender) {
      return handleError('All fields are required');
    }

    if (password !== confirm.confirmPassword) {
      return handleError('Passwords do not match!');
    }

    if (!captchaCompleted) {
      return handleError('Please complete the CAPTCHA');
    }

    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          gender,
          contact,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        handleSuccess(result.message);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        handleError(result.message || 'Signup failed!');
      }
    } catch (err) {
      // console.error('Error during signup:', err);
      handleError(err.message || 'Something went wrong!');
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/add-user", formData);
      // console.log("User added successfully");
    } catch (error) {
      // console.error("Error adding user:", error);
    }
  };

  const handleBothSubmit = async (e) => {
    e.preventDefault();
    await handleSignup(e);
    await handleSubmit();
  };

  return (
    <div className="signup-container">
      <div className="metallic-ball small metallic-ball1"></div>
      <div className="metallic-ball medium metallic-ball2"></div>
      <div className="metallic-ball small metallic-ball3"></div>
      <div className="metallic-ball large metallic-ball4"></div>
      <div className="metallic-ball medium metallic-ball5"></div>

      <div className="form-container">
        <h2>Signup Form</h2>
        <form onSubmit={handleBothSubmit}>
          <label>
            Username
            <input
              type="text"
              name="name"
              value={signupInfo.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Mobile No.
            <input
              type="text"
              name="contact"
              value={signupInfo.contact}
              onChange={handleChange}
              required
              pattern="[0-9]{10}" // Restrict to 10-digit numbers
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={signupInfo.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={confirm.confirmPassword}
              onChange={handleChangeconfirm}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={signupInfo.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Gender
            <select
              name="gender"
              value={signupInfo.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option> {/* Match backend schema */}
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <div className="captcha">
            <ReCAPTCHA
              sitekey="6LeBQygqAAAAALAGXxzoXz58fQI3QqtnozpIui66"
              onChange={handleCaptcha}
            />
          </div>

          <button type="submit">Signup</button>
        </form>
        <ToastContainer />

        <p>
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
      <div className="image-container">
        <img src="/bg.png" alt="Signup Illustration" />
      </div>
    </div>
  );
}

export default SignupForm;
