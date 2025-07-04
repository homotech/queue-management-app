"use client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("login");
    }
  });

  return (
    <div>
      <h1 className="text-4xl">Welcome to your Dashboard 🎉</h1>
      <Button type="button" onClick={handleLogout} full={false}>
        Log out
      </Button>
    </div>
  );
};

export default Dashboard;
