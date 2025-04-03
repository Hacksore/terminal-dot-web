import NextAuth from "next-auth";
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

interface TerminalProfile {
  id: string;
  name?: string;
  email?: string;
}

const API_URL = "https://auth.terminal.shop";

function TerminalProvider<P extends TerminalProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: "terminalProvider",
    name: "TerminalProvider",
    type: "oauth",
    authorization: {
      url: `${API_URL}/authorize`,
      params: { scope: "ligma" },
    },
    token: {
      url: `${API_URL}/token`,
    },
    profile: async (profile) => {
      return {
        id: profile.sub, // assuming 'sub' is the user ID from the profile
        name: profile.name || "Unknown User",
        email: profile.email || null,
      };
    },
    options,
  };
}

const handler = NextAuth({
  debug: true,
  providers: [
    TerminalProvider({
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      clientId: process.env.CLIENT_ID!,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
