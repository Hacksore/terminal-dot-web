import NextAuth from "next-auth";
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

interface TerminalProfile {
  id: string;
  name?: string;
  email?: string;
}

function TerminalProvider<P extends TerminalProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: "terminalProvider",
    name: "TerminalProvider",
    type: "oauth",
    authorization: {
      url: "https://auth.terminal.shop/authorize",
      params: { scope: "openid profile email" },
    },
    wellKnown:
      "https://auth.terminal.shop/.well-known/oauth-authorization-server",
    token: {
      url: "https://auth.terminal.shop/token",
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
