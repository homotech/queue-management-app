"use client";
import CreateServiceModal from "@/components/createServiceModal";
import ServicesList from "@/components/servicesList";
import React, { useState, useEffect, InputEventHandler } from "react";
import axios from "@/../lib/axios";
import toast from "react-hot-toast";
import Input from "@/components/Input";
import Button from "@/components/Button";
import LoadingState from "@/components/loadingState";
import Services from "@/components/services";

type Service = {
  name: string;
  price: number;
  duration: number;
};
interface ServiceListProps {
  services: Service[];
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async () => {
    await console.log("Form Submitted");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
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
        toast.error(error?.response?.data?.message);
        console.error("Axios error:", error);
      }
    };
    fetchServices();
  }, []);
  const serviceExist = services.length === 0;

  return (
    <div>
      <h1>Services</h1>
      {/* <CreateServiceModal
        // showM={() => ()}
        modalTitle="Create"
        servicesPage={true}
      /> */}
      {/* <ServicesList services={services} /> */}
      <div className="flex">
        <form onSubmit={submitForm}>
          <Input
            name="name"
            placeholder="What is the name of the service"
            value={form.name}
            type="text"
            onChange={handleChange}
            disabled={false}
          />
          <Input
            name="price"
            placeholder="How much is the service"
            value={form.price.toString()}
            type="number"
            onChange={handleChange}
            disabled={false}
          />
          <Input
            name="duration"
            placeholder="How long does it take"
            value={form.duration.toString()}
            type="number"
            onChange={handleChange}
            disabled={false}
          />
          <Button type="submit" fullWidth={false}>
            {isLoading ? (
              <LoadingState additionalStyles="h-full" mode={false} />
            ) : (
              "Create Service"
            )}
          </Button>
        </form>
        <div>
          {serviceExist ? (
            <div>You do not have any services</div>
          ) : (
            services.map((service) => (
              <Services
                key={service.name}
                name={service.name}
                price={service.price}
                duration={service.duration}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default ServicesPage;
