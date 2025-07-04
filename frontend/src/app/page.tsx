"use client";
import Image from "next/image";
import Signup from "./signup/page";
import Login from "./login/page";
import { useState, useEffect } from "react";
import Dashboard from "./dashboard/page";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  // const token = localStorage.getItem("token");
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  });

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      {token ? <Dashboard /> : <Login />}
    </div>
  );
}
