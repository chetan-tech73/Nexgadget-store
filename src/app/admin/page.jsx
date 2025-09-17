"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="mb-6">Welcome, Admin! 🎉</p>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/admin/products")}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Manage Products
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("isAdmin");
              router.push("/admin/login");
            }}
            className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
