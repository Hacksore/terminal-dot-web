import NextAuth from "next-auth";
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

interface TerminalProfile {
  id: string;
  name?: string;
  email?: string;
}

const AUTH_API_URL = "https://auth.terminal.shop";
const API_URL = "https://api.terminal.shop";

function TerminalProvider<P extends TerminalProfile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: "terminalProvider",
    name: "TerminalProvider",
    type: "oauth",
    authorization: {
      url: `${AUTH_API_URL}/authorize`,
      params: {
        scope: "ligma",
        response_type: "code",
        code_challenge_method: "S256",
      },
    },
    userinfo: {
      async request({ tokens }) {
        const accessToken = tokens.access_token;
        if (!accessToken) {
          throw new Error("No access token provided");
        }

        const response = await fetch(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const error = await response.text();
          console.error("[Terminal OAuth] Userinfo request failed:", error);
          throw new Error("Failed to fetch user info");
        }

        const result = await response.json();
        return result.data.user;
      },
    },
    token: {
      async request({ provider, params, checks }) {
        const redirectUri = provider.callbackUrl;
        const clientId = provider.clientId;
        const clientSecret = provider.clientSecret;

        if (!params.code) throw new Error("No code provided");
        if (!checks.code_verifier) throw new Error("No code verifier present");
        if (!redirectUri) throw new Error("No redirect URI present");
        if (!clientId) throw new Error("No client ID present");
        if (!clientSecret) throw new Error("No client secret present");

        const body = new URLSearchParams();
        body.append("grant_type", "authorization_code");
        body.append("code", params.code);
        body.append("redirect_uri", provider.callbackUrl);
        body.append("code_verifier", checks.code_verifier);
        body.append("client_id", clientId);
        body.append("client_secret", clientSecret);

        const response = await fetch(`${AUTH_API_URL}/token`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
          method: "POST",
        });

        const tokens = await response.json();

        if (!response.ok) {
          console.error("[Terminal OAuth] Token request failed:", tokens);
          throw new Error(
            `Failed to get access token: ${tokens.error_description || tokens.error}`,
          );
        }

        return { tokens };
      },
    },
    checks: ["pkce", "state"],
    profile: async (profile) => {
      return {
        id: profile.id,
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
