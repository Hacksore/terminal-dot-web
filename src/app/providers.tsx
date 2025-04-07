"use client";

import { CartWrapper } from "@/components/cart-wrapper";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <CartWrapper>{children}</CartWrapper>
      </QueryClientProvider>
    </SessionProvider>
  );
}
