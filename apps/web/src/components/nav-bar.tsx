"use client";

import { useCartStore } from "@/store/cart";
import { LogOut, ShoppingCart, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onCartClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Navbar = ({ onCartClick }: NavbarProps) => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const { data: session, status } = useSession();

  return (
    <div className="fixed top-0 left-0 right-0 bg-zinc-900 border-b border-zinc-700 p-4 z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="cursor-pointer no-underline flex items-center gap-2"
        >
          <h2 className="text-2xl text-white font-bold">terminal</h2>
          <div className="w-5 h-10 bg-primary blink" />
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={onCartClick}
            type="button"
            className="cursor-pointer relative p-2 text-white hover:bg-zinc-800 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          {status === "loading" ? (
            <div className="w-[120px] h-10 bg-zinc-800 rounded-md animate-pulse" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="w-[120px] h-10 rounded-md bg-zinc-800 text-zinc-100 flex items-center justify-center gap-2 text-base font-medium hover:bg-zinc-700/90 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center">
                    {session.user?.name?.[0] || "U"}
                  </div>
                  <span className="truncate">
                    {session.user?.name?.split(" ")[0] || "User"}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-900 border-0">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-white font-medium leading-none">
                      {session.user?.name}
                    </p>
                    <p className="text-xs leading-none text-white/90">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  asChild
                  className="hover:bg-primary hover:text-black"
                >
                  <Link href="/orders" className="cursor-pointer">
                    <span className="text-white">Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="hover:bg-primary hover:text-black"
                >
                  <Link href="/checkout" className="cursor-pointer">
                    <span className="text-white">Checkout</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={() => signIn("terminalProvider")}
              type="button"
              className="w-[120px] h-10 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
