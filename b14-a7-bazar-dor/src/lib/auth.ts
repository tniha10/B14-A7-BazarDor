import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

export const auth = betterAuth({
    database: mongodbAdapter(db),

    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,

    trustedOrigins: [
        "http://localhost:3000",
        "https://localhost:3000",
        "https://humble-space-goggles-jjvpv5xp679xfjjjw-3000.app.github.dev",
    ],

    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },

    socialProviders: {
        ...(process.env.GOOGLE_CLIENT_ID &&
        process.env.GOOGLE_CLIENT_SECRET
            ? {
                  google: {
                      clientId: process.env.GOOGLE_CLIENT_ID,
                      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                  },
              }
            : {}),

        ...(process.env.GITHUB_CLIENT_ID &&
        process.env.GITHUB_CLIENT_SECRET
            ? {
                  github: {
                      clientId: process.env.GITHUB_CLIENT_ID,
                      clientSecret: process.env.GITHUB_CLIENT_SECRET,
                  },
              }
            : {}),
    },
});