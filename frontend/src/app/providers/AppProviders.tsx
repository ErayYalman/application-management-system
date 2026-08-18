import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "../../features/auth/context/AuthContext";
import { queryClient } from "./query-client";
import { AppThemeProvider } from "./ThemeContext";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}