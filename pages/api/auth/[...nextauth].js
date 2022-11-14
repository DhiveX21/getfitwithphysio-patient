import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import { userLogin } from "../../../endpoint/User";
import { patientGetOneByUserId } from "../../../endpoint/User";

export default NextAuth({
  secret: process.env.AUTH_SECRET,
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
        let res = "";
        if (credentials.type === "user") {
          res = userLogin(credentials).then((response) => {
            if (response.status == 200) {
              return response.data.data;
            } else {
              return null;
            }
          });
        }
        if (credentials.type === "patient") {
          res = patientGetOneByUserId(credentials.user_id).then((response) => {
            if (response.status == 200) {
              return response.data.data;
            } else {
              return null;
            }
          });
        }

        return res;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return "/auth/error";
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin

      // validate patient every token use
      if (token.credentials?.user_id) {
        token.credentials = await patientGetOneByUserId(
          token.credentials.user_id
        ).then((response) => {
          if (response.status == 200) {
            return response.data.data;
          } else {
            return null;
          }
        });
      } else {
        signOut({ callbackUrl: "/auth/login" });
      }

      if (account) {
        token.accessToken = account.access_token;
        token.credentials = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.credentials = token.credentials;
      return session;
    },
  },
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    // strategy: "database",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 60 * 60 * 24 * 3, //3days period

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours

    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    // generateSessionToken: () => {
    //   return randomUUID?.() ?? randomBytes(32).toString("hex")
    // }
  },
});

// export default NextAuth({
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       // The name to display on the sign in form (e.g. "Sign in with...")
//       name: "Credentials",
//       // The credentials is used to generate a suitable form on the sign in page.
//       // You can specify whatever fields you are expecting to be submitted.
//       // e.g. domain, username, password, 2FA token, etc.
//       // You can pass any HTML attribute to the <input> tag through the object.
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         // Add logic here to look up the user from the credentials supplied
//         // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };
//         // const user = { phoneNumber: credentials.phoneNumber };
//         const user = await axios.get("http://localhost:3000/api/login");
//         if (user.data) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user.data;
//         } else {
//           // If you return null then an error will be displayed advising the user to check their details.
//           return null;

//           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       if (user && user.isVerified && !user.isSuspend) {
//         return true;
//       } else {
//         // Return false to display a default error message
//         return "/auth/login";
//         // Or you can return a URL to redirect to:
//         // return '/unauthorized'
//       }
//     },
//     async jwt({ token, account, user }) {
//       // Persist the OAuth access_token to the token right after signin
//       if (account) {
//         token.accessToken = account.access_token;
//       }
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token, user }) {
//       // Send properties to the client, like an access_token from a provider.
//       session.accessToken = token.accessToken;
//       session.user = token.user;
//       return session;
//     },

//     async redirect({ url, baseUrl }) {
//       //   // Allows relative callback URLs
//       //   if (url.startsWith("/")) return `${baseUrl}${url}`;
//       //   // Allows callback URLs on the same origin
//       //   else if (new URL(url).origin === baseUrl) return url;
//       return "/dashboard";
//     },
//   },
//   pages: {
//     signIn: "/auth/login",
//   },
// });
