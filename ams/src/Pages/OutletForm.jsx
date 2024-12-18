import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
// import { statesAndDistricts } from "@/Data/list";
import { useEffect, useState } from "react";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import axios from "axios";

export default function OutletForm() {
  const [selectedState, setSelectedState] = useState("");
  // const [selectedDistrict, setSelectedDistrict] = useState("");
  const [formData, setFormData] = useState({
    outlet_name: "",
    email: "",
    state: "",
    district: "",
    address: "",
    google_map_link: "",
    pincode: "",
    telephone_number: "",
  });
  useEffect(() => {
    console.log(selectedState);
  }, [selectedState]);
  // console.log(statesAndDistricts.states[0].districts);
  // console.log(district);
  const handleFormData = async(e) => {
    e.preventDefault();
    console.log("Outlet formData",formData);
    const response = await axios.post('http://localhost:5000/api/outlet', formData,{
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('auth_data')).token}`
      }
    });
    console.log("New outlet:", response.data);
    alert("New outlet created successfully");
  };
  return (
    <>
      <form>
        <Card className="mx-auto md:w-[1090px] w-[380px]">
          <CardHeader>
            <CardTitle className="text-xl">Create a new Outlet</CardTitle>
            <CardDescription>
              Enter the details of the outlet below to create a new outlet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">Outlet Name</Label>
                  <Input
                    onChange={(e)=>setFormData({...formData, outlet_name:e.target.value})}
                    id="outlet_name"
                    name="outlet_name"
                    placeholder="SalonX-main branch"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Outlet Email</Label>
                  <Input
                    onChange={(e)=>setFormData({...formData, email:e.target.value})}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="outlet@gmail.com"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* <div className="grid gap-2">
                  <Label htmlFor="email">State</Label>
                  <Select
                    onValueChange={(state) => {setSelectedState(state), setFormData({...formData, state:state})}}
                    
                    name="state"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {statesAndDistricts.states.map((state, id) => (
                          <SelectItem value={state.state} key={id}>
                            {state.state}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div> */}
                {/* <div className="grid gap-2">
                  <Label htmlFor="password">District</Label>
                  <Select
                    onValueChange={(district) => {setSelectedDistrict(district), setFormData({...formData, district:district})}}
                    name="district"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Districts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {statesAndDistricts.states
                          .find((state) => state.state === selectedState)
                          ?.districts.map((district, id) => (
                            <SelectItem value={district} key={id}>
                              {district}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  onChange={(e)=>setFormData({...formData, address:e.target.value})}
                  id="address"
                  name="address"
                  type="text"
                  placeholder="123, Main Street, City"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Google Map Link</Label>
                <Input
                  onChange={(e)=>setFormData({...formData, google_map_link:e.target.value})}
                  id="google_map_link"
                  name="google_map_link"
                  type="text"
                  placeholder="https://gmaps.google.api.com/xxxxx/"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    onChange={(e)=>setFormData({...formData, pincode:e.target.value})}
                    id="pincode"
                    name="pincode"
                    type="number"
                    placeholder="123456"
                    max={6}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="telephone">Telephone Number</Label>
                  <Input
                    onChange={(e)=>setFormData({...formData, telephone_number:e.target.value})}
                    id="telephone_number"
                    name="telephone_number"
                    type="tel"
                    placeholder="1234567890"
                    required
                  />
                </div>
              </div>
              <Button type="submit" onClick={handleFormData} className="mx-auto mt-4">
                Create an account
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
