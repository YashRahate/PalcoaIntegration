import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Navbar from "./../Components/Navbar";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleAddUser = async () => {
    if (
      userName.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== ""
    ) {
      if (password === confirmPassword) {
        const userDetails = {
          username: userName,
          email,
          password,
        };
        localStorage.setItem("username", userName);
        try {
          const response = await axios.post(
            "https://localhost:5000/api/signup",
            userDetails,
            {
              withCredentials: true,
            }
          );
          const { token } = response.data;
          console.log(response.data);

          localStorage.setItem("token", token);
          console.log("User added successfully:", response.data);
          alert("User added successfully!");
          setUserName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/tasks");
        } catch (error) {
          console.error("Error adding user:", error.message);
        }
      } else {
        alert("Passwords do not match!");
      }
    } else {
      alert("Please enter all details");
    }
  };
  //   const handleGoogleLogin = async () => {
  //     // Implement your Google login logic here
  //     // Example using Firebase:
  //     // try {
  //     //   const result = await signInWithPopup(auth, googleProvider);
  //     //   const user = result.user;
  //     //   const userEmail = user.email;
  //     //   localStorage.setItem('email', JSON.stringify(userEmail));
  //     //   alert('Successful Google login');
  //     //   navigate('/login');
  //     // } catch (error) {
  //     //   console.error('Error during Google login:', error.message);
  //     //   alert('Error during Google login. Please try again.');
  //     // }
  //   };

  return (
    <>
      {" "}
      {/* <Navbar /> */}
      <div
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1541417904950-b855846fe074?q=80&w=2041&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
          backgroundSize: "cover",
        }}
      >
        <div className="py-4 sm:py-6 lg:py-8 w-screen h-screen flex justify-center items-center sm:px-4">
          <div className="bg-white/40 max-w-md py-4 px-4 rounded-lg md:px-8 shadow-lg shadow-slate-200 sm:w-full">
            <h2 className="mb-4 text-center text-2xl font-bold text-blue-800 md:mb-8 lg:text-3xl">
              Signup
            </h2>
            <form className="mx-auto max-w-lg rounded-lg border ring-blue-300">
              <div className="flex flex-col gap-4 p-2 md:p-6">
                <div>
                  <label
                    htmlFor="user-name"
                    className="mb-2 inline-block text-sm text-blue-800 sm:text-base"
                  >
                    User name
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-blue-200 transition duration-100 focus:ring"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 inline-block text-sm text-blue-800 sm:text-base"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-blue-200 transition duration-100 focus:ring"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 inline-block text-sm text-blue-800 sm:text-base"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-blue-200 transition duration-100 focus:ring"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 inline-block text-sm text-blue-800 sm:text-base"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-blue-300 transition duration-100 focus:ring"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddUser}
                  className="block rounded-lg bg-blue-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-700 focus-visible:ring active:bg-blue-600 md:text-base"
                >
                  Sign up
                </button>
                {/* <div className="relative flex items-center justify-center">
                  <span className="absolute inset-x-0 h-px bg-blue-300"></span>
                  <span className="relative bg-white px-4 text-sm text-blue-600">Sign up with social</span>
                </div>
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-2 rounded-lg border border-blue-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base">
                  <svg className="h-5 w-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.627 12.145c0-.8-.072-1.575-.194-2.325H12v4.4h5.946c-.252 1.283-1.09 2.364-2.264 3.084l-.032.2 3.288 2.555.227.023c2.095-1.93 3.462-4.77 3.462-8.036z" fill="#4285F4"/>
                    <path d="M12 23c3.094 0 5.693-1.03 7.592-2.787l-3.615-2.808c-1.01.7-2.3 1.117-3.977 1.117-3.07 0-5.67-2.073-6.604-4.848l-.198.016-3.526 2.73-.047.185C4.403 20.602 7.927 23 12 23z" fill="#34A853"/>
                    <path d="M5.396 14.674c-.235-.7-.37-1.445-.37-2.21 0-.765.135-1.51.37-2.21l-.006-.198-3.564-2.755-.116.056C1.286 8.78 1 10.348 1 12s.285 3.22.71 4.443l3.58-2.77-.004-.198z" fill="#FBBC05"/>
                    <path d="M12 4.545c1.688 0 3.197.58 4.386 1.716l3.22-3.22C16.56 1.2 14.063 0 12 0 7.927 0 4.403 2.397 2.835 5.802l3.574 2.77C6.327 6.79 8.927 4.545 12 4.545z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button> */}
              </div>
              <div className="flex items-center justify-center bg-blue-100 p-4">
                <p className="text-center text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-500 transition duration-100 hover:text-blue-600 active:text-blue-700"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
