import NextAuth from "next-auth";
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import type { Account } from "next-auth";

interface TerminalProfile {
  id: string;
  name?: string;
  email?: string;
}

interface TerminalToken extends JWT {
  access_token?: string;
  token_type?: string;
  expires_at?: number;
  refresh_token?: string;
}

export interface TerminalSession extends Session {
  access_token?: string;
  token_type?: string;
  expires_at?: number;
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

// TODO: let's replace this with t3-env so that we have typesafe env
const getRequiredEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const authOptions = {
  providers: [
    TerminalProvider({
      clientId: getRequiredEnvVar("CLIENT_ID"),
      clientSecret: getRequiredEnvVar("CLIENT_SECRET"),
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      const terminalToken = token as TerminalToken;

      if (account) {
        terminalToken.access_token = account.access_token;
        terminalToken.token_type = account.token_type;
        terminalToken.expires_at = account.expires_at as number;
        terminalToken.refresh_token = account.refresh_token;
        return terminalToken;
      }

      if (terminalToken.expires_at && Date.now() < terminalToken.expires_at * 1000) {
        return terminalToken;
      }

      if (terminalToken.refresh_token) {
        try {
          const clientId = process.env.CLIENT_ID;
          const clientSecret = process.env.CLIENT_SECRET;

          if (!clientId || !clientSecret) {
            throw new Error("Missing client credentials");
          }

          const body = new URLSearchParams();
          body.append("grant_type", "refresh_token");
          body.append("refresh_token", terminalToken.refresh_token);
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
            throw new Error("Failed to refresh token");
          }

          return {
            ...terminalToken,
            access_token: tokens.access_token,
            token_type: tokens.token_type,
            expires_at: tokens.expires_at,
            refresh_token: tokens.refresh_token ?? terminalToken.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing token:", error);
          return terminalToken;
        }
      }

      return terminalToken;
    },
    async session({ session, token }: { session: TerminalSession; token: TerminalToken }) {
      session.access_token = token.access_token;
      session.token_type = token.token_type;
      session.expires_at = token.expires_at;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
