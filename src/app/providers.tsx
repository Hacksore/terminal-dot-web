"use client";

import { CartWrapper } from "@/components/cart-wrapper";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <CartWrapper>{children}</CartWrapper>
    </SessionProvider>
  );
}
