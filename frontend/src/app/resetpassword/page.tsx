"use client";
import axios from "@/../lib/axios";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
const ResetPassword = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/resetpassword", form);
      toast.success(res.data.message);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "wasn't able to reset it, can you try again?"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={form.email}
          placeholder="What's your email?"
          onChange={handleChange}
          name="email"
        />
        <Input
          type="password"
          value={form.newPassword}
          placeholder="Add a new password?"
          onChange={handleChange}
          name="newPassword"
        />
        <Input
          type="password"
          value={form.confirmPassword}
          placeholder="Please type it in again"
          onChange={handleChange}
          name="confirmPassword"
        />
        <Button type="submit" full={true}>
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
