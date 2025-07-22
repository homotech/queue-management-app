"use client";
import { ReactNode, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import axios from "@/../lib/axios";
import toast from "react-hot-toast";
import LoadingState from "./loadingState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";

interface CreateServiceModalProps {
  showM: React.MouseEventHandler<HTMLButtonElement>;
  modalTitle?: string;
  servicesPage: boolean;
}

const CreateServiceModal = ({
  showM,
  modalTitle = "",
  servicesPage,
}: CreateServiceModalProps) => {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    duration: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const submitForm = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/create", form);
      toast.success("Service Added");
    } catch (error: any) {
      console.error(
        error?.response?.data?.message ||
          "There was an error Adding the service."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="absolute">
      <div>
        <h1>{modalTitle} Service</h1>
        <Button
          full={false}
          onClick={showM}
          additionalStyles={servicesPage ? "hidden" : ""}
        >
          <FontAwesomeIcon icon={faClose} />
        </Button>
      </div>
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
          placeholder="What is the name of the service"
          value={form.price.toString()}
          type="number"
          onChange={handleChange}
          disabled={false}
        />
        <Input
          name="duration"
          placeholder="What is the name of the service"
          value={form.duration.toString()}
          type="number"
          onChange={handleChange}
          disabled={false}
        />
        <Button type="submit" full={false}>
          {isLoading ? (
            <LoadingState additionalStyles="h-full" mode={false} />
          ) : (
            "Create Service"
          )}
        </Button>
      </form>
    </div>
  );
};
export default CreateServiceModal;
