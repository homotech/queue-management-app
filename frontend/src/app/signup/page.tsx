"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "@/../lib/axios";
import Button from "@/components/Button";
import Input from "@/components/Input";
import QMALink from "@/components/QMALink";
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="businessName"
          onChange={handleChange}
          value={form.businessName}
          placeholder="Business Name"
        />
        <Input
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          placeholder="Email Address"
        />
        <Input
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          placeholder="Password"
        />
        <Input
          type="password"
          name="securityPin"
          onChange={handleChange}
          value={form.securityPin}
          placeholder="Enter a 4-digit Security Pin"
        />
        <Button type="submit" full={true}>
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
