import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "models/User";
import bcrypt from "bcrypt";
import db from "utils/db";
import clientPromise from "./lib/mongodb";

db.conectDb();

export const authOptions = {
  // your configs
};

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),

    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET,
    // }),

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),

    // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "NextAuth.js <no-reply@example.com>",
    // }),

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;

        const user = await User.findOne({ email });

        if (!password || !email) {
          throw new Error("Please enter your password and email!");
        }

        if (user) {
          const testPass = await bcrypt.compare(password, user.password);

          if (!testPass) {
            throw new Error("Email or password is wrong!");
          }
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("Email or password is wrong!");

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub);
      session.user.role = user.role || "user";
      session.user._id = user._id;
      token.role = user.role || "user";
      return session;
    },

    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
  },

  pages: {
    signIn: "/my-account",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: `DSFSADFSAJFIJ/*/*456798safsadfsf`,
});

// const SignInUser = async (password, user) => {
//   return user;
// };
