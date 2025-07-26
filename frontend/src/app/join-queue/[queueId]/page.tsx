"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import axios from "@/../lib/axios";
import toast from "react-hot-toast";

const JoinQueue = () => {
  const params = useParams();
  const queueId = params?.queueId as string;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    note: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Name and phone are required");
      return;
    }

    try {
      const response = await axios.post("/participants/join", {
        ...form,
        queueId,
      });
      setMessage(response.data.message);
      toast.success(response.data.message);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to join queue";
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-4xl mb-4">Join Queue</h1>
      {/* {message ? (
        <p className="mb-4 text-lg">{message}</p>
      ) : ( */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          value={form.name}
          type="text"
          onChange={handleChange}
          placeholder="Your name"
          disabled={false}
        />
        <Input
          name="phone"
          value={form.phone}
          type="tel"
          onChange={handleChange}
          placeholder="Your phone number"
        />
        <Input
          name="note"
          value={form.note}
          type="text"
          onChange={handleChange}
          placeholder="Optional note"
        />
        <Button type="submit" fullWidth={false}>
          Join Queue
        </Button>
      </form>
      {/* )} */}
    </div>
  );
};

export default JoinQueue;
