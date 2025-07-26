"use client";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import axios from "@/../lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateQueue = () => {
  const Router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    maxPeople: "",
    isPublic: true,
    autoCloseTimeActivate: false,
    autoCloseTime: "",
  });
  const [joinLink, setJoinLink] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name) {
      toast.error("Queue name is required!");
      return;
    }
    if (
      !form.maxPeople ||
      isNaN(Number(form.maxPeople)) ||
      Number(form.maxPeople) <= 0
    ) {
      toast.error("Max people must be a positive number");
      return;
    }
    if (form.autoCloseTimeActivate && !form.autoCloseTime) {
      toast.error("Please specify a close time");
      return;
    }

    const payload = {
      //   ...form,
      name: form.name,
      description: form.description,
      maxPeople: Number(form.maxPeople),
      isPublic: form.isPublic,
      autoCloseTime: form.autoCloseTimeActivate
        ? new Date(`1970-01-01T${form.autoCloseTime}:00Z`).toISOString()
        : null,
    };
    try {
      const response = await axios.post("/queue/create", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      toast.success(response.data.message);
      setJoinLink(response.data.joinLink);
      setForm({
        name: "",
        description: "",
        maxPeople: "",
        isPublic: true,
        autoCloseTimeActivate: false,
        autoCloseTime: "",
      });
    } catch (error: any) {
      console.error("error creating queue", error);
      const message = error.response?.data?.message || "Failed to create queue";
      toast.error(message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        placeholder="Describe the queue(Optional)"
        disabled={false}
      />
      <Input
        name="maxPeople"
        value={form.maxPeople}
        type="number"
        onChange={handleChange}
        placeholder="Max number of people"
        disabled={false}
      />
      <label className="cursor-pointer mb-4 block">
        <input
          name="isPublic"
          checked={form.isPublic}
          type="checkbox"
          onChange={handleChange}
        />
        <span className="ml-2">Is the queue public?</span>
      </label>

      <label className="cursor-pointer mb-4 block">
        <input
          name="autoCloseTimeActivate"
          checked={form.autoCloseTimeActivate}
          type="checkbox"
          onChange={handleChange}
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
      <Button type="submit" fullWidth={false}>
        Create Queue
      </Button>
      {joinLink && (
        <div className="mt-4">
          <p>Queue created! Share this link:</p>
          <a
            href={joinLink}
            className="text-blue-500 underline"
            target="_blank"
          >
            {joinLink}
          </a>
        </div>
      )}
    </form>
  );
};
export default CreateQueue;
