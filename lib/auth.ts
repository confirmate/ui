import { logger } from "@/logger";
import NextAuth, { Account } from "next-auth";

export const { handlers, auth } = NextAuth({
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    {
      id: "confirmate",
      name: "Confirmate",
      type: "oauth",
      wellKnown: process.env.AUTH_OPENID_CONFIGURATION,
      authorization: {
        url: process.env.AUTH_AUTHORIZE,
      },
      token: {
        url: process.env.AUTH_TOKEN,
      },
      issuer: process.env.AUTH_ISSUER,
      clientId: process.env.AUTH_CLIENT_ID,
      client: {
        token_endpoint_auth_method: "none",
      },
      userinfo: {
        request: () => { },
      },
      checks: ["pkce"],
    },
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // If we don't have an access token, there is no point in being authenticated
      if (auth?.backendAccount === undefined) {
        return false;
      }

      // We need to check if we still have a valid backend API token, otherwise, we need to renew the session. 
      // This is needed because next-auth prolongs the expiry of our frontend session independently from our
      // backend token :( and we can only access the "session" here, not the "token", so we need to include
      // the backend token in the session.
      if (new Date((auth.backendAccount.expires_at ?? 0) * 1000) < new Date()) {
        return false;
      }

      return !!auth;
    },
    jwt: async ({ token, user, account }) => {
      if (account && account.access_token) {
        // We want to make the backend API token available to our server
        // components, so we include them in the "token" that is used to
        // authenticate backend/frontend.
        //
        // Note: While this means that the API token ends up in this token, the
        // client will not be able to read it since it is encrypted on the
        // client-side.
        token.backendAccount = account;
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      return {
        ...session,
        user: {
          // Until we have a proper user-info endpoint, just set a fake name
          // here. We also use this opportunity to set the default locale
          name: "Compliance Manager",
        },
        locale: "de-DE",
        // not an ideal solution as this "exposes" the API key to the client. this is sort of ok,
        // since its his key anyway and he can just request one himself, but its not a 100 % solution.
        backendAccount: token.backendAccount
      };
    },
  },
  session: {
    maxAge: 24 * 60 * 60,
    updateAge: 24 * 60 * 60 * 30
  },
});

declare module "next-auth" {
  interface Session {
    /**
     * The user's locale.
     */
    locale: string;

    /**
     * This contains the account (including token) for our backend services.
     */
    backendAccount?: Account;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    /**
     * This contains the account (including token) for our backend services.
     */
    backendAccount?: Account;
  }
}
