// import React, { useState } from "react";
// // import { Box } from "@radix-ui/themes";

// // function PaymentForm() {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     service: "",
// //     time: "",
// //     outlet: "",
// //     package: "",
// //     staffName: "",
// //     modeOfPayment: "Cash", // assuming default value
// //     totalAmount: 800, // assuming default value
// //   });

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prevState) => ({
// //       ...prevState,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = () => {
// //     // Submit logic here
// //   };

// //   return (
// //     <div className="container">
// //       <form>
// //         <div className="flex">
// //           <div className="flex py-5">
// //             <h1 className="px-2">Name:-</h1>
// //             <input
// //               type="text"
// //               name="name"
// //               placeholder="Name"
// //               onChange={handleInputChange}
// //             />
// //           </div>
// //           {/* <select name="outlet" onChange={handleInputChange}>
// //         {/* Options go here }
// //       </select> */}
// //           <div className="flex">
// //             <h1 className="px-2">Service:-</h1>
// //             <input
// //               type="text"
// //               name="service"
// //               placeholder="Service"
// //               onChange={handleInputChange}
// //             />
// //           </div>
// //         </div>
// //         <select name="package" onChange={handleInputChange}>
// //           {/* Options go here */}
// //         </select>
// //         <input
// //           type="text"
// //           name="time"
// //           placeholder="Time"
// //           onChange={handleInputChange}
// //         />
// //         {/* Clock icon interaction would be handled separately */}
// //         <input
// //           type="text"
// //           name="staffName"
// //           placeholder="Staff Name"
// //           onChange={handleInputChange}
// //         />

// //         <div className="py-9">
// //           Mode of Payment:
// //           <label className="px-3">
// //             <input
// //               type="radio"
// //               name="modeOfPayment"
// //               value="Cash"
// //               checked={formData.modeOfPayment === "Cash"}
// //               onChange={handleInputChange}
// //             />
// //             Cash
// //           </label>
// //           <label>
// //             <input
// //               type="radio"
// //               name="modeOfPayment"
// //               value="Online"
// //               checked={formData.modeOfPayment === "Online"}
// //               onChange={handleInputChange}
// //             />
// //             Online
// //           </label>
// //         </div>

// //         <div className="">Total amount: {formData.totalAmount} /-</div>

// //         <button
// //           className="three bg-blue-500 rounded-lg float-right px-3 "
// //           onClick={handleSubmit}
// //         >
// //           Save
// //         </button>
// //       </form>

// //       <Box maxWidth="350px">
// //         <Card asChild>
// //           <a href="#">
// //             <Text as="div" size="2" weight="bold">
// //               Quick start
// //             </Text>
// //             <Text as="div" color="gray" size="2">
// //               Start building your next project in minutes
// //             </Text>
// //           </a>
// //         </Card>
// //       </Box>
// //     </div>
// //   );
// // }

// // export default PaymentForm;

// //import * as React from 'react';
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Input from "@mui/material/Input";
// //import { styled } from '@mui/material/styles';
// import { TextField } from "@mui/material";
// import { Stack } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { DatePicker, TimePicker, DateTimePicker } from "@mui/x-date-pickers";
// import { Autocomplete } from "@mui/material";
// // import { Grid } from "@mui/material";
// import Grid from '@mui/material/Grid';

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
//   >
//     •
//   </Box>
// );

// // for autocomplete line number 214 of package
// const packages = ["Beard", "Moustache"];
// const outlets = [
//   "Juhu",
//   "Andheri",
//   "Bandra",
//   "Mulund",
//   "Dombivali",
//   "Borivali",
//   "Kalyan",
// ];

// export default function PaymentForm() {
//   const Div = styled("div")(({ theme }) => ({
//     ...theme.typography.button,
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(1),
//   }));

//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [selectedDateTime, setSelectedDateTime] = useState(null);

//   return (
//     <div>
//       <Card sx={{ minWidth: 150 }}>
//         <CardContent>
//           <Box
//             sx={{
//               height: "100vh", // Full viewport height
//               display: "flex",
//               justifyContent: "center", // Horizontally center
//               alignItems: "center", // Vertically center
//               width: '6', // Adjust width to match your screenshot size
//               backgroundColor: 'white', // You can change to match theme
//               borderRadius: 8, // Rounded corners like in the second screenshot
//               boxShadow: 3,
//             }}
//           >
//             <div>
//               {/* <Box
//                 component="form"
//                 sx={{
//                   display: "flex",
//                   gap: 8, // spacing between fields
//                   alignItems: "center",
//                   width: "500px",
//                   p: 3, // Padding for inner content
//                 }}
//               >
//                 <div>
//                   <Div>{"Name"}</Div>
//                   <Stack spacing={4}>
//                     <Stack direction="row" spacing={2}>
//                       <TextField label="Name" size="medium" color="primary" />
//                     </Stack>
//                   </Stack>
//                 </div>

//                 <div>
//                   <Div>{"Outlet"}</Div>
//                   <Autocomplete
//                     options={outlets}
//                     sx={{ width: 220 }}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Outlets"
//                         sx={{ height: 60 }}
//                         size="medium"
//                       />
//                     )}
//                   />
//                 </div>
//               </Box> */}
//               <Box
//                 component="form"
//                 sx={{
//                   width: "500px",
//                   p: 3, // Padding for the form
//                 }}
//               >
//                 <Grid container spacing={4}>
//                   {" "}
//                   {/* This will control the spacing between columns */}
//                   <Grid item xs={6}>
//                     {" "}
//                     {/* Each div gets a Grid item */}
//                     <Div>{"Name"}</Div>
//                     <Stack spacing={4}>
//                       <TextField label="Name" size="medium" color="primary" />
//                     </Stack>
//                   </Grid>
//                   <Grid item xs={6}>
//                     {" "}
//                     {/* Second div */}
//                     <Div>{"Outlet"}</Div>
//                     <Stack spacing={4}>
//                       <Autocomplete
//                         options={outlets}
//                         sx={{ width: 220 }}
//                         renderInput={(params) => (
//                           <TextField
//                             {...params}
//                             label="Outlets"
//                             size="medium"
//                           />
//                         )}
//                       />
//                     </Stack>
//                   </Grid>
//                 </Grid>
//               </Box>

//               <Box
//                 component="form"
//                 sx={{
//                   display: "flex",
//                   gap: 8, // spacing between fields
//                   alignItems: "center",
//                 }}
//               >
//                 <div>
//                   <Div>{"Service"}</Div>
//                   <Stack spacing={4}>
//                     <Stack direction="row" spacing={2}>
//                       <TextField label="select" size="medium" color="primary" />
//                     </Stack>
//                   </Stack>
//                 </div>

//                 <div>
//                   <Div>{"Package"}</Div>
//                   <Autocomplete
//                     options={packages}
//                     sx={{ width: 220 }}
//                     renderInput={(params) => (
//                       <TextField
//                         {...params}
//                         label="Packages"
//                         sx={{ height: 60 }}
//                         size="medium"
//                       />
//                     )}
//                   />
//                 </div>
//               </Box>

//               <Box
//                 component="form"
//                 sx={{
//                   display: "flex",
//                   gap: 8, // spacing between fields
//                   alignItems: "center",
//                 }}
//               >
//                 <div>
//                   <Div>{"Time"}</Div>
//                   <TimePicker
//                     label="Time Picker"
//                     value={selectedTime}
//                     onChange={(newValue) => {
//                       setSelectedTime(newValue);
//                     }}
//                     renderInput={(params) => <TextField {...params} />}
//                   />
//                 </div>
//                 {/* </Box> */}

//                 <div>
//                   <Div>{"Staff name"}</Div>
//                   <Stack spacing={4}>
//                     <Stack direction="row" spacing={2}>
//                       <TextField label="select" size="medium" color="primary" />
//                     </Stack>
//                   </Stack>
//                 </div>
//               </Box>

//               <Div>{"Mode of payment"}</Div>

//               <Box
//                 component="form"
//                 sx={{
//                   display: "flex",
//                   gap: 8, // spacing between fields
//                   alignItems: "center",
//                 }}
//               >
//                 <div>
//                   <Div>{"Cash"}</Div>
//                   <Stack spacing={4}>
//                     <Stack direction="row" spacing={2}>
//                       <TextField label="select" size="medium" color="primary" />
//                     </Stack>
//                   </Stack>
//                 </div>

//                 <div>
//                   <Div>{"Online or offline"}</Div>
//                   <Stack spacing={4}>
//                     <Stack direction="row" spacing={2}>
//                       <TextField label="select" size="medium" color="primary" />
//                     </Stack>
//                   </Stack>
//                 </div>
//               </Box>
//             </div>
//             {/* <Input placeholder="Placeholder" inputProps={ariaLabel} /> */}

//             {/*the date and time picker */}
//             {/* <DatePicker
//         label="Date Picker"
//         value={selectedDate}
//         onChange={(newValue) => {
//           setSelectedDate(newValue);
//         }}
//         renderInput={(params) => <TextField {...params} />}
//       />
//       <TimePicker
//         label="Time Picker"
//         value={selectedTime}
//         onChange={(newValue) => {
//           setSelectedTime(newValue);
//         }}
//         renderInput={(params) => <TextField {...params} />}
//       />
//       <DateTimePicker
//         label="Date Time Picker"
//         value={selectedDateTime}
//         onChange={(newValue) => {
//           setSelectedDateTime(newValue);
//         }}
//         renderInput={(params) => <TextField {...params} />}
//       /> */}
//           </Box>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// import axios from "axios";
// import React, { useState } from "react";

// export default function PaymentForm() {

//   const [selectedTime, setSelectedTime] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     outlet: "",
//     service: "",
//     package: "",
//     staffName: "",
//   });

//   return (
//     <div className="flex justify-center">
//       <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-lg">
//         <h2 className="text-2xl font-bold text-center mb-4">Payment Form</h2>

//         <form>
//           {/* Name Input */}
//           <div className="mb-4">
//             <label className="block text-left font-medium mb-1" htmlFor="name">Name</label>
//             <input
//               id="name"
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               placeholder="Name"
//             />
//           </div>

//           {/* Outlet Input */}
//           <div className="mb-4">
//             <label className="block text-left font-medium mb-1" htmlFor="outlet">Outlet</label>
//             <select
//               id="outlet"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={formData.outlet}
//               onChange={(e) => setFormData({ ...formData, outlet: e.target.value })}
//             >
//               <option value="" disabled>Select Outlet</option>
//               {outlets.map((outlet) => (
//                 <option key={outlet} value={outlet}>{outlet}</option>
//               ))}
//             </select>
//           </div>

//           {/* Service Input */}
//           <div className="mb-4">
//             <label className="block text-left font-medium mb-1" htmlFor="service">Service</label>
//             <input
//               id="service"
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={formData.service}
//               onChange={(e) => setFormData({ ...formData, service: e.target.value })}
//               placeholder="Service"
//             />
//           </div>

//           {/* Package Input */}
//           <div className="mb-4">
//             <label className="block text-left font-medium mb-1" htmlFor="package">Package</label>
//             <select
//               id="package"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={formData.package}
//               onChange={(e) => setFormData({ ...formData, package: e.target.value })}
//             >
//               <option value="" disabled>Select Package</option>
//               {packages.map((pkg) => (
//                 <option key={pkg} value={pkg}>{pkg}</option>
//               ))}
//             </select>
//           </div>

//           {/* Time Picker */}
//           <div className="mb-4">
//             <label className="block text-left font-medium mb-1" htmlFor="time">Time</label>
//             <input
//               id="time"
//               type="time"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={selectedTime}
//               onChange={(e) => setSelectedTime(e.target.value)}
//             />
//           </div>

//           {/* Staff Name */}
//           <div className="mb-4">
//             <label className="block text-left font-medium mb-1" htmlFor="staffName">Staff Name</label>
//             <input
//               id="staffName"
//               type="text"
//               className="w-full p-2 border border-gray-300 rounded"
//               value={formData.staffName}
//               onChange={(e) => setFormData({ ...formData, staffName: e.target.value })}
//               placeholder="Staff Name"
//             />
//           </div>

//           {/* Mode of Payment */}
//           <div className="mb-4">
//             <label className="block text-left font-medium mb-1">Mode of Payment</label>
//             <div className="flex space-x-2">
//               <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">Cash</button>
//               <button type="button" className="border border-blue-500 text-blue-500 px-4 py-2 rounded">Online</button>
//             </div>
//           </div>

//           {/* Total Amount */}
//           <div className="mb-4">
//             <p className="text-lg font-semibold">Total Amount: 800 /-</p>
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white px-4 py-2 rounded w-full"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Button } from "./ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PaymentForm() {
  const location = useLocation();
  const { appointment } = location.state || {};
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [paymentMode, setPaymentMode] = useState("Online");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [formData, setFormData] = useState({
    name: appointment ? appointment.customer_name : "",
    outlet: appointment ? appointment.outlet_id.outlet_name : "No outlet found",
    service: appointment
      ? appointment.service_id.map((service) => service.service_name).join(", ")
      : "",
    package: appointment
      ? appointment.package_id.map((pkg) => pkg.package_name).join(", ")
      : "",
    staffName: "",
    paymentmode: "",
    amount_value: 0,
    payment_status: "pending",
    appointment_id: {},
    
  });

  useEffect(() => {
    console.log(formData);
    console.log(paymentMode);
    console.log(appointment);
    setAmount(
      appointment.service_id.reduce(
        (total, service) => total + service.price,
        0
      ) +
        // Calculate the total amount from packages
        appointment.package_id.reduce((total, pkg) => total + pkg.price, 0)
    );
  }, [paymentMode, amount]);

  // Function for submitting the payments
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    formData.paymentmode = paymentMode;
    formData.payment_status = "Paid";
    formData.service = appointment.service_id;
    formData.package = appointment.package_id;
    formData.amount_value = amount;
    formData.appointment_id = appointment;
    appointment.status = "Paid"
    console.log(formData);
    // code goes here

    try {
      const response = await axios.post(
        "http://localhost:5000/api/payment",
        formData
      );

      console.log("Payment done successfully!", response.data);


      navigate("/payment");
    } catch (error) {
      console.error("Error while making payment", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Payment Form</h2>

        <form>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-left font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Name"
            />
          </div>

          {/* Outlet Input */}
          <div className="mb-4">
            <label
              className="block text-left font-medium mb-1"
              htmlFor="outlet"
            >
              Outlet
            </label>
            <input
              id="outlet"
              name="outlet"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.outlet}
              onChange={(e) =>
                setFormData({ ...formData, outlet: e.target.value })
              }
            />
          </div>

          {/* Service Input */}
          <div className="mb-4">
            <label
              className="block text-left font-medium mb-1"
              htmlFor="service"
            >
              Service
            </label>
            <input
              id="service"
              name="service"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.service}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  service: appointment.service_id
                    .map((service) => service.service_name)
                    .join(", "),
                })
              }
              placeholder="Service"
            />
          </div>

          {/* Package Input */}
          <div className="mb-4">
            <label
              className="block text-left font-medium mb-1"
              htmlFor="package"
            >
              Package
            </label>
            <input
              id="package"
              name="package"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.package}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  package: appointment.package_id
                    .map((pkg) => pkg.package_name)
                    .join(", "),
                })
              }
            />
          </div>

          {/* Time Picker */}
          {/* <div className="mb-4">
            <label className="block text-left font-medium mb-1" htmlFor="time">Time</label>
            <input
              id="time"
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </div> */}

          {/* Staff Name */}
          <div className="mb-4">
            <label
              className="block text-left font-medium mb-1"
              htmlFor="staffName"
            >
              Staff Name
            </label>
            <input
              id="staffName"
              name="staffName"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.staffName}
              onChange={(e) =>
                setFormData({ ...formData, staffName: e.target.value })
              }
              placeholder="Staff Name"
            />
          </div>

          {/* Mode of Payment */}
          <div className="mb-4">
            <label className="block text-left font-medium mb-1">
              Mode of Payment
            </label>
            <div className="flex space-x-2 flex-row">
              <RadioGroup defaultValue="Online" onValueChange={setPaymentMode}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Online" id="Online" name="mode" />
                  <Label htmlFor="Online">Online</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Cash" id="Cash" name="mode" />
                  <Label htmlFor="Cash">Cash</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Total Amount */}
          <div className="mb-4">
            <p className="text-lg font-semibold">
              Total Amount: {amount}
              {(e) =>
                setFormData({ ...formData, amount_value: e.target.value })
              }
              /-
            </p>
          </div>

          {/* Submit Button */}
          <div>
            <Button
              onClick={handlePaymentSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
