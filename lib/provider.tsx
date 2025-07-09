"use client";
import React from "react";
import { UserProvider } from "@/context/user";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <div>
      <UserProvider>{children}</UserProvider>
    </div>
  );
}

export default Providers;
