"use client";

import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { QueryProvider } from "@/components/QueryProvider";
import { Toaster } from "react-hot-toast";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (<QueryProvider>
    <Toaster
      position="top-center"
    />
    {children}
  </QueryProvider>);
}
