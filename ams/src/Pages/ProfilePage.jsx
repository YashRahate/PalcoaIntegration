// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
// import { Input } from "@/Components/ui/input";
// import { Label } from "@/Components/ui/label";
// import { Button } from "@/Components/ui/button";
// import axios from 'axios';
// import Select from 'react-select';  // Import react-select for dynamic search dropdown
// import { useNavigate } from 'react-router-dom';  // For navigation in non-Vite React

// export default function ProfilePage() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [selectedOutlet, setSelectedOutlet] = useState(null);
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [staffName, setStaffName] = useState('');

//   // State to hold fetched outlets
//   const [outlets, setOutlets] = useState([]);

//   // Fetch outlets dynamically from the API
//   useEffect(() => {
//     const getOutlets = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/outlet");
//         const outletOptions = response.data.map(outlet => ({
//           value: outlet._id,
//           label: outlet.outlet_name
//         }));
//         setOutlets(outletOptions);
//       } catch (error) {
//         console.log("Error while fetching outlets", error);
//       }
//     };

//     getOutlets();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Log the submitted profile data
//     console.log('Profile data:', { email, selectedOutlet, mobileNumber, staffName });

//     // Store the selected outlet ID in localStorage
//     if (selectedOutlet) {
//       localStorage.setItem('outlet_id', selectedOutlet.value);
//     }

//     // Navigate to the dashboard
//     navigate('/dashboard');
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>Your Profile</CardTitle>
//           <CardDescription>Please complete your profile information</CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="your.email@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="outlet">Outlet</Label>
//               {/* Use react-select for searchable dropdown */}
//               <Select
//                 id="outlet"
//                 options={outlets}  // Dynamically loaded options
//                 value={selectedOutlet}
//                 onChange={setSelectedOutlet}
//                 placeholder="Select or search an outlet"
//                 isSearchable={true} // Enable search functionality
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="mobile">Mobile Number</Label>
//               <Input
//                 id="mobile"
//                 type="tel"
//                 placeholder="Your mobile number"
//                 value={mobileNumber}
//                 onChange={(e) => setMobileNumber(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="name">Staff Name</Label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Your full name"
//                 value={staffName}
//                 onChange={(e) => setStaffName(e.target.value)}
//                 required
//               />
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button type="submit" className="w-full">Save Profile & Go to Dashboard</Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import Select from "react-select"; // Import react-select for dynamic search dropdown
import { useNavigate } from "react-router-dom"; // For navigation

export default function ProfilePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");
  const [staffName, setStaffName] = useState("");

  // State to hold fetched outlets
  const [outlets, setOutlets] = useState([]);

  // Simulating logged-in user data retrieval (you could also fetch this from an API)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Assuming user details are stored in localStorage after login
        const userData = JSON.parse(localStorage.getItem("auth_data")); // Example key
        console.log(userData);
        if (userData) {
          setEmail(userData.user_data.email);
          setMobileNumber(userData.user_data.staff_mobile_number);
          setStaffName(userData.user_data.staff_name);
        }
        console.log(email);
      } catch (error) {
        console.log("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch outlets dynamically from the API
  useEffect(() => {
    const getOutlets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/outlet");
        const outletOptions = response.data.map((outlet) => ({
          value: outlet._id,
          label: outlet.outlet_name,
        }));
        setOutlets(outletOptions);
      } catch (error) {
        console.log("Error while fetching outlets", error);
      }
    };

    getOutlets();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the submitted profile data
    console.log("Profile data:", {
      email,
      selectedOutlet,
      mobileNumber,
      staffName,
    });
    console.log(selectedOutlet);

    // Store the selected outlet ID in localStorage
    if (selectedOutlet) {
      localStorage.setItem("outlet_id", selectedOutlet.value);
      localStorage.setItem("outlet_name", selectedOutlet.label);
    }
    // console.log(selectedOutlet.value)

    // Navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            Please complete your profile information
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Pre-filled email field (read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} readOnly />
            </div>

            {/* Pre-filled mobile number field (read-only) */}
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input id="mobile" type="tel" value={mobileNumber} readOnly />
            </div>

            {/* Pre-filled staff name field (read-only) */}
            <div className="space-y-2">
              <Label htmlFor="name">Staff Name</Label>
              <Input id="name" type="text" value={staffName} readOnly />
            </div>

            {/* Select outlet (dynamic search dropdown) */}
            <div className="space-y-2">
              <Label htmlFor="outlet">Outlet</Label>
              <Select
                id="outlet"
                options={outlets} // Dynamically loaded options
                value={selectedOutlet}
                onChange={setSelectedOutlet}
                placeholder="Select or search an outlet"
                isSearchable={true} // Enable search functionality
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Save Profile & Go to Dashboard
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
