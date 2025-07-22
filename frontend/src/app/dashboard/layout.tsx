"use client";
import DashboardNavbar from "@/components/dashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardNavbar /> <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
