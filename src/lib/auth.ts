import {
  authOptions,
  type TerminalSession,
} from "@/app/api/auth/[...nextauth]/terminal-provider";
import { getServerSession } from "next-auth";

export async function getAuthSession() {
  const session = await getServerSession(authOptions);
  return session;
}

// Helper to get the access token
export async function getAccessToken() {
  const session = (await getAuthSession()) as TerminalSession | null;
  return session?.access_token;
}
