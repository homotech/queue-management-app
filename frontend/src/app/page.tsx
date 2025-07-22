"use client";
import Image from "next/image";
import Signup from "./signup/page";
import Login from "./login/page";
import { useState, useEffect } from "react";
import Dashboard from "./dashboard/page";
import LoadingState from "@/components/loadingState";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  // const token = localStorage.getItem("token");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
    // setToken(storedToken);
    setIsLoading(false);
  }, [router]);
  if (isLoading) {
    return <LoadingState />;
  }
  return null;
}
