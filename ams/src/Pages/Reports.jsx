import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [10, 30, 21, 15, 12, 10, 15];
// const xLabels = [
//   "Monday",
//   "Tuesday",
//   "Wed",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];
const services_data = [
  {
    label: "Haircut",
    value: 72.72,
  },
  {
    label: "Beard",
    value: 16.38,
  },
  {
    label: "Spa",
    value: 3.83,
  },
  {
    label: "Massage",
    value: 2.42,
  },
  {
    label: "Facial",
    value: 4.65,
  },
  {
    label: "Manicure & Pedicure",
    value: 18.65,
  },
];
export default function Reports() {
  const [appointments, setAppointments] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [pData, setPData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [servicesLabels, setServicesLabels] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  useEffect(() => {
    // Fetching appointments and setting the data to populate the bar chart
    axios
      .get("http://localhost:5000/api/get-all-appointments-staff")
      .then((response) => {
        const data = response.data.service_appointments;
        console.log("Appointments for report", data);
        const labels = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        setAppointments(data);

        const counts = labels.map(
          (label) =>
            data.filter((appt) => {
              const day = new Date(appt.time).toLocaleDateString("en-US", {
                weekday: "long",
              });
              return day === label;
            }).length
        );
        setXLabels(labels);
        setPData(counts);
      })
      .catch((error) => {
        console.log("Error fetching appointments", error);
      });
  }, []);

  // New useEffect for services after appointments are fetched
  useEffect(() => {
    if (appointments.length > 0) {
      // Fetching services after appointments have been set
      axios
        .get("http://localhost:5000/api/services")
        .then((response) => {
          const services = response.data;
          console.log("services", services);

          const servicesLabels = services.map(
            (service) => service.service_name
          );
          setServicesLabels(servicesLabels);

          // Calculate counts for services
          const counts1 = servicesLabels.map(
            (label) =>
              (appointments.filter(
                (appt) =>
                  Array.isArray(appt.service_id) &&
                  appt.service_id.some(
                    (service) => service.service_name === label
                  )
              ).length /
                appointments.length) *
              100
          );

          console.log("Counts", counts1);
          setPieData(counts1);

          // Create service data for the pie chart
          const service_data = servicesLabels.map((label, index) => {
            return {
              label: label,
              value: counts1[index],
            };
          });
          console.log("Service data", service_data);
          setServiceData(service_data);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
        });
    }
  }, [appointments]); // Trigger this effect after appointments are set

  return (
    <>
      <div className="grid grid-flow-row grid-cols-2">
        <div className="w-max">
          <Card>
            <CardHeader>
              <CardTitle>Appointments for the week</CardTitle>
            </CardHeader>
            <CardDescription className={"text-center"}>
              A Graphical representation about appointments per week
            </CardDescription>
            <CardContent>
              <BarChart
                width={600}
                height={300}
                series={[{ data: pData, label: "appointments", id: "pvId" }]}
                xAxis={[{ data: xLabels, scaleType: "band" }]}
              />
            </CardContent>
          </Card>
        </div>
        <div className="w-max">
          <Card>
            <CardHeader>
              <CardTitle>Most choosen services</CardTitle>
            </CardHeader>
            <CardDescription className={"text-center"}>
              A Graphical representation about Services choosen by customers
              (values are in %)
            </CardDescription>
            <CardContent>
              <PieChart
                series={[
                  {
                    data: serviceData,
                    highlightScope: { fade: "global", highlight: "item" },
                    faded: {
                      innerRadius: 20,
                      additionalRadius: -30,
                      color: "gray",
                    },
                  },
                ]}
                height={300}
                width={600}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
