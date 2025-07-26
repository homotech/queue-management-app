"use client";
import axios from "@/../lib/axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
// import Link from "next/link";
import QMALink from "@/components/QMALink";
import PasswordInput from "@/components/passwordInput";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Guess what? You're in");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Something ain't right, can you try again?"
      );
    }
  };
  return (
    <div className="flex flex-col items-left justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl mb-8 font-bold"> Sign In</h1>
      <form onSubmit={handleSubmit}>
        <Input
          additionalStyles="mb-4"
          label="Email Address"
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          placeholder="example@email.com"
        />
        <PasswordInput
          name="password"
          handleChange={handleChange}
          placeholder="Enter Password"
          formValue={form.password}
        />
        <Button type="submit" fullWidth={true}>
          Sign in
        </Button>
        <p className="mt-2">
          Don't have an account? <QMALink href="/signup">Sign up</QMALink>
        </p>
        <p className="mt-2">
          Can't remember your password?{" "}
          <QMALink href="/forgotpassword">Reset it</QMALink>
        </p>
      </form>
    </div>
  );
};
export default Login;
