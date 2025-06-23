"use client";

import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return <>{children}</>;
}
