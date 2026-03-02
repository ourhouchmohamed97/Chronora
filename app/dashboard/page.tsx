"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f0f13]">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to your Dashboard!
        </h1>
      </div>

      <Footer />
    </div>
  );
}
