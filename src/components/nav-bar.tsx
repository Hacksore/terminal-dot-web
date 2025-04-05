"use client";

import { useCartStore } from "@/store/cart";
import { LogOut, ShoppingCart, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onCartClick: () => void;
}

export const Navbar = ({ onCartClick }: NavbarProps) => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const { data: session } = useSession();

  return (
    <div className="fixed top-0 left-0 right-0 bg-zinc-900 border-b border-zinc-700 p-4 z-50">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">terminal</h2>
          <div className="w-5 h-10 bg-primary blink" />
        </a>
        <div className="flex items-center gap-4">
          <button
            onClick={onCartClick}
            type="button"
            className="cursor-pointer relative p-2 hover:bg-zinc-800 rounded-full transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-base font-bold hover:bg-primary/90 transition-colors"
                >
                  {session.user?.name?.[0] || "U"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-red-500"
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
              className="cursor-pointer px-4 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors duration-300 flex items-center gap-2"
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
