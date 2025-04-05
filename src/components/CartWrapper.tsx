"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { CartDisplay } from "./CartDisplay";

interface CartWrapperProps {
  children: React.ReactNode;
}

export const CartWrapper = ({ children }: CartWrapperProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      {JSON.stringify(session)}
      {children}
      <CartDisplay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
