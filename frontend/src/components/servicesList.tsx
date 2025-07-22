"use client";
import { useState, useEffect } from "react";
import Services from "./services";
import Button from "./Button";
import CreateServiceModal from "./createServiceModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

type Service = {
  name: string;
  price: number;
  duration: number;
};
interface ServiceListProps {
  services: Service[];
}
const ServicesList = ({ services }: ServiceListProps) => {
  const [servicesImp, setServicesImp] = useState<Service[]>([]);
  const [showCSModal, setShowCSModal] = useState(false);

  useEffect(() => {
    if (services) {
      setServicesImp(services);
    }
  }, []);
  const showModal = () => {
    setShowCSModal(!showCSModal);
  };
  return (
    <div>
      {showCSModal && (
        <CreateServiceModal
          modalTitle="Create"
          showM={showModal}
          servicesPage={true}
        />
      )}
      <div className="flex gap-4">
        <h1 className="text-4xl">Services</h1>{" "}
        <Button full={false} onClick={showModal}>
          <FontAwesomeIcon icon={faPlus} /> Create Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(servicesImp) &&
          servicesImp.map((services) => (
            <Services
              key={services.name}
              name={services.name}
              price={services.price}
              duration={services.duration}
            />
          ))}
      </div>
    </div>
  );
};
export default ServicesList;
