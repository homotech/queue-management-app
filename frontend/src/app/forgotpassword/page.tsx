"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import axios from "@/../lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// import useRouter from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    securityPin: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/forgotpassword", form);
      toast.success(res.data.message);
      router.push("/resetpassword");
    } catch (error: any) {
      console.error("Error during passowrd reset:", error);
      toast.error(
        error.response?.data?.message ||
          " Something went wrong, please try again."
      );
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl mb-4">Forgotten Password</h1>
      <form action="" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          value={form.email}
          placeholder="What's your business email?"
          onChange={handleChange}
        />
        <Input
          type="number"
          name="securityPin"
          value={form.securityPin}
          placeholder="What's is your security pin?"
          onChange={handleChange}
        />
        <Button type="submit" full={true}>
          Submit
        </Button>
      </form>
    </div>
  );
};
export default ForgotPassword;
