"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import axios from "@/../lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import QMALink from "@/components/QMALink";

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
    <div className="flex flex-col items-start justify-center min-h-screen bg-gray-100 p-8 w-full">
      <h1 className="text-4xl mb-4 tracking-tighter font-bold">
        Forgotten Password
      </h1>
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          type="email"
          label="Email Address"
          additionalStyles="mb-4"
          name="email"
          value={form.email}
          placeholder="What's your business email?"
          onChange={handleChange}
        />
        <Input
          label="Security Pin"
          type="number"
          additionalStyles="mb-4"
          name="securityPin"
          value={form.securityPin}
          placeholder="What's is your security pin?"
          onChange={handleChange}
        />
        <Button type="submit" fullWidth={true} additionalStyles="mb-4">
          Submit
        </Button>

        <p>
          Back to <QMALink href="/login">Log in</QMALink>
        </p>
      </form>
    </div>
  );
};
export default ForgotPassword;
