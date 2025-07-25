"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "@/../lib/axios";
import Button from "@/components/Button";
import Input from "@/components/Input";
import QMALink from "@/components/QMALink";
import PasswordInput from "@/components/passwordInput";
const Signup = () => {
  const [form, setform] = useState({
    businessName: "",
    email: "",
    password: "",
    securityPin: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setform((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Signup Successful");
      router.push("/dashboard");
    } catch (error: string | any) {
      toast.error(error.response?.data?.message || "Sign up Failed");
    }
  };
  return (
    <div className="flex flex-col items-start w-full justify-center min-h-screen bg-gray-100 px-8">
      <h1 className="text-4xl mb-4 font-bold tracking-tighter">Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          label="Business Name"
          additionalStyles="mb-4"
          type="text"
          name="businessName"
          onChange={handleChange}
          value={form.businessName}
          placeholder="Business Name"
        />
        <Input
          label="Email Address"
          additionalStyles="mb-4"
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          placeholder="Email Address"
        />
        <PasswordInput
          name="password"
          formValue={form.password}
          handleChange={handleChange}
          placeholder="Enter Password"
        />

        <Input
          label="Security Pin"
          type="number"
          additionalStyles="mb-4"
          name="securityPin"
          onChange={handleChange}
          value={form.securityPin}
          placeholder="Enter a 4-digit Security Pin"
        />
        <Button type="submit" fullWidth={true} additionalStyles="mb-4">
          Sign up
        </Button>
        <p>
          Already have an account? <QMALink href="/login">Log in</QMALink>
        </p>
      </form>
    </div>
  );
};
export default Signup;
