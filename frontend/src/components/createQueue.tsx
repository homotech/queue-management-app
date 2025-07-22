"use client";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import axios from "@/../lib/axios";
import toast from "react-hot-toast";

const CreateQueue = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    maxPeople: "",
    isPublic: true,
    autoCloseTimeActivate: false,
    autoCloseTime: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      maxPeople: Number(form.maxPeople),
      autoCloseTime: Number(form.autoCloseTime),
    };
    try {
      if (form.name === "" || form.maxPeople === "") {
        toast.error("All fields are required");
      } else {
        const response = await axios.post("/queue/create", payload, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);
        toast.success(response.data.message);
      }
    } catch (error: any) {
      console.error("error creating queue", error);
      toast.error(error.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-4xl mb-4">Create Queue</h1>
      <Input
        name="name"
        value={form.name}
        type="text"
        onChange={handleChange}
        placeholder="Enter a queue name"
        disabled={false}
      />
      <Input
        name="description"
        value={form.description}
        type="text"
        onChange={handleChange}
        placeholder="Describe the queue"
        disabled={false}
      />
      <Input
        name="maxPeople"
        value={form.maxPeople}
        type="number"
        onChange={handleChange}
        placeholder="How many people will be on the queue"
        disabled={false}
      />
      <label className="cursor-pointer mb-4 block">
        <input
          name="isPublic"
          checked={form.isPublic}
          type="checkbox"
          onChange={handleChange}
          placeholder="Enter a queue name"
        />
        <span className="ml-2">Is the queue public?</span>
      </label>

      <label className="cursor-pointer mb-4 block">
        <input
          name="autoCloseTimeActivate"
          checked={form.autoCloseTimeActivate}
          type="checkbox"
          onChange={handleChange}
          placeholder="Enter a queue name"
        />
        <span className="ml-2">Add a close time</span>
      </label>
      <Input
        name="autoCloseTime"
        value={form.autoCloseTime}
        type="time"
        onChange={handleChange}
        disabled={!form.autoCloseTimeActivate}
        placeholder="When should this queue close?"
      />
      <Button type="submit" full={false}>
        Create Queue
      </Button>
    </form>
  );
};
export default CreateQueue;
