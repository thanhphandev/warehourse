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

  return <QueryProvider>
    <Toaster
      position="top-center"
      toastOptions={{
        // Base styles for all toasts
        className: 'rounded-xl shadow-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-white',
        duration: 5000,
        removeDelay: 1000,
        style: {
          background: '#1f2937', // Tailwind's neutral-800
          color: '#f9fafb',      // Tailwind's gray-50
        },

        // Success toast styles
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#22c55e',   // Tailwind's green-500
            secondary: '#1e293b', // Tailwind's slate-800
          },
          className: 'border-green-500',
        },

        // Error toast styles
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#ef4444',   // Tailwind's red-500
            secondary: '#1e293b',
          },
          className: 'border-red-500',
        },

        // Custom loading styles
        loading: {
          duration: Infinity,
          className: 'border-blue-500',
        },
      }}
    />
    {children}
  </QueryProvider>;
}
