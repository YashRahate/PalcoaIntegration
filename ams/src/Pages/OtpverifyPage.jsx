import { Button } from "@/Components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot, 
} from "@/Components/ui/input-otp";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clsx } from 'clsx';

function OtpverifyPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [inputOtp, setInputOtp] = useState("");
  const handleSubmitOTP = async () => {
    if (inputOtp == otp) {
      console.log("This is correct OTP");
      const response = await axios.post("http://localhost:5000/api/verify-otp", { otp: Number(inputOtp) }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const data = response.data;
      console.log(data);
      localStorage.setItem('auth_data', JSON.stringify(data));
      navigate('/profilepage');
    }
    else alert("Invalid OTP");
  };

  useEffect(() => {
    console.log(localStorage.getItem("OTP"));
    setOtp(localStorage.getItem('OTP'));
    setTimeout(()=>{
      localStorage.removeItem("OTP")
    },120000)
  })

  return (
    <>
      <div className="flex justify-center mx-auto m-48">
        {/* <Button onClick={handleSubmitOTP}>Verify OTP</Button> */}
        <Card className="w-full max-w-sm shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">OTP Verification</CardTitle>
            <CardDescription>
              Enter the OTP sent on your registered mobile number below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="mx-auto">
              {/* <Label htmlFor="otp">OTP</Label> */}
              <InputOTP maxLength={6} value={inputOtp} onChange={(inputOtp) => setInputOtp(inputOtp)}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  {/* <InputOTPSeparator/> */}
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmitOTP}>Verify OTP</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default OtpverifyPage;
