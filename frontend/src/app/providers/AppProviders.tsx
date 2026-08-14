import type { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "../../features/auth/context/AuthContext";
import { queryClient } from "./query-client";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}