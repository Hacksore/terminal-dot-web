"use client";

import { useState } from "react";
import { Navbar } from "./nav-bar";
import { CartDisplay } from "./cart-display";

interface CartWrapperProps {
  children: React.ReactNode;
}

export const CartWrapper = ({ children }: CartWrapperProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      {children}
      <CartDisplay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
