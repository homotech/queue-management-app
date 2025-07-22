"use client";
import ServicesList from "@/components/servicesList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "@/../lib/axios";
import DashboardNavbar from "@/components/dashboardNavbar";
const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("login");
    }
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get("/business/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setName(response.data.businessName);
      } catch (error: any) {
        toast.error("Couldn't fetch Username");
        console.error("Axios error:", error);
      }
    };
    fetchUserName();
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/services", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setServices(response.data.services || []);
      } catch (error: any) {
        toast.error("Sorry couldn't fetch services");
        console.error("Axios error:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="flex flex-row">
      <div>
        <h1 className="text-4xl">Welcome {name || "user"}</h1>
        <ServicesList services={services} />
      </div>
    </div>
  );
};

export default Dashboard;
