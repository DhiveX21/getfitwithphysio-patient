import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };
        // const user = { phoneNumber: credentials.phoneNumber };
        const user = await axios.get("http://localhost:3000/api/login");
        if (user.data) {
          // Any object returned will be saved in `user` property of the JWT
          return user.data;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user && user.isVerified && !user.isSuspend) {
        return true;
      } else {
        // Return false to display a default error message
        return "/auth/login";
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },

    async redirect({ url, baseUrl }) {
      //   // Allows relative callback URLs
      //   if (url.startsWith("/")) return `${baseUrl}${url}`;
      //   // Allows callback URLs on the same origin
      //   else if (new URL(url).origin === baseUrl) return url;
      return "/dashboard";
    },
  },
  pages: {
    signIn: "/auth/login",
  },
});
