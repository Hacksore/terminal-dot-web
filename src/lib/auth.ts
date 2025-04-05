import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { TerminalSession } from "@/app/api/auth/[...nextauth]/route";

export async function getAuthSession() {
  const session = await getServerSession(authOptions);
  return session;
}

// Helper to get the access token
export async function getAccessToken() {
  const session = await getAuthSession() as TerminalSession | null;
  return session?.access_token;
} 
