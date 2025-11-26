"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/providers/CartProvider";
import Image from "next/image";

interface UserData {
  email: string;
  username: string;
}

export default function AccountPage() {
  const router = useRouter();
  const { items } = useCart();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<"orders" | "info">("orders");

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!user || !token || user === "undefined" || user === "null") {
        router.push("/login");
        return;
      }

      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
    } catch (err) {
      console.error("User parse error:", err);
      router.push("/login");
    }
  }, [router]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="">
   
    </div>
  );
}
