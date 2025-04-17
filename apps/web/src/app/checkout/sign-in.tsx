"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignIn() {
  return (
    <div className="bg-zinc-800 rounded-lg p-6 mb-8">
      <p className="text-center text-muted-foreground mb-4">
        Please login to proceed with checkout
      </p>
      <div className="flex justify-center">
        <Button onClick={() => signIn("terminalProvider")}>Login</Button>
      </div>
    </div>
  );
}
