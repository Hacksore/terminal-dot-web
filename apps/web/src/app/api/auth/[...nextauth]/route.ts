import NextAuth from "next-auth";
import { authOptions } from "./terminal-provider";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
